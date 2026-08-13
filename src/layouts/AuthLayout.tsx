import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { imageConfig } from '../config/image.config';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-bangla">

      {/* LEFT: Auth Form Panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 bg-[#FDFBF7] relative overflow-hidden">
        {/* Subtle dot background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#064E3B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 max-w-md mx-auto w-full space-y-8">
          {/* Logo Header */}
          <div className="flex flex-col items-start space-y-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-[#064E3B] text-amber-400 flex items-center justify-center shadow-md border border-[#D97706]/30 group-hover:bg-[#047857] transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-[#064E3B] block leading-tight">{siteConfig.nameBn}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">{siteConfig.nameEn}</span>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#064E3B]/30 via-[#D97706]/40 to-transparent" />

          {/* Auth Form Content */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-7 sm:p-8 space-y-6">
            <Outlet />
          </div>

          {/* Footer Note */}
          <p className="text-center text-[11px] text-gray-400 font-sans">
            © {new Date().getFullYear()} {siteConfig.nameBn} — ডেমো প্ল্যাটফর্ম। কোনো প্রকৃত ডেটা সংরক্ষিত হচ্ছে না।
          </p>
        </div>
      </div>

      {/* RIGHT: Rich Brand/Trust Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-emerald-hero text-white p-12 xl:p-16 relative overflow-hidden">
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative z-10 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#011F1B]/80 text-amber-400 text-xs font-bold rounded-md border border-amber-500/30 mb-4">
              <ShieldCheck className="w-4 h-4" />
              ন্যায়বিচার ও মানবতার ডিজিটাল প্ল্যাটফর্ম
            </span>
            <h2 className="text-3xl xl:text-4xl font-bold font-heading text-white leading-snug">
              আইনী সহায়তা এখন<br />
              <span className="text-gold-gradient">সবার নাগালে</span>
            </h2>
            <p className="mt-4 text-sm text-emerald-100 font-sans leading-relaxed max-w-sm">
              অর্থের সীমাবদ্ধতা যেন কখনো ন্যায়বিচারের পথে বাধা না হয় — এই বিশ্বাস নিয়েই নেকী ফাউন্ডেশনের যাত্রা।
            </p>
          </div>

          {/* Vector Graphic */}
          <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <img
              src={imageConfig.heroLegal}
              alt="Neki Foundation Scales of Justice"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="relative z-10 space-y-3">
          {[
            '৬৪ জেলায় যাচাইকৃত প্যানেল আইনজীবী নেটওয়ার্ক',
            'বাংলাদেশ বার কাউন্সিল তালিকাভুক্ত আইনজীবী',
            'সম্পূর্ণ স্বচ্ছ ও অডিটকৃত ফাউন্ডেশন পরিচালনা',
          ].map((text) => (
            <div key={text} className="flex items-center gap-2.5 text-xs text-emerald-100 font-sans">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
