
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';
import Features from '../components/Features';
import CulturalShowcase from '../components/CulturalShowcase';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            <Navbar />
            <Hero />
            <ProblemStatement />
            <Features />
            <CulturalShowcase />
            <Community />
            <Footer />
        </div>
    );
};

export default Home;
