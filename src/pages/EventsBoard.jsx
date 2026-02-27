import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EventsBoard = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/events');
            const data = await res.json();
            if (res.ok) setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) return navigate('/login');

        if (!title || !date || !location || !description) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, date, location, description })
            });

            if (res.ok) {
                setTitle('');
                setDate('');
                setLocation('');
                setDescription('');
                fetchEvents();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to post event');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl">
            <h1 className="text-4xl font-serif font-bold text-text-primary mb-8 border-b-2 border-black pb-4">Cultural Events Board</h1>

            {/* Create Event Section */}
            {token ? (
                <div className="mb-12 p-8 border border-black/20 bg-bg-secondary">
                    <h2 className="text-2xl font-serif font-bold mb-6">Host an Event</h2>
                    {error && <p className="text-accent-terra font-bold mb-4">{error}</p>}

                    <form onSubmit={handleEventSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Event Title (e.g., Diwali Festival)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="flex-1 p-3 border border-text-secondary bg-white"
                            />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="p-3 border border-text-secondary bg-white"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Location / Venue"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="p-3 border border-text-secondary bg-white"
                        />
                        <textarea
                            placeholder="Describe the event details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border border-text-secondary bg-white min-h-[100px]"
                        ></textarea>

                        <button type="submit" className="self-start px-8 py-3 mt-2 bg-text-primary text-bg-primary font-bold hover:bg-accent-blue transition-colors">
                            Post Event
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mb-12 p-6 border border-black/20 bg-bg-accent text-center">
                    <p className="font-bold text-lg">Log in to post a new local cultural event.</p>
                </div>
            )}

            {/* Events Section */}
            <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Upcoming Local Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.length === 0 ? (
                        <p className="text-text-secondary italic">No upcoming events yet. Check back later!</p>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="border border-black/10 bg-bg-primary shadow-sm flex flex-col hover:border-accent-blue transition-colors">
                                <div className="p-4 bg-text-primary text-bg-primary font-bold text-xl">
                                    {event.title}
                                </div>
                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div className="flex flex-col gap-2 text-sm font-bold text-text-secondary">
                                        <div className="flex items-center gap-2">
                                            <span>📅</span> {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📍</span> {event.location}
                                        </div>
                                    </div>

                                    <p className="text-text-primary leading-relaxed mt-2">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-black/10 text-sm text-text-muted">
                                        Hosted by <Link to={`/profile/${event.username}`} className="font-bold hover:underline hover:text-accent-blue">{event.username}</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsBoard;
