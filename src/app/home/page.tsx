import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DigitalHistory from '../components/DigitalHistory';
import FlavorProfile from '../components/FlavorProfile';
import PersonalizationDash from '../components/PersonalizationDash';
import JourneyOfBean from '../components/JourneyOfBean';
import FarmerProfile from '../components/FarmerProfile';
import LoyaltyProgram from '../components/LoyaltyProgram';
import WhyDigital from '../components/WhyDigital';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DigitalHistory />
      <FlavorProfile />
      <PersonalizationDash />
      <JourneyOfBean />
      <FarmerProfile />
      <LoyaltyProgram />
      <WhyDigital />
      <Footer />
    </main>
  );
}
