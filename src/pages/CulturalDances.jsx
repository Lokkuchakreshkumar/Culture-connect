import { useState, useMemo } from 'react';

const dancesData = [
    {
        id: 1,
        name: "Kuchipudi",
        state: "Andhra Pradesh",
        description: "Kuchipudi is a classical dance style from Andhra Pradesh. It is known for its graceful movements, quick footwork, and dramatic character. It uniquely combines speech, mime, and pure dance.",
        imageUrl: "/images/dances/kuchipudi.jpg"
    },
    {
        id: 2,
        name: "Bharatanatyam",
        state: "Tamil Nadu",
        description: "Bharatanatyam is one of the oldest and most popular classical Indian dance forms. It is known for its fixed upper torso, bent legs, and spectacular footwork combined with a sophisticated vocabulary of sign language.",
        imageUrl: "https://images.unsplash.com/photo-1569851935333-6ca1448cc299?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 3,
        name: "Kathakali",
        state: "Kerala",
        description: "Kathakali is a major form of classical Indian dance. It is a story play genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear.",
        imageUrl: "/images/dances/kathakali.jpg"
    },
    {
        id: 4,
        name: "Kathak",
        state: "Uttar Pradesh",
        description: "Kathak is traditionally attributed to the traveling bards of ancient northern India known as Kathakars or storytellers. It is characterized by rhythmic foot movements, adorned with small bells, and graceful gestures.",
        imageUrl: "https://images.unsplash.com/photo-1756382616831-998e8baf9675?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 5,
        name: "Odissi",
        state: "Odisha",
        description: "Odissi is traditionally a dance-drama genre of performance art, where the artists and musicians play out a mythical story or a spiritual message. It is known for its tribhangi (three-part break) posture.",
        imageUrl: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 6,
        name: "Manipuri",
        state: "Manipur",
        description: "Manipuri dance is a team performance, with its own unique costumes especially the barrel-shaped, elegantly decorated skirt. The dance is characterized by smooth and graceful movements.",
        imageUrl: "https://images.unsplash.com/photo-1632292611299-980426b386a1?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 7,
        name: "Sattriya",
        state: "Assam",
        description: "Sattriya is a classical dance form that originated in the Krishna-centered Vaishnavism monasteries of Assam. It usually depicts mythological stories and is an artistic way of presenting spiritual teachings.",
        imageUrl: "/images/dances/sattriya.jpg"
    },
    {
        id: 8,
        name: "Garba",
        state: "Gujarat",
        description: "Garba is a form of dance which originates from the state of Gujarat in India. The name is derived from the Sanskrit term Garbha (womb). Many traditional garbas are performed around a centrally lit lamp or a picture or statue of the Goddess Shakti.",
        imageUrl: "/images/dances/garba.jpg"
    },
    {
        id: 9,
        name: "Bhangra",
        state: "Punjab",
        description: "Bhangra is a vibrant and energetic folk dance of Punjab. It was initially performed by farmers to celebrate the harvest season but now it is a popular dance form across the globe, performed at festivals and weddings.",
        imageUrl: "/images/dances/bhangra.jpg"
    },
    {
        id: 10,
        name: "Lavani",
        state: "Maharashtra",
        description: "Lavani is a combination of traditional song and dance, which particularly performed to the beats of Dholki, a percussion instrument. It is noted for its powerful rhythm and fast tempo.",
        imageUrl: "/images/dances/lavani.jpg"
    },
    {
        id: 11,
        name: "Ghoomar",
        state: "Rajasthan",
        description: "Ghoomar is a traditional folk dance of Rajasthan, performed by women in flowing skirts called ghagharas. It is characterized by graceful circular movements and twirling, accompanied by traditional songs.",
        imageUrl: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 12,
        name: "Bihu",
        state: "Assam",
        description: "The Bihu dance is a folk dance from the state of Assam, related to the Bihu festival and an important part of Assamese culture. Performed by both young men and women, the Bihu dance is characterized by brisk steps and rapid hand movements.",
        imageUrl: "/images/dances/bihu.jpg"
    },
    {
        id: 13,
        name: "Yakshagana",
        state: "Karnataka",
        description: "Yakshagana is a traditional theater form that combines dance, music, dialogue, costume, make-up, and stage techniques with a unique style and form. It is traditionally performed in the coastal districts of Karnataka.",
        imageUrl: "/images/dances/yakshagana.jpg"
    },
    {
        id: 14,
        name: "Chhau",
        state: "West Bengal",
        description: "Chhau is a semi-classical Indian dance with martial, tribal, and folk traditions. It is performed by men from the states of West Bengal, Odisha, and Jharkhand. Purulia Chhau is famous for its massive, colorful masks.",
        imageUrl: "/images/dances/chhau.jpg"
    },
    {
        id: 15,
        name: "Cheraw Dance",
        state: "Mizoram",
        description: "Also known as the Bamboo Dance, Cheraw is a ritual dance performed in Mizoram. It consists of four people holding two pairs of long bamboo staves which are clapped together in a rhythmic fashion.",
        imageUrl: "/images/dances/cheraw.jpg"
    },
    {
        id: 16,
        name: "Rouf",
        state: "Jammu & Kashmir",
        description: "Rouf is a beautiful and graceful dance performed by women in the Kashmir Valley. It is mostly performed during the spring season and on special occasions like Eid and the harvest season.",
        imageUrl: "/images/dances/rouf.jpg"
    },
    {
        id: 17,
        name: "Bardo Chham",
        state: "Arunachal Pradesh",
        description: "Bardo Chham is a ritual masked dance of the Sherdukpen community of Arunachal Pradesh. The dance depicts the victory of good over evil and is performed with large masks and colorful costumes.",
        imageUrl: "/images/dances/bardo_chham.jpg"
    },
    {
        id: 18,
        name: "Bidesiya",
        state: "Bihar",
        description: "Bidesiya is a form of Bhojpuri folk theater that originated in the 20th century. It deals with social issues such as the pain of migration, the plight of women, and the conflict between tradition and modernity.",
        imageUrl: "/images/dances/bidesiya.jpg"
    },
    {
        id: 19,
        name: "Karma Naach",
        state: "Chhattisgarh",
        description: "Karma dance is a traditional dance of Central India, performed by communities in Chhattisgarh, Jharkhand, and Madhya Pradesh. It is performed during the Karma festival to worship the Karma tree, a symbol of fertility.",
        imageUrl: "/images/dances/karma_naach.jpg"
    },
    {
        id: 20,
        name: "Fugdi",
        state: "Goa",
        description: "Fugdi is a Goan folk dance performed by women in the Konkan region. It is usually performed during religious festivals like Ganesh Chaturthi and Vrata. The dance is fast-paced and involves rhythmic clapping.",
        imageUrl: "/images/dances/fugdi.jpg"
    },
    {
        id: 21,
        name: "Phag Dance",
        state: "Haryana",
        description: "Phag is a popular seasonal folk dance of Haryana, performed by farmers to celebrate the month of Phalgun (spring). It is a mixed dance performed by both men and women to the beats of the Dhol and Tasha.",
        imageUrl: "/images/dances/phag_dance.jpg"
    },
    {
        id: 22,
        name: "Nati",
        state: "Himachal Pradesh",
        description: "Nati is the most popular folk dance of Himachal Pradesh. It is a slow and graceful community dance performed in a circular or semi-circular formation. It holds the Guinness World Record for the largest folk dance.",
        imageUrl: "/images/dances/nati.jpg"
    },
    {
        id: 23,
        name: "Matki Dance",
        state: "Madhya Pradesh",
        description: "Matki is a folk dance of the Malwa region in Madhya Pradesh. It is performed by women who balance several earthen pots (matkis) on their heads while dancing to the rhythmic beats of a dhol.",
        imageUrl: "/images/dances/matki_dance.jpg"
    },
    {
        id: 24,
        name: "Laho",
        state: "Meghalaya",
        description: "Laho is a traditional folk dance of the Jaintia people in Meghalaya. It is performed during communal festivals where men and women dance together in groups, usually accompanied by a musician playing the drum.",
        imageUrl: "/images/dances/laho.jpg"
    },
    {
        id: 25,
        name: "Chang Lo",
        state: "Nagaland",
        description: "Also known as Sua Lua, Chang Lo is a folk dance of the Chang tribe of Nagaland. Traditionally performed to celebrate victory over enemies, it is now performed during the Poanglem festival to mark the harvest.",
        imageUrl: "/images/dances/chang_lo.jpg"
    },
    {
        id: 26,
        name: "Singhi Chham",
        state: "Sikkim",
        description: "The Singhi Chham, or Snow Lion Dance, is a masked dance from Sikkim. The snow lion is a cultural symbol of Tibet and the Himalayan region, representing strength, courage, and fearlessness.",
        imageUrl: "/images/dances/singhi_chham.jpg"
    },
    {
        id: 27,
        name: "Perini Shivatandavam",
        state: "Telangana",
        description: "Perini Shivatandavam is an ancient dance form from Telangana that originated during the Kakatiya dynasty. It is a vigorous and rhythmic dance traditionally performed by warriors to invoke the power of Lord Shiva.",
        imageUrl: "/images/dances/perini.jpg"
    },
    {
        id: 28,
        name: "Hojagiri",
        state: "Tripura",
        description: "Hojagiri is a folk dance of the Reang community in Tripura. It is a unique balance dance where women balance bottles and lamps on their heads and hands while performing intricate rhythmic movements.",
        imageUrl: "/images/dances/hojagiri.jpg"
    },
    {
        id: 29,
        name: "Choliya",
        state: "Uttarakhand",
        description: "Choliya is a martial folk dance from the Kumaon region of Uttarakhand. It is a sword dance that dates back over a thousand years and was traditionally performed by Rajputs at wedding processions.",
        imageUrl: "/images/dances/choliya.jpg"
    },
    {
        id: 30,
        name: "Shondol",
        state: "Ladakh",
        description: "Shondol is the royal dance of Ladakh, famously known as the 'Royal Dance of Ladakh'. It was traditionally performed for the King of Ladakh on special occasions and involve graceful movements with prayer flags.",
        imageUrl: "/images/dances/shondol.jpg"
    }
];

