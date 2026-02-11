const Footer = () => {
    return (
        <footer className="bg-bg-accent py-20 border-t border-black/5 text-text-primary">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <a href="/" className="text-2xl font-serif font-bold text-text-primary tracking-tight mb-6 block">
                            Culture<span className="font-light italic text-accent-terra">Connect</span>
                        </a>
                        <p className="text-text-secondary max-w-sm mb-8 font-light leading-relaxed">
                            Connect deeply with cultures, languages, and people. A platform for authentic global understanding.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-text-primary opacity-60">Platform</h4>
                        <ul className="space-y-4 text-text-secondary font-light text-sm">
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Explore</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Communities</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Language Exchange</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-text-primary opacity-60">Company</h4>
                        <ul className="space-y-4 text-text-secondary font-light text-sm">
                            <li><a href="#" className="hover:text-accent-terra transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Mission</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-accent-terra transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs font-medium uppercase tracking-wider">
                    <p>&copy; 2026 Culture Connect.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
