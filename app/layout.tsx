import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Iyeneomi Blessing Ogoina - Data Analyst | AI Graduate | Educator',
  description: 'Multidisciplinary professional with 7+ years of experience in education, healthcare, and data analytics. MSc in Artificial Intelligence & Data Analytics with distinction.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}