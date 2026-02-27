import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-md">
            <h2 className="text-3xl font-serif font-bold mb-6 text-text-primary">Sign Up</h2>
            {error && <p className="text-accent-terra mb-4 font-bold">{error}</p>}
            <form onSubmit={handleSignup} className="flex flex-col gap-4 border border-black/10 p-8 bg-bg-secondary">
                <label className="text-text-primary font-bold">Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                        required
                    />
                </label>
                <label className="text-text-primary font-bold">Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 p-3 border border-text-secondary bg-bg-primary text-text-primary"
                        required
                    />
                </label>
                <button type="submit" className="mt-4 px-6 py-3 bg-text-primary text-bg-primary font-bold hover:bg-accent-blue transition-colors">
                    Create Account
                </button>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-accent-blue underline">Log in here</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
