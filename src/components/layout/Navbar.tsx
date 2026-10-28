import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Scale, 
  User, 
  LogOut, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  FileCheck2
} from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { imageConfig } from '../../config/image.config';
import { authService } from '../../services/auth.service';
import type { User as UserType } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { labelBn: 'হোম', path: '/' },
    { labelBn: 'আমাদের কথা', path: '/about' },
    {
      labelBn: 'কার্যক্রম ও সেবা',
      path: '/services',
      children: [
        { labelBn: 'বিনামূল্যে আইনী সহায়তা', path: '/services/legal-assistance' },
        { labelBn: 'বৃক্ষরোপণ কর্মসূচি', path: '/services/tree-plantation' },
        { labelBn: 'জরুরি রক্তদান উদ্যোগ', path: '/services/blood-donation' },
        { labelBn: 'সামাজিক পুনর্বাসন ও সুরক্ষা', path: '/services/social-protection' },
      ],
    },
    { labelBn: 'আইনজীবী তালিকা', path: '/lawyers' },
    { labelBn: 'স্বচ্ছতা ও রিপোর্ট', path: '/transparency' },
    { labelBn: 'যোগাযোগ', path: '/contact' },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#064E3B] text-emerald-100 text-xs font-bangla border-b border-emerald-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-between gap-y-1.5">
            
            {/* Left: Hotline & Email */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-emerald-200/90 hidden sm:inline">২৪/৭ হটলাইন:</span>
                <a 
                  href="tel:+8801800000000" 
                  className="font-bold text-white hover:text-amber-300 transition-colors font-mono tracking-tight"
                >
                  {siteConfig.contact.phoneBn}
                </a>
              </span>

              <span className="text-emerald-600/70 hidden sm:inline">•</span>

              <span className="hidden md:flex items-center gap-1.5 text-emerald-200/90">
                <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <a 
                  href={`mailto:${siteConfig.contact.email}`} 
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </span>

              <span className="text-emerald-600/70 hidden lg:inline">•</span>

              <span className="hidden lg:flex items-center gap-1.5 text-emerald-300/80 text-[11px]">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>আরজেএসসি নিবন্ধন: NF-BD-2026/0491</span>
              </span>
            </div>

            {/* Right: Office Hours & WhatsApp Direct */}
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <span className="hidden sm:flex items-center gap-1.5 text-emerald-200/80">
                <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{siteConfig.contact.workingHoursBn}</span>
              </span>

              <span className="text-emerald-600/70 hidden sm:inline">•</span>

              <a
                href="https://wa.me/8801800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-0.5 rounded-full font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>হোয়াটসঅ্যাপ সহায়তা</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">

            {/* Logo Mark */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <img
                src={imageConfig.logo}
                alt="নেকী ফাউন্ডেশন লোগো"
                className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-emerald-700/40 group-hover:scale-105 transition-transform bg-white"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 tracking-tight leading-none">
                  {siteConfig.nameBn}
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold tracking-wider uppercase font-sans mt-1 leading-none">
                  {siteConfig.nameEn} • বালুড়া, গদখালী, যশোর
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const active = isActive(item.path);

                if (item.children) {
                  return (
                    <div
                      key={item.labelBn}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.labelBn)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors font-bangla ${
                          active
                            ? 'text-[#064E3B] bg-emerald-50 font-bold'
                            : 'text-slate-700 hover:text-[#064E3B] hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.labelBn}</span>
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </button>

                      {activeDropdown === item.labelBn && (
                        <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in-50 duration-150">
                          <div className="bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 overflow-hidden">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#064E3B] hover:bg-emerald-50/70 transition-colors font-bangla"
                              >
                                {child.labelBn}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.labelBn}
                    to={item.path}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors font-bangla ${
                      active
                        ? 'text-[#064E3B] bg-emerald-50 font-bold'
                        : 'text-slate-700 hover:text-[#064E3B] hover:bg-slate-50'
                    }`}
                  >
                    {item.labelBn}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA & Auth Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {currentUser && currentUser.role !== 'PUBLIC' ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium font-bangla">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentUser.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({currentUser.role})</span>
                  </div>

                  <button
                    onClick={() => {
                      if (currentUser.role === 'BENEFICIARY') navigate('/beneficiary/dashboard');
                      else if (currentUser.role === 'LAWYER') navigate('/lawyer/dashboard');
                      else navigate('/admin/dashboard');
                    }}
                    className="px-3.5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#053e2f] text-white text-xs font-semibold font-bangla transition-colors"
                  >
                    ড্যাশবোর্ড
                  </button>

                  <button
                    onClick={async () => {
                      await authService.logout();
                      setCurrentUser(null);
                      navigate('/');
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="লগআউট"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/auth/login"
                    className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors font-bangla"
                  >
                    লগইন
                  </Link>

                  <Link
                    to="/legal-assistance/apply"
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#064E3B] hover:bg-[#053e2f] rounded-lg shadow-xs transition-colors font-bangla"
                  >
                    সহায়তা আবেদন
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Header Buttons */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/legal-assistance/apply"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#064E3B] hover:bg-[#053e2f] rounded-lg transition-colors font-bangla"
              >
                সহায়তা
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="মেনু টগল করুন"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              
              {/* Mobile Hotline Quick Card */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs font-bangla mb-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#064E3B]" />
                  <div>
                    <p className="text-slate-600 text-[11px]">জরুরি আইনী হটলাইন</p>
                    <a href="tel:+8801800000000" className="font-bold text-[#064E3B] font-mono">
                      {siteConfig.contact.phoneBn}
                    </a>
                  </div>
                </div>
                <a
                  href="https://wa.me/8801800000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-green-600 text-white rounded-md text-[11px] font-bold flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  হোয়াটসঅ্যাপ
                </a>
              </div>

              {/* Navigation Links */}
              {navLinks.map((item) => (
                <div key={item.labelBn} className="space-y-1">
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg font-bangla transition-colors ${
                      isActive(item.path)
                        ? 'text-[#064E3B] bg-emerald-50 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.labelBn}
                  </Link>
                  {item.children && (
                    <div className="pl-4 ml-2 border-l-2 border-emerald-200 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#064E3B] font-bangla"
                        >
                          {child.labelBn}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/legal-assistance/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 bg-[#064E3B] text-white rounded-lg text-sm font-semibold font-bangla"
                >
                  বিনামূল্যে আইনী সহায়তা আবেদন
                </Link>
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium font-bangla"
                >
                  লগইন
                </Link>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
