import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Globe, Rss, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { imageConfig } from '../../config/image.config';
import { footerNavConfig } from '../../config/navigation.config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-800 font-bangla relative">
      
      {/* 1. TOP HUMANITARIAN CALLOUT BANNER */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#064E3B] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>আইনের সমতা ও মানবিক ন্যায়বিচার</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              আইনী সমস্যায় একা নন — আমরা আছি আপনার পাশে
            </h3>
            <p className="text-sm text-emerald-100 max-w-2xl font-sans">
              অর্থের অভাবে যেন কোনো নাগরিকের ন্যায্য অধিকার পদদলিত না হয়। আজই আমাদের বিশেষজ্ঞ প্যানেল আইনজীবীদের প্রাক-আইনী পরামর্শ সেবা গ্রহণ করুন।
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5 justify-center">
            <Link
              to="/legal-assistance/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-105"
            >
              বিনামূল্যে আইনী আবেদন করুন <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+8801800000000"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/25 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              হটলাইন: {siteConfig.contact.phoneBn}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* Brand & Mission Column */}
        <div className="lg:col-span-4 space-y-5">
          <Link to="/" className="flex items-center gap-3.5 group">
            <img
              src={imageConfig.logo}
              alt="নেকী ফাউন্ডেশন লোগো"
              className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-emerald-700/40 bg-white group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-2xl font-black font-heading text-[#064E3B] block leading-tight">{siteConfig.nameBn}</span>
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-widest font-sans">{siteConfig.nameEn} • বালুড়া, যশোর</span>
            </div>
          </Link>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {siteConfig.descriptionBn}
          </p>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl text-[11px] text-emerald-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              রেজিস্ট্রেশন ও সরকারি অনুমোদন:
            </p>
            <p className="text-slate-600">
              যৌথ মূলধনী কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC) নিবন্ধিত সমাজকল্যাণ ট্রাস্ট • ট্রাস্ট নং: NF-BD-2026/0491
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 pt-1">
            <a
              href="https://wa.me/8801800000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="হোয়াটসঅ্যাপ"
              className="w-9 h-9 rounded-xl bg-white hover:bg-green-600 border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ফেসবুক"
              className="w-9 h-9 rounded-xl bg-white hover:bg-blue-600 border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="/news"
              aria-label="সংবাদ বুলেটিন"
              className="w-9 h-9 rounded-xl bg-white hover:bg-amber-600 border border-slate-200 text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Columns */}
        {footerNavConfig.map((group, idx) => (
          <div key={group.label} className={idx === 0 ? 'lg:col-span-3 space-y-4' : 'lg:col-span-2 space-y-4'}>
            <h4 className="text-xs font-extrabold text-[#064E3B] uppercase tracking-wider border-b border-emerald-900/10 pb-2.5 font-sans">
              {group.label}
            </h4>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-slate-600 hover:text-[#064E3B] transition-colors font-sans flex items-center gap-1.5 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 group-hover:bg-[#064E3B] transition-colors shrink-0" />
                    {link.labelBn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact & Newsletter Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-extrabold text-[#064E3B] uppercase tracking-wider border-b border-emerald-900/10 pb-2.5 font-sans">
            যোগাযোগ ও কেন্দ্রীয় ডেস্ক
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs text-slate-700 font-sans">
              <Phone className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">জরুরী হটলাইন (২৪/৭)</p>
                <p className="font-mono text-slate-600">{siteConfig.contact.phoneBn}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-slate-700 font-sans">
              <Mail className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">অফিশিয়াল ইমেইল</p>
                <p className="font-mono text-slate-600">{siteConfig.contact.email}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-slate-700 font-sans">
              <MapPin className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">প্রধান কার্যালয়</p>
                <p className="text-slate-600 leading-snug">{siteConfig.contact.addressBn}</p>
              </div>
            </li>
          </ul>

          {/* Quick Newsletter Box */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-700 font-sans mb-1.5">আইনী সচেতনতামূলক আপডেট পান:</p>
            <form onSubmit={handleNewsletter} className="flex gap-1.5">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                যুক্ত হোন
              </button>
            </form>
            {newsletterSuccess && (
              <p className="text-[11px] text-emerald-700 font-bold mt-1">ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।</p>
            )}
          </div>
        </div>

      </div>

      {/* 3. BOTTOM COPYRIGHT & TRANSPARENCY BAR */}
      <div className="border-t border-slate-200 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-sans">
          <p>© {currentYear} {siteConfig.nameBn} ({siteConfig.nameEn})। সকল স্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-2 text-slate-600 text-xs font-sans">
            <span>কারিগরি সহায়তা ও উন্নয়নে:</span>
            <a
              href="https://www.codeastro.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#064E3B] hover:text-[#D97706] hover:underline transition-colors inline-flex items-center gap-1"
            >
              CodeAstro
              <span className="text-slate-500 font-normal hover:text-[#064E3B] font-mono">(www.codeastro.dev)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
