
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';
import Features from '../components/Features';
import CulturalShowcase from '../components/CulturalShowcase';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="pt-24">
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
