import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [visibleComments, setVisibleComments] = useState({}); // { postId: [comments] }
    const [commentInputs, setCommentInputs] = useState({}); // { postId: "draft text" }
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/posts');
            const data = await res.json();
            if (res.ok) setPosts(data);
        } catch (err) {
            console.error('Failed to fetch posts');
        }
    };

    const handleLike = async (postId) => {
        if (!token) return navigate('/login');
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                // Optimistically or explicitly refresh posts to get new like count
                fetchPosts();
            }
        } catch (err) {
            console.error('Failed to like post');
        }
    };

    const fetchComments = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
            const data = await res.json();
            if (res.ok) {
                setVisibleComments(prev => ({ ...prev, [postId]: data }));
            }
        } catch (err) {
            console.error('Failed to fetch comments');
        }
    };

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        if (!token) return navigate('/login');

        const text = commentInputs[postId];
        if (!text) return;

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (res.ok) {
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                fetchComments(postId); // Refresh comments for this post
                fetchPosts(); // Refresh posts to update comment_count
            }
        } catch (err) {
            console.error('Failed to post comment');
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            navigate('/login');
            return;
        }

        if (!image || !description) {
            setError('Please provide an image and description');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('tag', tag);

        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                setDescription('');
                setTag('');
                setImage(null);
                document.getElementById('file-upload').value = '';
                fetchPosts(); // Refresh feed
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to post');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-3xl">
            <h1 className="text-4xl font-serif font-bold text-text-primary mb-8 border-b-2 border-black pb-4">Cultural Feed</h1>

            {/* Create Post Section */}
            {token ? (
                <div className="mb-12 p-6 border border-black/20 bg-bg-secondary">
                    <h2 className="text-2xl font-serif font-bold mb-4">Share Your Culture</h2>
                    {error && <p className="text-accent-terra font-bold mb-4">{error}</p>}

                    <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="p-2 border border-text-secondary bg-white"
                        />
                        <textarea
                            placeholder="Describe your cultural moment..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border border-text-secondary bg-white min-h-[100px]"
                        ></textarea>
                        <input
                            type="text"
                            placeholder="Tag (e.g., Food, Architecture, Dance)"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="p-3 border border-text-secondary bg-white"
                        />
                        <button type="submit" className="self-start px-6 py-2 bg-text-primary text-bg-primary font-bold hover:bg-accent-blue transition-colors">
                            Post
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mb-12 p-6 border border-black/20 bg-bg-accent text-center">
                    <p className="font-bold text-lg">Log in to share your own cultural moment.</p>
                </div>
            )}

            {/* Feed Section */}
            <div className="flex flex-col gap-12">
                {posts.length === 0 ? (
                    <p className="text-center text-text-secondary italic">No posts yet. Be the first to share!</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="border border-black/10 bg-bg-primary shadow-sm">
                            <div className="p-4 border-b border-black/10 bg-bg-secondary flex justify-between items-center">
                                <Link to={`/profile/${post.username}`} className="font-bold text-lg hover:text-accent-blue hover:underline">
                                    {post.username}
                                </Link>
                                <span className="text-xs text-text-muted">{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <img
                                src={`http://localhost:5000${post.image_url}`}
                                alt={post.description}
                                className="w-full h-auto object-cover max-h-[600px] border-b border-black/10"
                            />
                            <div className="p-6">
                                <div className="inline-block px-3 py-1 mb-4 bg-accent-gold text-black text-xs font-bold uppercase border border-black">
                                    {post.tag}
                                </div>
                                <p className="text-text-primary leading-relaxed text-lg mb-6">
                                    {post.description}
                                </p>

                                {/* Social Actions */}
                                <div className="flex items-center gap-6 border-t border-black/10 pt-4">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex items-center gap-2 font-bold hover:text-accent-terra transition-colors"
                                    >
                                        <span>👍</span> {post.like_count || 0} Likes
                                    </button>
                                    <button
                                        onClick={() => fetchComments(post.id)}
                                        className="flex items-center gap-2 font-bold hover:text-accent-blue transition-colors"
                                    >
                                        <span>💬</span> {post.comment_count || 0} Comments
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {visibleComments[post.id] && (
                                    <div className="mt-6 border-t border-black/10 pt-4 bg-bg-secondary p-4">
                                        <div className="flex flex-col gap-3 mb-4 max-h-48 overflow-y-auto">
                                            {visibleComments[post.id].length === 0 ? (
                                                <p className="text-sm text-text-muted italic">No comments yet.</p>
                                            ) : (
                                                visibleComments[post.id].map(c => (
                                                    <div key={c.id} className="text-sm border-l-2 border-accent-blue pl-3">
                                                        <span className="font-bold">{c.username}: </span>
                                                        <span>{c.text}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {token && (
                                            <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Write a comment..."
                                                    value={commentInputs[post.id] || ''}
                                                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                    className="flex-1 p-2 border border-text-secondary text-sm"
                                                />
                                                <button type="submit" className="px-4 bg-text-primary text-bg-primary text-sm font-bold">
                                                    Post
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
