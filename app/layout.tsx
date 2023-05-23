import { Nunito } from 'next/font/google';

import Navbar from '@/app/components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
