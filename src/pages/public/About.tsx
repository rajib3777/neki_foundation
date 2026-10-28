import React from 'react';
import { Scale, CheckCircle2, ArrowRight, BookOpen, TreePine, Droplet, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';
import { imageConfig } from '../../config/image.config';
import { Button } from '../../components/ui/Button';
import { FoundationLandSection } from '../../components/common/FoundationLandSection';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-24 font-bangla">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white overflow-hidden border-b-2 border-emerald-600/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={imageConfig.heroCourt} alt="Courthouse" className="w-full h-full object-cover" />
        </div>
        {/* Decorative accent glows */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl z-0" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20 lg:py-28 flex flex-col items-center">
          <div className="mb-5">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest">
              আমাদের লক্ষ্য, আদর্শ ও মানবিক অঙ্গীকার
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading leading-tight sm:leading-snug">
            {siteConfig.nameBn}{' '}
            <span className="text-gold-gradient font-heading">পরিচিতি</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed font-sans font-normal pt-4">
            অর্থের অভাবে যেন কোনো নাগরিক আইনী অধিকার বা মানবিক মর্যাদা থেকে বঞ্চিত না হন — এই প্রত্যয় নিয়ে একদল মানবতাবাদী আইনজীবী ও সমাজকর্মীর উদ্যোগে নেকী ফাউন্ডেশনের পথচলা।
          </p>
        </div>
      </section>

      {/* 2. THE FOUNDING STORY & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-center space-y-5">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-white shadow-2xl border-4 border-emerald-700/30 overflow-hidden flex items-center justify-center">
              <img src={imageConfig.logo} alt="নেকী ফাউন্ডেশন অফিশিয়াল লোগো" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="w-full max-w-md bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-center space-y-1">
              <p className="text-xs font-bold text-[#064E3B]">অফিসিয়াল মনোগ্রাম ও রেজিস্ট্রেশন</p>
              <p className="text-xs text-slate-700 font-semibold">বালুড়া, গদখালী, ঝিকরগাছা, যশোর, বাংলাদেশ</p>
              <p className="text-[11px] text-slate-500 font-sans">“আল্লাহ্ সর্ব শক্তিমান পরম দয়ালু ও করুনাময়”</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 bg-emerald-100 text-[#064E3B] text-xs font-bold rounded-full border border-emerald-300">
                আমাদের সূচনা ও রূপকল্প
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading leading-snug sm:leading-normal pt-1">
              আইনের শাসন ও মানবিক ন্যায়বিচার সবার নাগালে
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              আমাদের দেশের আদালতগুলোতে মামলা লড়তে গিয়ে প্রতি বছর হাজার হাজার দরিদ্র পরিবার সর্বস্বান্ত হয়ে পড়ে। দালালচক্র, দীর্ঘসূত্রিতা আর চড়া খরচের কারণে অনেকে নীরবে অন্যায় মুখ বুজে সহ্য করেন।
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              নেকী ফাউন্ডেশন এই শূন্যতা পূরণে বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত অভিজ্ঞ আইনজীবীদের একটি মানবিক প্ল্যাটফর্ম তৈরি করেছে। এখানে কোনো মধ্যস্বত্বভোগী নেই; প্রতিটি অসহায় মানুষের আবেদন গুরুত্বের সাথে গ্রহণ করে সরাসরি উপযুক্ত জেলা প্যানেল আইনজীবীর মাধ্যমে প্রাক-আইনী পরামর্শ ও আদালতে জোরালো আইনী প্রতিনিধিত্ব নিশ্চিত করা হয়।
            </p>

            <div className="space-y-3 pt-1">
              {[
                'দরিদ্র ও সুবিধাবঞ্চিত পরিবারের জন্য ১০০% বিনামূল্যে ও নামমাত্র প্রসেসিং ফিতে কেস পরিচালনা',
                '৬৪ জেলায় সরাসরি প্যানেল আইনজীবীদের সাথে সংযোগ ও গোপনীয়তা রক্ষা',
                'পরিবেশ সুরক্ষায় দেশব্যাপী বৃক্ষরোপণ এবং নদীভাঙন কবলিত এলাকায় বনায়ন',
                'জরুরি রক্তদান হেল্পডেস্ক ও শীতার্ত মানুষের মাঝে মানবিক সহায়তা'
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-bold font-sans">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Button variant="gold" size="lg" onClick={() => navigate('/legal-assistance/apply')} className="font-bold">
                আইনী সহায়তা আবেদন করুন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DEDICATED FOUNDATION PROPERTY & LAND DEVELOPMENT SECTION */}
      <FoundationLandSection />

      {/* 4. FOUR CORE PILLARS OF HUMANITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="mb-3">
            <span className="inline-flex items-center px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full border border-amber-300 uppercase tracking-wider">
              মূল নীতিসমূহ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading leading-snug sm:leading-normal">
            আমাদের ৪টি মূল মানবিক স্তম্ভ
          </h2>
          <p className="text-sm text-slate-600 font-sans pt-2">
            যে মূল্যবোধের ওপর ভিত্তি করে নেকী ফাউন্ডেশনের প্রতিটি কার্যক্রম পরিচালিত হয়
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-3 border-t-4 border-t-[#064E3B] hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center shadow-sm">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900">আইনী সমতা ও অধিকার</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              আইনের চোখে ধনী-দরিদ্রের কোনো ভেদ থাকবে না। প্রতিটি নাগরিকের সাংবিধানিক প্রতিকার পাওয়ার অধিকার নিশ্চিত করাই আমাদের মূল ব্রত।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-t-4 border-t-emerald-600 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900">সবুজ ও বাসযোগ্য বাংলাদেশ</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              আগামী প্রজন্মের জন্য টেকসই পরিবেশ গড়তে দেশব্যাপী চারা রোপণ ও নদী-উপকূল সংরক্ষণ কার্যক্রম পরিচালনা।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-t-4 border-t-red-600 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900">জরুরি রক্তের নিশ্চয়তা</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              রক্তের অভাবে যেন কোনো অমূল্য প্রাণ ঝরে না যায় — স্বেচ্ছাসেবী রক্তদাতাদের দ্রুততম সময়ে রোগীর পাশে উপস্থিত করা।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-3 border-t-4 border-t-amber-600 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900">সামাজিক সহানুভূতি</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              প্রাকৃতিক দুর্যোগ ও শীতে ক্ষতিগ্রস্ত প্রান্তিক পরিবারগুলোর পাশে খাদ্য, শীতবস্ত্র ও দীর্ঘমেয়াদী পুনর্বাসনের হাত বাড়ানো।
            </p>
          </div>
        </div>
      </section>

      {/* 4. GOVERNANCE & TRANSPARENCY PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090D16] text-white rounded-3xl p-8 lg:p-14 border border-emerald-600/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                গভর্ন্যান্স ও স্বচ্ছতা চার্টার
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white">
                আইনগত জবাবদিহিতা ও শতভাগ উন্মুক্ত আর্থিক প্রতিবেদন
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-2xl">
                নেকী ফাউন্ডেশন একটি অলাভজনক ও অরাজনৈতিক মানবিক সংস্থা। যৌথ মূলধনী কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC) নিবন্ধিত এই ফাউন্ডেশনের সমস্ত হিসাব রেজিস্টার্ড অডিটর দ্বারা নিরীক্ষিত হয় এবং জনসাধারণ ও দাতাদের জন্য ওয়েবসাইটে উন্মুক্ত রাখা হয়।
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Button variant="gold" size="lg" onClick={() => navigate('/transparency')} className="font-bold">
                <BookOpen className="w-4 h-4 mr-2" />
                বার্ষিক অডিট ও রিপোর্ট দেখুন
              </Button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
