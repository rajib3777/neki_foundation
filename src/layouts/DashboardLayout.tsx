import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { authService } from '../services/auth.service';
import type { User } from '../types';
import { Scale } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      if (!user || user.role === 'PUBLIC') {
        authService.switchRole('BENEFICIARY').then((defaultUser) => {
          setCurrentUser(defaultUser);
          setIsLoading(false);
        });
      } else {
        setCurrentUser(user);
        setIsLoading(false);
      }
    });
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-hero">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#064E3B] border-2 border-[#D97706]/50 text-amber-400 flex items-center justify-center mx-auto shadow-2xl">
            <Scale className="w-8 h-8 animate-pulse" />
          </div>
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-emerald-100 font-bangla">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] font-bangla">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar role={currentUser?.role || 'BENEFICIARY'} userName={currentUser?.name} />
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet context={{ currentUser }} />
        </main>
      </div>
    </div>
  );
};
