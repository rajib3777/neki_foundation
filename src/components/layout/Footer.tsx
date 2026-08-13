import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Globe, Rss, Video, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { footerNavConfig } from '../../config/navigation.config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF7F2] border-t-2 border-amber-500/30 text-gray-900 font-bangla">
      {/* Top CTA Strip - Cream White Glass */}
      <div className="border-b border-amber-500/15 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <p className="text-lg font-bold text-[#0F172A] font-heading">জরুরী আইনী সহায়তার প্রয়োজন?</p>
            <p className="text-xs text-gray-600 font-sans">আজই আবেদন করুন — বিনামূল্যে পরামর্শ সেবা উপলব্ধ</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/legal-assistance/apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20"
            >
              আইনী সহায়তা নিন <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/lawyers"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white text-[#0F172A] font-bold text-xs rounded-2xl transition-all"
            >
              আইনজীবী খুঁজুন
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid - Spacious Cream White */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-1 space-y-5">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-amber-400 flex items-center justify-center shadow-md border border-amber-500/30 group-hover:bg-[#D97706] group-hover:text-white transition-all duration-300">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-[#0F172A] block leading-tight">{siteConfig.nameBn}</span>
              <span className="text-[10px] text-[#D97706] font-extrabold uppercase tracking-widest font-sans">{siteConfig.nameEn}</span>
            </div>
          </Link>

          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            {siteConfig.descriptionBn}
          </p>

          {/* Social Links */}
          <div className="flex gap-2.5 pt-2">
            {[
              { icon: Globe, label: 'ওয়েবসাইট', href: '#' },
              { icon: Rss, label: 'ব্লগ', href: '#' },
              { icon: Video, label: 'ভিডিও', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white hover:bg-[#D97706] border border-amber-500/20 text-gray-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
              >
                <Icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Columns */}
        {footerNavConfig.map((group) => (
          <div key={group.label} className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#D97706] uppercase tracking-widest border-b border-amber-500/20 pb-2 font-sans">
              {group.label}
            </h4>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-gray-700 hover:text-[#D97706] transition-colors font-sans flex items-center gap-1.5 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-[#D97706] transition-colors shrink-0" />
                    {link.labelBn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-[#D97706] uppercase tracking-widest border-b border-amber-500/20 pb-2 font-sans">
            যোগাযোগ তথ্য
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-sans">
              <Phone className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">জরুরী হেল্পলাইন</p>
                <p>{siteConfig.contact.phoneBn}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-sans">
              <Mail className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">ইমেইল</p>
                <p>{siteConfig.contact.email}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-gray-700 font-sans">
              <MapPin className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-gray-900">কেন্দ্রীয় কার্যালয়</p>
                <p>{siteConfig.contact.addressBn}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-500/20 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-600 font-sans">
          <p>© {currentYear} {siteConfig.nameBn} ({siteConfig.nameEn}). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-4">
            <Link to="/transparency" className="hover:text-[#D97706] transition-colors">স্বচ্ছতা নীতি</Link>
            <Link to="/contact" className="hover:text-[#D97706] transition-colors">গোপনীয়তা নীতি</Link>
            <span className="text-gray-500">ফাউন্ডেশন আইডি: NF-BD-2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
