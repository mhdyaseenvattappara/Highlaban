import type { Metadata } from 'next';
import { Bricolage_Grotesque, Manjari, Playfair_Display } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-primary' });
const manjari = Manjari({ weight: ['100', '400', '700'], subsets: ['latin'], variable: '--font-secondary' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

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
    <html lang="en" className={`${bricolage.variable} ${manjari.variable} ${playfair.variable}`}>
      <body className={`${manjari.className} font-secondary`}>{children}</body>
    </html>
  );
}
