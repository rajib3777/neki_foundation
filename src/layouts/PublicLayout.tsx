import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FloatingEmergencyWidget } from '../components/common/FloatingEmergencyWidget';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isHeroPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingEmergencyWidget />
    </div>
  );
};
