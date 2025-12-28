import fs from 'fs';
import path from 'path';
import { SECTION_COMPONENTS } from '@/lib/sections-registry';
import LiquidCursor from '@/components/LiquidCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

import ScrollProgress from '@/components/ScrollProgress';
import { Reveal } from '@/components/Reveal';

export const dynamic = 'force-dynamic';

export default function Home() {
  // Read Config
  const configPath = path.join(process.cwd(), 'src', 'data', 'page-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Read Dynamic Data
  const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  const locationsPath = path.join(process.cwd(), 'src', 'data', 'locations.json');
  let locationsData = [];
  try {
    locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
  } catch (e) {
    // Locations file might not exist initially or be empty
    locationsData = [];
  }

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

