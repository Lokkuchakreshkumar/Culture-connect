const features = [
    {
        title: "Cultural Storytelling",
        description: "Discover authentic stories, folklore, and traditions passed down through generations.",
        icon: (
            <svg className="w-8 h-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        title: "Global Events",
        description: "Participate in festivals, workshops, and exhibitions happening physically and virtually.",
        icon: (
            <svg className="w-8 h-8 text-accent-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: "Language Exchange",
        description: "Connect with native speakers to practice languages in a culturally rich context.",
        icon: (
            <svg className="w-8 h-8 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
        ),
    }
];

const Features = () => {
    return (
        <section id="discover" className="py-24 bg-bg-primary relative border-t border-black/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-text-primary">
                            Experience the <span className="italic text-accent-gold">Unseen</span>
                        </h2>
                        <p className="text-text-secondary text-lg font-light leading-relaxed">
                            Our platform provides structured, inclusive spaces for meaningful cultural exchange, moving beyond surface-level tourism to deep understanding.
                        </p>
                    </div>
                    <div className="hidden md:block w-24 h-[1px] bg-text-primary/20 mb-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-text-primary/5 pt-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group hover:-translate-y-1 transition-transform duration-500"
                        >
                            <div className="mb-6 p-4 inline-block rounded-full bg-bg-secondary group-hover:bg-bg-accent transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-serif font-medium mb-3 text-text-primary">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed font-light">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
