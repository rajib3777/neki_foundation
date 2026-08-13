import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { UserRole } from '../../types';
import { beneficiaryNavConfig, lawyerNavConfig, adminNavConfig, roleConfig } from '../../config/roles.config';

export interface SidebarProps {
  role: UserRole;
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, userName }) => {
  const location = useLocation();

  let navItems = beneficiaryNavConfig;
  if (role === 'LAWYER') navItems = lawyerNavConfig;
  if (role === 'ADMIN') navItems = adminNavConfig;

  const roleInfo = roleConfig[role];

  const roleColors: Record<string, string> = {
    BENEFICIARY: 'bg-emerald-100 text-[#064E3B] border-emerald-200',
    LAWYER: 'bg-amber-100 text-[#B45309] border-amber-200',
    ADMIN: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-gray-200 min-h-screen flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-5 p-5">

        {/* Profile Card Header */}
        <div className="p-4 bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white rounded-2xl border border-emerald-900/30 shadow-md space-y-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${roleColors[role] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {roleInfo.nameBn}
          </div>
          <p className="text-sm font-bold text-white truncate font-heading">{userName || 'ইউজার ড্যাশবোর্ড'}</p>
          <p className="text-[11px] text-emerald-300 leading-snug">{roleInfo.descriptionBn}</p>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 pb-1">নেভিগেশন</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[item.icon] || Icons.Circle;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-bold rounded-xl transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#064E3B] text-white shadow-md'
                      : 'text-gray-700 hover:bg-[#ECFDF5] hover:text-[#064E3B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-[#064E3B]'}`} />
                    <span className="font-bangla text-sm">{item.labelBn}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-white rounded-md">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Link */}
      <div className="p-5 pt-4 border-t border-gray-100">
        <Link to="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#064E3B] font-sans font-bold transition-colors">
          <Icons.ArrowLeft className="w-3.5 h-3.5" />
          <span>পাবলিক ওয়েবসাইটে ফিরুন</span>
        </Link>
      </div>
    </aside>
  );
};
