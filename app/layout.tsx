import { Nunito } from 'next/font/google';
import dynamic from 'next/dynamic';

import Navbar from '@/app/components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import './globals.css';

const RentModal = dynamic(() => import('./components/modals/RentModal'));

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Vacation Homes & Condo Rentals - Airbnb',
  description: 'Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.'
};

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {Boolean(currentUser) && <RentModal />}
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
