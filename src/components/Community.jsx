const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "Language Learner",
        location: "Madrid, Spain",
        text: "Culture Connect helped me not just learn Japanese, but understand the soul behind the language. The community is incredibly supportive.",
    },
    {
        name: "Kenji Tanaka",
        role: "Cultural Guide",
        location: "Kyoto, Japan",
        text: "Sharing my local traditions with people from around the world has been a life-changing experience. This platform bridges gaps like no other.",
    },
    {
        name: "Sarah Jenkins",
        role: "Travel Enthusiast",
        location: "New York, USA",
        text: "I found a hidden festival in Peru through this app that wasn't on any tourist guide. It was the highlight of my trip!",
    }
];

const Community = () => {
    return (
        <section id="community" className="py-24 bg-bg-primary relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-accent-teal uppercase tracking-widest text-xs font-bold mb-4 block">Our Community</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4 text-text-primary">
                        Voices of <span className="italic font-light text-accent-gold">Connection</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-bg-secondary p-8 rounded-lg border border-transparent hover:border-black/5 transition-colors duration-300 relative group"
                        >
                            <div className="text-4xl text-accent-gold/20 font-serif absolute top-6 right-6">"</div>

                            <p className="text-text-secondary leading-relaxed mb-8 font-light relative z-10">
                                {item.text}
                            </p>

                            <div className="flex items-center gap-4 border-t border-black/5 pt-6">
                                <div>
                                    <h4 className="font-medium text-text-primary text-base font-serif">{item.name}</h4>
                                    <p className="text-accent-teal text-xs uppercase tracking-wider font-bold mb-0.5">{item.role}</p>
                                    <p className="text-text-muted text-xs">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Community;
