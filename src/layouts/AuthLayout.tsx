import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { imageConfig } from '../config/image.config';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 font-bangla bg-[#FDFBF7]">

      {/* LEFT: Auth Form Panel */}
      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 bg-[#FDFBF7] relative overflow-hidden">
        {/* Subtle dot background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#064E3B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 max-w-md mx-auto w-full space-y-6">
          {/* Logo Header */}
          <div className="flex flex-col items-start space-y-2">
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src={imageConfig.logo}
                alt="নেকী ফাউন্ডেশন লোগো"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-700/40 shadow-sm group-hover:scale-105 transition-transform bg-white shrink-0"
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
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-emerald-600/30 via-amber-500/30 to-transparent" />

          {/* Auth Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            <Outlet />
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-slate-500 font-bangla">
            © {new Date().getFullYear()} {siteConfig.nameBn} — সর্বস্বত্ব সংরক্ষিত। একটি মানবিক ও আইনী সুরক্ষা উদ্যোগ।
          </p>
        </div>
      </div>

      {/* RIGHT: Rich Brand / Trust Panel */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col justify-between bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#011F1B] text-white p-12 xl:p-16 relative overflow-hidden shadow-2xl">
        {/* Subtle Gold Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#022C22]/90 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30 mb-5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ন্যায়বিচার ও মানবতার ডিজিটাল প্ল্যাটফর্ম</span>
            </span>
            <h2 className="text-3xl xl:text-4xl font-extrabold font-heading text-white leading-tight">
              আইনী সুরক্ষা ও মানবিক সহায়তা এখন <br />
              <span className="text-[#FBBF24]">সবার নাগালে</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-emerald-100/90 font-bangla leading-relaxed max-w-md">
              অর্থের সীমাবদ্ধতা যেন কখনো ন্যায়বিচারের পথে বাধা না হয় — বালুড়া, গদখালী, যশোর থেকে শুরু করে সমগ্র দেশের মানুষের পাশে নেকী ফাউন্ডেশন।
            </p>
          </div>

          {/* Organization Emblem Card */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={imageConfig.logo}
                alt="নেকী ফাউন্ডেশন"
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/80 shadow-md bg-white shrink-0"
              />
              <div>
                <h4 className="text-lg font-bold text-white font-heading">{siteConfig.nameBn}</h4>
                <p className="text-xs text-amber-300 font-sans tracking-wide">{siteConfig.nameEn}</p>
                <p className="text-[11px] text-emerald-200 mt-0.5">গভ. রেজি: আরজেএসসি NF-BD-2026/0491</p>
              </div>
            </div>
            <div className="h-px bg-white/15" />
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-bangla">
              "সমাজের পিছিয়ে পড়া ও অসহায় মানুষের ন্যায়বিচার নিশ্চিতকরণ, সামাজিক পুনর্বাসন এবং মানবিক সেবায় নিবেদিত ও নির্ভরযোগ্য প্রতিষ্ঠান।"
            </p>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="relative z-10 space-y-3 pt-6 border-t border-emerald-800/60">
          {[
            '৬৪ জেলায় সক্রিয় প্যানেল আইনজীবী নেটওয়ার্ক',
            'বাংলাদেশ বার কাউন্সিল তালিকাভুক্ত বিজ্ঞ আইনজীবী',
            'সম্পূর্ণ স্বচ্ছ ও অডিটকৃত মানবিক কার্যক্রম',
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-xs sm:text-sm text-emerald-100 font-bangla">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
