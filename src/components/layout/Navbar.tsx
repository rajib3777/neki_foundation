import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Scale, User, LogOut } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { headerNavConfig } from '../../config/navigation.config';
import { authService } from '../../services/auth.service';
import type { UserRole, User as UserType } from '../../types';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHeroPage = location.pathname === '/';

  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleSwitch = async (role: UserRole) => {
    const user = await authService.switchRole(role);
    setCurrentUser(user);
    setRoleSwitcherOpen(false);
    if (role === 'BENEFICIARY') navigate('/beneficiary/dashboard');
    else if (role === 'LAWYER') navigate('/lawyer/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // On hero page: transparent when at top, glass when scrolled
  // On other pages: always solid
  const transparent = isHeroPage && !isScrolled;

  return (
    <>
      {/* SINGLE FIXED NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ${
          transparent
            ? 'bg-transparent border-b border-white/10'
            : 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-500/20'
        }`}
        style={{ transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                ${transparent
                  ? 'bg-white/15 text-amber-400 border-amber-400/60 group-hover:bg-white/25'
                  : 'bg-[#0F172A] text-amber-400 border-amber-400/50 group-hover:bg-[#D97706] group-hover:text-white'
                }`}
              >
                <Scale className="w-5 h-5" />
              </div>
              <div className="leading-none space-y-0.5">
                <span className={`text-lg font-bold font-heading block leading-none transition-colors ${transparent ? 'text-white' : 'text-[#0F172A]'}`}>
                  {siteConfig.nameBn}
                </span>
                <span className="text-[9px] text-amber-500 font-extrabold uppercase tracking-widest block font-sans">
                  {siteConfig.nameEn}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — single line, compact */}
            <nav className="hidden xl:flex items-center gap-0.5 shrink-0">
              {headerNavConfig.map((item) => {
                const active = isActive(item.path);
                if (item.children) {
                  return (
                    <div
                      key={item.labelEn}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.labelEn)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-[13px] font-bold rounded-xl whitespace-nowrap transition-all font-bangla
                          ${transparent
                            ? active
                              ? 'text-amber-400 bg-white/10'
                              : 'text-white/90 hover:text-amber-400 hover:bg-white/10'
                            : active
                              ? 'text-[#D97706] bg-amber-100/60'
                              : 'text-gray-700 hover:text-[#D97706] hover:bg-amber-50'
                          }`}
                      >
                        {item.labelBn}
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {activeDropdown === item.labelEn && (
                        <div className="absolute left-0 top-full pt-2 w-52 z-50">
                          <div className="bg-white/98 backdrop-blur-xl rounded-2xl border border-amber-500/20 shadow-2xl py-1.5 overflow-hidden">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block px-4 py-2 text-sm font-semibold text-gray-700 font-bangla hover:bg-amber-50 hover:text-[#D97706] transition-colors"
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
                    key={item.labelEn}
                    to={item.path}
                    className={`px-3 py-2 text-[13px] font-bold rounded-xl whitespace-nowrap transition-all font-bangla relative
                      ${transparent
                        ? active
                          ? 'text-amber-400 bg-white/10'
                          : 'text-white/90 hover:text-amber-400 hover:bg-white/10'
                        : active
                          ? 'text-[#D97706] bg-amber-100/60'
                          : 'text-gray-700 hover:text-[#D97706] hover:bg-amber-50'
                      }`}
                  >
                    {item.labelBn}
                    {active && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#D97706] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">

              {/* Role Switcher (Demo) */}
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all font-bangla whitespace-nowrap
                    ${transparent
                      ? 'border-white/30 text-white/80 bg-white/10 hover:bg-white/20'
                      : 'border-amber-500/30 text-[#B45309] bg-amber-50/80 hover:bg-amber-100'
                    }`}
                >
                  <User className="w-3.5 h-3.5" />
                  রোল: {currentUser?.role || 'PUBLIC'}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {roleSwitcherOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white/98 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-2xl z-50 py-1.5 text-xs font-bangla overflow-hidden">
                    <p className="px-3 py-1.5 font-bold text-gray-400 text-[10px] uppercase tracking-wider">রোল সুইচ করুন:</p>
                    {[
                      { role: 'PUBLIC' as UserRole, label: 'পাবলিক দর্শনার্থী', color: 'text-gray-700 hover:bg-gray-50' },
                      { role: 'BENEFICIARY' as UserRole, label: 'সেবাগ্রহীতা', color: 'text-[#0F172A] font-bold hover:bg-amber-50' },
                      { role: 'LAWYER' as UserRole, label: 'প্যানেল আইনজীবী', color: 'text-[#B45309] font-bold hover:bg-amber-50' },
                      { role: 'ADMIN' as UserRole, label: 'এডমিন', color: 'text-blue-700 font-bold hover:bg-blue-50' },
                    ].map(({ role, label, color }) => (
                      <button
                        key={role}
                        onClick={() => handleRoleSwitch(role)}
                        className={`w-full text-left px-3.5 py-2 ${color} transition-colors`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {currentUser && currentUser.role !== 'PUBLIC' ? (
                <>
                  <Button
                    size="sm"
                    variant={transparent ? 'outline' : 'outline'}
                    className={transparent ? 'border-white/50 text-white hover:bg-white/15' : ''}
                    onClick={() => {
                      if (currentUser.role === 'BENEFICIARY') navigate('/beneficiary/dashboard');
                      else if (currentUser.role === 'LAWYER') navigate('/lawyer/dashboard');
                      else navigate('/admin/dashboard');
                    }}
                  >
                    ড্যাশবোর্ড
                  </Button>
                  <button
                    onClick={async () => {
                      await authService.logout();
                      setCurrentUser(null);
                      navigate('/');
                    }}
                    className={`p-2 rounded-xl transition-colors ${transparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className={transparent ? 'border-white/50 text-white hover:bg-white/15' : ''}
                    onClick={() => navigate('/auth/login')}
                  >
                    লগইন
                  </Button>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => navigate('/legal-assistance/apply')}
                  >
                    আইনী সহায়তা নিন
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-xl transition-colors ${transparent ? 'text-white hover:bg-white/15' : 'text-gray-700 hover:bg-amber-50'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-amber-500/15 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {headerNavConfig.map((item) => (
                <React.Fragment key={item.labelEn}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl transition-colors font-bangla ${
                      isActive(item.path) ? 'text-[#D97706] bg-amber-100/70' : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.labelBn}
                  </Link>
                  {item.children && (
                    <div className="ml-4 pl-3 border-l-2 border-amber-400/50 space-y-1 mb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:text-[#D97706] font-bangla"
                        >
                          {child.labelBn}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Button isFullWidth variant="gold" onClick={() => { setMobileMenuOpen(false); navigate('/legal-assistance/apply'); }}>
                  আইনী সহায়তা নিন
                </Button>
                <Button isFullWidth variant="outline" onClick={() => { setMobileMenuOpen(false); navigate('/auth/login'); }}>
                  লগইন / ড্যাশবোর্ড
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
