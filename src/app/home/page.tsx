import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JourneyOfBean from '../components/JourneyOfBean';
import FlavorProfile from '../components/FlavorProfile';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <JourneyOfBean />
      <FlavorProfile />
      <Footer />
    </main>
  );
}
