import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_culture_jwt_key_123';

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
            category TEXT,
            price INTEGER,
            language TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT,
            event_id INTEGER,
            event_title TEXT,
            tickets INTEGER DEFAULT 1,
            total_price INTEGER DEFAULT 0,
            name TEXT,
            email TEXT,
            phone TEXT,
            status TEXT DEFAULT 'confirmed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(event_id) REFERENCES events(id)
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

function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Requires admin privileges' });
        }
        req.user = user;
        next();
    });
}

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check against environment variables
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        // Sign token with admin role
        const token = jwt.sign(
            { id: 'admin', username: 'ADMIN', role: 'admin' }, 
            JWT_SECRET, 
            { expiresIn: '8h' }
        );
        res.json({ message: 'Admin login successful', token, username: 'ADMIN', role: 'admin' });
    } else {
        res.status(401).json({ error: 'Invalid admin credentials' });
    }
});

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
    const { title, date, location, description, category, price, language } = req.body;

    if (!title || !date || !location || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await db.run(
            'INSERT INTO events (user_id, username, title, date, location, description, category, price, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, req.user.username, title, date, location, description, category || 'Cultural', price || 0, language || 'English']
        );
        res.status(201).json({
            message: 'Event created successfully',
            event: { id: result.lastID, user_id: req.user.id, username: req.user.username, title, date, location, description, category, price, language }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// --- ADMIN DELETION ENDPOINTS ---

// Delete Post
app.delete('/api/admin/posts/:id', authenticateAdmin, async (req, res) => {
    const postId = req.params.id;
    try {
        // Find post to get image_url
        const post = await db.get('SELECT * FROM posts WHERE id = ?', [postId]);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete image file if it exists
        if (post.image_url) {
            // Remove the leading slash if present matching the public directory
            const imagePath = path.join(process.cwd(), post.image_url.replace(/^\//, ''));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete associated records
        await db.run('DELETE FROM likes WHERE post_id = ?', [postId]);
        await db.run('DELETE FROM comments WHERE post_id = ?', [postId]);
        await db.run('DELETE FROM posts WHERE id = ?', [postId]);

        res.json({ message: 'Post and associated data deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Delete User
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find all posts from user to delete images
        const userPosts = await db.all('SELECT * FROM posts WHERE user_id = ?', [userId]);
        for (const post of userPosts) {
            if (post.image_url) {
                const imagePath = path.join(process.cwd(), post.image_url.replace(/^\//, ''));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

        // Delete all associated records
        await db.run('DELETE FROM likes WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM comments WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM events WHERE user_id = ?', [userId]);
        await db.run('DELETE FROM posts WHERE user_id = ?', [userId]);
        
        // Delete user
        await db.run('DELETE FROM users WHERE id = ?', [userId]);

        res.json({ message: 'User and all associated data deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete Comment
app.delete('/api/admin/comments/:id', authenticateAdmin, async (req, res) => {
    const commentId = req.params.id;
    try {
        const result = await db.run('DELETE FROM comments WHERE id = ?', [commentId]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// Delete Event
app.delete('/api/admin/events/:id', authenticateAdmin, async (req, res) => {
    const eventId = req.params.id;
    try {
        const result = await db.run('DELETE FROM events WHERE id = ?', [eventId]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// Book Event Route
app.post('/api/events/:id/book', authenticateToken, async (req, res) => {
    const eventId = req.params.id;
    const { tickets, name, email, phone } = req.body;

    if (!name || !email || !phone || !tickets) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const event = await db.get('SELECT * FROM events WHERE id = ?', [eventId]);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        const totalPrice = (event.price || 0) * tickets;

        const result = await db.run(
            'INSERT INTO bookings (user_id, username, event_id, event_title, tickets, total_price, name, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, req.user.username, eventId, event.title, tickets, totalPrice, name, email, phone]
        );

        res.status(201).json({
            message: 'Booking confirmed!',
            booking: {
                id: result.lastID,
                event_title: event.title,
                tickets,
                total_price: totalPrice,
                status: 'confirmed'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Booking failed' });
    }
});

// Get My Bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
    try {
        const bookings = await db.all('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
