import type { Metadata } from 'next';
import { Bricolage_Grotesque, Playfair_Display } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-primary' });
const bricolageSecondary = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-secondary' });
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
    <html lang="en" className={`${bricolage.variable} ${bricolageSecondary.variable} ${playfair.variable}`}>
      <body className={`${bricolageSecondary.className} font-secondary`}>{children}</body>
    </html>
  );
}
