import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { imageConfig } from '../../config/image.config';
import { Button } from '../../components/ui/Button';
import { EligibilityCalculator } from '../../components/legal/EligibilityCalculator';
import { FaqAccordion } from '../../components/common/FaqAccordion';

export const LegalAssistanceLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-24 font-bangla">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white overflow-hidden py-16 lg:py-24 border-b-2 border-emerald-600/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={imageConfig.heroCourt} alt="আইনী সহায়তা" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>বিনামূল্যে ও স্বল্পব্যয়ে আইনী সহায়তা সেল</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white leading-tight sm:leading-snug">
            আইনী সুরক্ষা ও পরামর্শ কেন্দ্র
          </h1>
          <p className="text-emerald-100 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-sans font-normal pt-4">
            নেকী ফাউন্ডেশনের প্যানেল আইনজীবীদের মাধ্যমে দরিদ্র ও প্রান্তিক নাগরিকদের জন্য জেলা-ভিত্তিক আইনী পরামর্শ, মামলা পরিচালনা ও আইনী অধিকার সুরক্ষার সুসংগঠিত মানবিক প্ল্যাটফর্ম।
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" variant="gold" onClick={() => navigate('/legal-assistance/apply')} className="font-bold shadow-xl">
              আইনী সহায়তার জন্য আবেদন করুন
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={() => navigate('/lawyers')}>
              জেলা ভিত্তিক আইনজীবী খুঁজুন
            </Button>
          </div>
        </div>
      </section>

      {/* How it works Stepper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto flex flex-col items-center">
          <div className="mb-3">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-emerald-100 text-[#064E3B] text-xs font-bold rounded-full border border-emerald-300">
              সহজ কার্যপ্রণালী
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 leading-snug sm:leading-normal">
            আইনী সহায়তা পাওয়ার সহজ ৪টি ধাপ
          </h2>
          <p className="text-sm text-slate-600 font-sans pt-2">
            স্বচ্ছতা ও গোপনীয়তার সাথে আবেদন প্রক্রিয়া সম্পন্ন করার সুনির্দিষ্ট নির্দেশিকা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '১', title: 'আবেদন ও বিবরণ জমা', desc: 'অনলাইন পোর্টালে ফর্ম পূরণ করে আপনার আইনী বিরোধ ও সমস্যার প্রাথমিক তথ্য দিন।' },
            { num: '২', title: 'জেলা ও আইনজীবী চয়ন', desc: 'আপনার জেলার অনুমোদিত প্যানেল আইনজীবীদের তালিকা থেকে উপযুক্ত অভিজ্ঞ এডভোকেট বাছাই করুন।' },
            { num: '৩', title: 'নথি যাচাই ও অনুমোদন', desc: 'ফাউন্ডেশনের আইনী টিম আপনার তথ্য পর্যালোচনা করে প্রাক-আইনী পরামর্শের ব্যবস্থা করবে।' },
            { num: '৪', title: 'আইনী কার্যক্রম ও ট্র্যাকিং', desc: 'মনোনীত আইনজীবী কার্যক্রম শুরু করবেন এবং আপনি লাইভ ট্র্যাকিং আইডি দিয়ে অগ্রগতি দেখবেন।' },
          ].map((step, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 space-y-3 relative hover:-translate-y-1.5 transition-all border border-slate-200 shadow-xl">
              <div className="w-11 h-11 rounded-2xl bg-[#064E3B] text-amber-400 font-black flex items-center justify-center text-lg font-heading shadow-md">
                {step.num}
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligible Criteria & Documents Required */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-8 space-y-5 shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-6 h-6 text-[#064E3B]" />
              কারা আবেদন করতে পারবেন?
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 font-sans">
              {[
                'দুস্থ, অসচ্ছল ও প্রান্তিক জনগোষ্ঠীর নাগরিকগণ',
                'পারিবারিক নির্যাতন বা খোরপোশ বঞ্চিত নারী ও শিশু',
                'ভূমি ও জমিজমা সংক্রান্ত প্রতারণার শিকার কৃষক ও সাধারণ পরিবার',
                'শ্রম অধিকার ও বকেয়া মজুরি থেকে বঞ্চিত পোশাক ও কারখানার শ্রমিক',
                'সাইবার হয়রানি ও ব্ল্যাকমেইলিংয়ের শিকার ভুক্তভোগী'
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-bold">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-5 shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-6 h-6 text-[#064E3B]" />
              প্রয়োজনীয় তথ্য ও কাগজপত্র
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 font-sans">
              {[
                'জাতীয় পরিচয়পত্র (NID) অথবা জন্ম নিবন্ধন সনদের কপি',
                'পারিবারিক বা আইনী বিরোধের সংক্ষিপ্ত বিবরণী',
                'জমিজমা সংক্রান্ত ক্ষেত্রে খতিয়ান, পর্চা বা দলিলের কপি (যদি থাকে)',
                'আদালতে পূর্ববর্তী কোনো নোটিশ বা মামলার নথি (প্রযোজ্য ক্ষেত্রে)'
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0" />
                  <span className="font-bold">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Eligibility & Fee Calculator */}
      <EligibilityCalculator />

      {/* Frequently Asked Questions */}
      <FaqAccordion />

    </div>
  );
};
