import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'super_secret_culture_jwt_key_123'; // Hardcoded for local dev

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

let db;

// Initialize Database
async function initDb() {
    db = await open({
        filename: './users.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT,
            image_url TEXT,
            description TEXT,
            tag TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            post_id INTEGER,
            UNIQUE(user_id, post_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            post_id INTEGER,
            username TEXT,
            text TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT,
            title TEXT,
            date TEXT,
            location TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    console.log('Connected to SQLite users.db');
}
initDb();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch Posts Route
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.all(`
            SELECT 
                p.*,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
            FROM posts p
            ORDER BY p.created_at DESC
        `);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Toggle Like
app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        // Check if already liked
        const existingLike = await db.get('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);

        if (existingLike) {
            await db.run('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
            res.json({ message: 'Post unliked', liked: false });
        } else {
            await db.run('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]);
            res.json({ message: 'Post liked', liked: true });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle like' });
    }
});

// Fetch Comments for a Post
app.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const comments = await db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC', [req.params.id]);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Add Comment
app.post('/api/posts/:id/comments', authenticateToken, async (req, res) => {
    const { text } = req.body;
    const postId = req.params.id;

    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    try {
        const result = await db.run(
            'INSERT INTO comments (user_id, post_id, username, text) VALUES (?, ?, ?, ?)',
            [req.user.id, postId, req.user.username, text]
        );
        res.status(201).json({
            id: result.lastID,
            user_id: req.user.id,
            post_id: postId,
            username: req.user.username,
            text
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Fetch User Profile
app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await db.get('SELECT id, username FROM users WHERE username = ?', [req.params.username]);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const posts = await db.all(`
            SELECT 
                p.*,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
            FROM posts p
            WHERE p.user_id = ?
            ORDER BY p.created_at DESC
        `, [user.id]);

        res.json({ user, posts });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

// Create Post Route
app.post('/api/posts', authenticateToken, upload.single('image'), async (req, res) => {
    const { description, tag } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl || !description) {
        return res.status(400).json({ error: 'Image and description are required' });
    }

    try {
        const result = await db.run(
            'INSERT INTO posts (user_id, username, image_url, description, tag) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, req.user.username, imageUrl, description, tag || 'General']
        );
        res.status(201).json({
            message: 'Post created successfully',
            post: { id: result.lastID, user_id: req.user.id, username: req.user.username, image_url: imageUrl, description, tag }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Fetch Events Route
app.get('/api/events', async (req, res) => {
    try {
        const events = await db.all('SELECT * FROM events ORDER BY date ASC');
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Create Event Route
app.post('/api/events', authenticateToken, async (req, res) => {
    const { title, date, location, description } = req.body;

    if (!title || !date || !location || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await db.run(
            'INSERT INTO events (user_id, username, title, date, location, description) VALUES (?, ?, ?, ?, ?, ?)',
            [req.user.id, req.user.username, title, date, location, description]
        );
        res.status(201).json({
            message: 'Event created successfully',
            event: { id: result.lastID, user_id: req.user.id, username: req.user.username, title, date, location, description }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
