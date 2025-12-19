import fs from 'fs';
import path from 'path';
import { SECTION_COMPONENTS } from '@/lib/sections-registry';
import LiquidCursor from '@/components/LiquidCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';
import { Reveal } from '@/components/Reveal';

export const dynamic = 'force-dynamic';

export default function Home() {
  const configPath = path.join(process.cwd(), 'src', 'data', 'page-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

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

        const content = <Component key={section.id} {...section.content} />;

        if (section.type === 'Hero' || section.type === 'Marquee') {
          return content;
        }

        return <Reveal key={section.id}>{content}</Reveal>;
      })}

      <Footer />
      <ScrollToTop />
    </main>
  );
}

