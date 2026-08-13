import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isHeroPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className={`flex-grow ${isHeroPage ? 'pt-0' : 'pt-[72px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

