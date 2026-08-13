import React from 'react';
import { Scale, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';
import { imageConfig } from '../../config/image.config';
import { Button } from '../../components/ui/Button';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-20 font-bangla">
      {/* 1. HERO HEADER */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden border-b-2 border-amber-500/40">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={imageConfig.heroCourt} alt="Courthouse" className="w-full h-full object-cover" />
        </div>
        {/* Decorative accent blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl z-0" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-amber-500/8 blur-3xl z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20 lg:py-28">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 uppercase tracking-widest mb-5">
            আমাদের গল্প ও রূপকল্প
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading block">
            {siteConfig.nameBn}{' '}
            <span className="text-gold-gradient font-heading">সম্পর্কে</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans mt-5">
            {siteConfig.descriptionBn} নেকী ফাউন্ডেশন সম্পূর্ণ স্বাধীন, পেশাদার এবং আইনগত স্বচ্ছতার ভিত্তিতে পরিচালিত একটি স্বনামধন্য আইনী ও সামাজিক সেবামূলক প্ল্যাটফর্ম।
          </p>
        </div>
      </section>

      {/* 2. MAIN MISSION SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={imageConfig.legalDesk} alt="আইনী সহায়তা ডেক্স" className="w-full h-[420px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-2xl border border-amber-400/40 hidden sm:block">
              <p className="text-3xl font-black text-[#D97706] font-heading">৬৪ জেলা</p>
              <p className="text-xs font-bold text-gray-700 font-sans">আইনী সহায়তা কভারেজ</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full border border-amber-300">
              আমাদের লক্ষ্য ও উদ্দেশ্য
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">
              আইনের শাসন ও ন্যায়বিচার নিশ্চিতকরণে নিবেদিত
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              অর্থের অভাবে যেন কোনো নাগরিক আইনী অধিকার থেকে বঞ্চিত না হন, সেই ব্রত নিয়ে নেকী ফাউন্ডেশনের যাত্রা। আমরা বাংলাদেশ বার কাউন্সিলের নিবন্ধিত আইনজীবীদের সমন্বয়ে একটি শক্তিশালী আইনী প্যানেল গঠন করেছি।
            </p>

            <div className="space-y-3">
              {[
                'দরিদ্র ও অসচ্ছল পরিবারের জন্য ১০০% বিনামূল্যে ও স্বল্পমূল্যে আইনী পরামর্শ',
                '৬৪টি জেলায় দ্রুত প্যানেল আইনজীবী নির্বাচন ও ফলোআপ ব্যবস্থা',
                'সম্পূর্ণ স্বচ্ছ ডিজিটাল আবেদন ট্র্যাকিং ও বার্ষিক অডিট প্রকাশ',
                'আইনী সেবার পাশাপাশি রক্তদান ও পরিবেশ সুরক্ষায় সামাজিক উদ্যোগ'
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-bold font-sans">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button variant="gold" size="lg" onClick={() => navigate('/legal-assistance/apply')}>
                আইনী সহায়তা আবেদন করুন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">আমাদের মূল স্তম্ভসমূহ</h2>
          <p className="text-sm text-gray-600 font-sans max-w-xl mx-auto">
            যে আদর্শ ও মূল্যবোধের ওপর ভিত্তি করে আমাদের প্রতিটি কার্যক্রম পরিচালিত হয়
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-3xl p-8 space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-amber-400 flex items-center justify-center shadow-lg">
              <Scale className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900">আইনী ন্যায়বিচার ও সমতা</h3>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              অর্থের অভাবে যেন কোনো নাগরিক আইনী সহায়তা থেকে বঞ্চিত না হন, তা নিশ্চিত করাই আমাদের মূল উদ্দেশ্য।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900">শতভাগ স্বচ্ছতা ও গভর্ন্যান্স</h3>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              ফাউন্ডেশনের সমস্ত পেমেন্ট, সুবিধাভোগী তালিকা এবং বার্ষিক অডিট হিসাব সর্বসাধারণের জন্য উন্মুক্ত।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-4 hover:-translate-y-1.5 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-amber-400 flex items-center justify-center shadow-lg">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900">সামাজিক দায়বদ্ধতা</h3>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              আইনী সহায়তার পাশাপাশি বৃক্ষরোপণ, জরুরি রক্তদান ও সামাজিক সুরক্ষায় আমরা নিরবচ্ছিন্ন ভূমিকা রাখছি।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
