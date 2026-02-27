const cultures = [
    {
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
        tag: "Tradition"
    },
    {
        name: "Jaipur, India",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2670&auto=format&fit=crop",
        tag: "Architecture"
    },
    {
        name: "Marrakech, Morocco",
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2670&auto=format&fit=crop",
        tag: "Colors"
    },
    {
        name: "Cusco, Peru",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2676&auto=format&fit=crop",
        tag: "History"
    },
    {
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2938&auto=format&fit=crop",
        tag: "Views"
    }
];

const CulturalShowcase = () => {
    return (
        <section className="py-24 bg-bg-secondary overflow-hidden">
            <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
                <div>
                    <span className="text-accent-teal uppercase tracking-widest text-xs font-bold mb-2 block">Curated Journeys</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-text-primary">
                        Cultural <span className="italic font-light text-accent-terra">Highlights</span>
                    </h2>
                </div>
                <button className="hidden md:flex items-center gap-2 text-text-primary hover:text-accent-terra transition-colors font-medium text-sm border-b border-transparent hover:border-accent-terra pb-0.5">
                    View All Destinations
                </button>
            </div>

            {/* Scroll Container with Hidden Scrollbar */}
            <div className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-0 container mx-auto snap-x no-scrollbar">
                {cultures.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-72 md:w-80 h-[450px] relative group snap-center cursor-pointer overflow-hidden"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2 block">{item.tag}</span>
                            <h3 className="text-2xl font-serif font-medium text-white">{item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CulturalShowcase;
