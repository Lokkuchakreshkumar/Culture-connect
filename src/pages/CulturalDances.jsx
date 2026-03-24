import { useState } from 'react';

const dancesData = [
    {
        id: 1,
        name: "Kuchipudi",
        state: "Andhra Pradesh",
        description: "Kuchipudi is a classical dance style from Andhra Pradesh. It is known for its graceful movements, quick footwork, and dramatic character. It uniquely combines speech, mime, and pure dance.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1718570262641-54c3ea3142e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 2,
        name: "Bharatanatyam",
        state: "Tamil Nadu",
        description: "Bharatanatyam is one of the oldest and most popular classical Indian dance forms. It is known for its fixed upper torso, bent legs, and spectacular footwork combined with a sophisticated vocabulary of sign language.",
        imageUrl: "https://images.unsplash.com/photo-1569851935333-6ca1448cc299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 3,
        name: "Kathakali",
        state: "Kerala",
        description: "Kathakali is a major form of classical Indian dance. It is a story play genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear.",
        imageUrl: "https://images.unsplash.com/photo-1764014792668-bc484714744f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 4,
        name: "Kathak",
        state: "Uttar Pradesh",
        description: "Kathak is traditionally attributed to the traveling bards of ancient northern India known as Kathakars or storytellers. It is characterized by rhythmic foot movements, adorned with small bells, and graceful gestures.",
        imageUrl: "https://images.unsplash.com/photo-1756382616831-998e8baf9675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 5,
        name: "Odissi",
        state: "Odisha",
        description: "Odissi is traditionally a dance-drama genre of performance art, where the artists and musicians play out a mythical story or a spiritual message. It is known for its tribhangi (three-part break) posture.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1720798651667-992d38944619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 6,
        name: "Manipuri",
        state: "Manipur",
        description: "Manipuri dance is a team performance, with its own unique costumes especially the barrel-shaped, elegantly decorated skirt. The dance is characterized by smooth and graceful movements.",
        imageUrl: "https://images.unsplash.com/photo-1632292611299-980426b386a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 7,
        name: "Sattriya",
        state: "Assam",
        description: "Sattriya is a classical dance form that originated in the Krishna-centered Vaishnavism monasteries of Assam. It usually depicts mythological stories and is an artistic way of presenting spiritual teachings.",
        imageUrl: "https://images.unsplash.com/photo-1756370256926-e48ca54c5efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 8,
        name: "Garba",
        state: "Gujarat",
        description: "Garba is a form of dance which originates from the state of Gujarat in India. The name is derived from the Sanskrit term Garbha (womb). Many traditional garbas are performed around a centrally lit lamp or a picture or statue of the Goddess Shakti.",
        imageUrl: "https://images.unsplash.com/photo-1756625105713-a23921601ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 9,
        name: "Bhangra",
        state: "Punjab",
        description: "Bhangra is a vibrant and energetic folk dance of Punjab. It was initially performed by farmers to celebrate the harvest season but now it is a popular dance form across the globe, performed at festivals and weddings.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1720798652442-bfa6296d30ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8aW5kaWFuJTIwY3VsdHVyZSUyMGRhbmNlfGVufDB8fHx8MTc3NDM2NTI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: 10,
        name: "Lavani",
        state: "Maharashtra",
        description: "Lavani is a combination of traditional song and dance, which particularly performed to the beats of Dholki, a percussion instrument. It is noted for its powerful rhythm and fast tempo.",
        imageUrl: "https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGluZGlhbiUyMGN1bHR1cmUlMjBkYW5jZXxlbnwwfHx8fDE3NzQzNjUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
];

const CulturalDances = () => {
    const [selectedDance, setSelectedDance] = useState(null);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-bg-primary">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-12 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        Cultural Dances of India
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Explore the rich heritage of India through its diverse and beautiful classical and folk dance forms. Click on any dance to learn more.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {dancesData.map((dance, index) => (
                        <div 
                            key={dance.id}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 bg-bg-secondary border border-black/10 flex flex-col h-72 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => setSelectedDance(dance)}
                        >
                            <div className="h-4/5 w-full relative overflow-hidden">
                                <img 
                                    src={dance.imageUrl} 
                                    alt={dance.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-bg-secondary h-1/5 flex items-center justify-between border-t border-black/10">
                                <h3 className="text-xl font-serif font-bold text-text-primary">{dance.name}</h3>
                                <span className="text-sm font-medium text-accent-terra bg-accent-terra/10 px-3 py-1 rounded-full">{dance.state}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for viewing dance info */}
                {selectedDance && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedDance(null)}>
                        <div 
                            className="bg-bg-primary w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 animate-slide-up"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-64 md:h-80 w-full">
                                <img 
                                    src={selectedDance.imageUrl} 
                                    alt={selectedDance.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">{selectedDance.name}</h2>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-accent-terra" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-lg font-medium text-white/90">{selectedDance.state}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedDance(null)}
                                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center absolute top-6 right-6 md:relative md:top-auto md:right-auto"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-black/10 pb-2">About the Dance</h3>
                                <p className="text-lg text-text-muted leading-relaxed font-sans">
                                    {selectedDance.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CulturalDances;
