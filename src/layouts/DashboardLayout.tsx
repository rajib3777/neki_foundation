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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#011F1B]">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* Mobile Dashboard Navigation Bar */}
          <div className="md:hidden mb-4 overflow-x-auto pb-2 scrollbar-none flex gap-1.5 border-b border-slate-200">
            {(currentUser?.role === 'BENEFICIARY' ? [
              { label: 'ওভারভিউ', path: '/beneficiary/dashboard' },
              { label: 'আবেদনসমূহ', path: '/beneficiary/requests' },
              { label: 'আইনজীবী খুঁজুন', path: '/beneficiary/lawyers' },
              { label: 'নথিপত্র ভল্ট', path: '/beneficiary/documents' },
              { label: 'পেমেন্ট ও রিসিপ্ট', path: '/beneficiary/payments' },
              { label: 'প্রোফাইল', path: '/beneficiary/profile' },
            ] : currentUser?.role === 'LAWYER' ? [
              { label: 'ওভারভিউ', path: '/lawyer/dashboard' },
              { label: 'আমার প্রোফাইল', path: '/lawyer/profile' },
              { label: 'মামলা ও অনুরোধ', path: '/lawyer/requests' },
              { label: 'সময়সূচী ও স্লট', path: '/lawyer/availability' },
              { label: 'সনদ ও নথি', path: '/lawyer/documents' },
              { label: 'সেটিংস', path: '/lawyer/settings' },
            ] : [
              { label: 'ড্যাশবোর্ড', path: '/admin/dashboard' },
              { label: 'আইনজীবী প্যানেল', path: '/admin/lawyers' },
              { label: 'ইউজার তালিকা', path: '/admin/users' },
              { label: 'মামলা মনিটরিং', path: '/admin/requests' },
              { label: 'সিএমএস', path: '/admin/cms' },
              { label: 'রিপোর্ট ও CSV', path: '/admin/reports' },
              { label: 'অডিট লগ', path: '/admin/audit-logs' },
              { label: 'সেটিংস', path: '/admin/settings' },
            ]).map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  window.location.pathname === tab.path
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Outlet context={{ currentUser }} />
        </main>
      </div>
    </div>
  );
};
