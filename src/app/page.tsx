import { SECTION_COMPONENTS } from '@/lib/sections-registry';
import LiquidCursor from '@/components/LiquidCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

import ScrollProgress from '@/components/ScrollProgress';
import { Reveal } from '@/components/Reveal';
import { storageService } from '@/lib/storage-service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Read Config
  const config = await storageService.getData<any>('page-config') || { sections: [] };

  // Read Dynamic Data
  const productsData = await storageService.getData<any>('products') || { products: [] };

  const locationsData = await storageService.getData<any>('locations') || [];

  return (
    <main className="min-h-screen bg-[--color-background] relative selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <LiquidCursor />
      <Navbar />

      {config.sections.map((section: any) => {
        if (!section.isVisible) return null;
        const Component = SECTION_COMPONENTS[section.type];
        if (!Component) return null;

        // Inject dynamic data if applicable
        let sectionProps = { ...section.content };

        if (section.type === 'MenuSection') {
          sectionProps.products = productsData.products;
        } else if (section.type === 'LocationsSection') {
          sectionProps.locations = locationsData;
        }

        const content = <Component key={section.id} {...sectionProps} />;

        if (section.type === 'Hero' || section.type === 'Marquee') {
          return content;
        }

        return <Reveal key={section.id}>{content}</Reveal>;
      })}

      <Footer />

    </main>
  );
}

