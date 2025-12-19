import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import Marquee from '@/components/Marquee';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BenefitsSection from '@/components/BenefitsSection';
import LocationsSection from '@/components/LocationsSection';
import ContactSection from '@/components/ContactSection';
import FranchiseSection from '@/components/FranchiseSection';

export const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
    Hero,
    StatsSection,
    Marquee,
    AboutSection,
    MenuSection,
    BenefitsSection,
    LocationsSection,
    ContactSection,
    FranchiseSection,
};