const CulturalDances = () => {
    const [selectedDance, setSelectedDance] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState("All");

    const states = useMemo(() => {
        const uniqueStates = ["All", ...new Set(dancesData.map(d => d.state))];
        return uniqueStates.sort();
    }, []);

    const filteredDances = useMemo(() => {
        return dancesData.filter(dance => {
            const matchesSearch = dance.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 dance.state.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesState = selectedState === "All" || dance.state === selectedState;
            return matchesSearch && matchesState;
        });
    }, [searchQuery, selectedState]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-bg-primary">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-12 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        Cultural Dances of India
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10">
                        Explore the rich heritage of India through its diverse and beautiful classical and folk dance forms from every state.
                    </p>

                    {/* Filters and Search */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto bg-bg-secondary p-6 rounded-2xl shadow-sm border border-black/5">
                        <div className="relative w-full md:w-2/3">
                            <input 
                                type="text"
                                placeholder="Search by dance or state..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-bg-primary border border-black/10 rounded-xl focus:ring-2 focus:ring-accent-terra/20 outline-none transition-all"
                            />
                            <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="relative w-full md:w-1/3">
                            <select 
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="w-full px-4 py-3 bg-bg-primary border border-black/10 rounded-xl focus:ring-2 focus:ring-accent-terra/20 outline-none transition-all appearance-none cursor-pointer"
                            >
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {filteredDances.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDances.map((dance, index) => (
                            <div 
                                key={dance.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 bg-bg-secondary border border-black/10 flex flex-col h-80 animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => setSelectedDance(dance)}
                            >
                                <div className="h-4/5 w-full relative overflow-hidden">
                                    <img 
                                         src={dance.imageUrl} 
                                         alt={dance.name}
                                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                         loading="lazy"
                                         onError={(e) => {
                                             e.target.onerror = null; 
                                             e.target.src = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=1000";
                                         }}
                                     />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-bg-secondary h-1/5 flex items-center justify-between border-t border-black/10">
                                    <h3 className="text-lg font-serif font-bold text-text-primary truncate">{dance.name}</h3>
                                    <span className="text-xs font-medium text-accent-terra bg-accent-terra/10 px-2 py-1 rounded-full whitespace-nowrap">{dance.state}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-bg-secondary rounded-3xl border border-dashed border-black/20">
                        <svg className="w-20 h-20 mx-auto text-text-muted opacity-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-serif font-bold text-text-primary">No dances found</h3>
                        <p className="text-text-muted">Try a different search term or filter.</p>
                    </div>
                )}

                {/* Modal for viewing dance info */}
                {selectedDance && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedDance(null)}>
                        <div 
                            className="bg-bg-primary w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 animate-slide-up"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-64 md:h-96 w-full">
                                <img 
                                    src={selectedDance.imageUrl} 
                                    alt={selectedDance.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=1000";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-xl font-bold text-text-primary border-b-2 border-accent-terra pb-1">About the Dance</h3>
                                </div>
                                <p className="text-lg text-text-muted leading-relaxed font-sans animate-fade-in" style={{ animationDelay: '400ms' }}>
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
