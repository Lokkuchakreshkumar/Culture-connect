import { useEffect, useRef } from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 bg-bg-primary overflow-hidden">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="z-20 order-2 md:order-1">
                    <div className="mb-6 inline-flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-accent-gold"></span>
                        <span className="text-accent-gold uppercase tracking-[0.2em] text-xs font-semibold">Bridging Worlds</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1] text-text-primary">
                        Connect Through <br />
                        <span className="italic text-accent-terra">Heritage.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-text-secondary max-w-lg mb-10 leading-relaxed font-light">
                        A digital sanctuary preserving the world's rich traditions. diverse stories, and authentic voices.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="px-8 py-4 bg-text-primary text-bg-primary font-medium hover:bg-accent-terra transition-colors duration-300">
                            Start Exploring
                        </button>
                        <button className="px-8 py-4 border border-text-primary/20 text-text-primary font-medium hover:border-text-primary transition-colors duration-300">
                            Our Mission
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative order-1 md:order-2 h-[50vh] md:h-[80vh] w-full flex items-center justify-center">
                    <div className="w-full h-full overflow-hidden shadow-xl transition-all duration-500">
                        <img
                            src="/cultural_hero_minimalist_1770808151155.png"
                            alt="Cultural Artifacts"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
