import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [visibleComments, setVisibleComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${username}`);
            const data = await res.json();
            if (res.ok) {
                setProfileUser(data.user);
                setPosts(data.posts);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch profile');
        }
    };

    // Reuse Like/Comment Logic from Feed (Simplified)
    const handleLike = async (postId) => {
        if (!token) return navigate('/login');
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProfile();
        } catch (err) {
            console.error('Failed to like post');
        }
    };

    const fetchComments = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
            const data = await res.json();
            if (res.ok) setVisibleComments(prev => ({ ...prev, [postId]: data }));
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
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (res.ok) {
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                fetchComments(postId);
                fetchProfile();
            }
        } catch (err) {
            console.error('Failed to post comment');
        }
    };

    if (error) {
        return <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p>{error}</p>
        </div>;
    }

    if (!profileUser) {
        return <div className="container mx-auto px-6 py-24 text-center">Loading profile...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-24 max-w-3xl">
            <div className="mb-12 p-8 border border-black/20 bg-bg-secondary text-center">
                <div className="w-24 h-24 mx-auto bg-text-primary text-bg-primary flex items-center justify-center text-4xl font-bold mb-4">
                    {profileUser.username[0].toUpperCase()}
                </div>
                <h1 className="text-4xl font-serif font-bold text-text-primary">{profileUser.username}</h1>
                <p className="text-text-secondary mt-2">Shared {posts.length} cultural moments</p>
            </div>

            <div className="flex flex-col gap-12">
                {posts.length === 0 ? (
                    <p className="text-center text-text-secondary italic">This user hasn't shared anything yet.</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="border border-black/10 bg-bg-primary shadow-sm">
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

export default Profile;
