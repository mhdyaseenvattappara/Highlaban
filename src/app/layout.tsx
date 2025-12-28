import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import MilkBackground from '@/components/MilkBackground';

import SmoothScroll from '@/components/SmoothScroll';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-primary' });
const bricolageSecondary = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-secondary' });
const bricolageTertiary = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });

export const metadata: Metadata = {
  title: "HighLaban - India's First Egyptian Dessert Experience",
  description: 'Creamy. Dreamy. Desserts. Authentic Egyptian recipes brought to India.',
  icons: {
    icon: '/High Laban logo 0.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${bricolageSecondary.variable} ${bricolageTertiary.variable}`}>
      <body className={`${bricolageSecondary.className} font-secondary`}>
        <MilkBackground />
        {children}

      </body>
    </html>
  );
}
