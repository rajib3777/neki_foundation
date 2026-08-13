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
    <div className="space-y-16 pb-20 font-bangla">
      {/* Hero Header */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden py-16 lg:py-20 border-b-2 border-amber-500/40">
        <div className="absolute inset-0 z-0 opacity-25">
          <img src={imageConfig.heroCourt} alt="Legal Assistance" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>বিনামূল্যে ও স্বল্পমূল্যে আইনী সহায়তা</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white">
            আইনী সহায়তা কেন্দ্র <span className="text-gold-gradient font-heading">(Legal Hub)</span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-sans">
            নেকী ফাউন্ডেশনের প্যানেল আইনজীবীদের মাধ্যমে সুবিধাভোগীদের জন্য জেলা-ভিত্তিক আইনী পরামর্শ, মামলা পরিচালনা ও আইনী অধিকার সুরক্ষার সুনির্দিষ্ট উদ্যোগ।
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" variant="gold" onClick={() => navigate('/legal-assistance/apply')}>
              আইনী সহায়তার জন্য আবেদন করুন
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-amber-400/80 text-white hover:bg-slate-800/80" onClick={() => navigate('/lawyers')}>
              জেলা ভিত্তিক আইনজীবী খুঁজুন
            </Button>
          </div>
        </div>
      </section>

      {/* How it works Stepper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">আইনী সহায়তা পাওয়ার সহজ ৪টি ধাপ</h2>
          <p className="text-sm text-gray-600 font-sans">স্বচ্ছতা ও গোপনীয়তার সাথে আবেদন প্রক্রিয়া সম্পন্ন করার নির্দেশিকা</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '১', title: 'আবেদন ও রেজিস্ট্রেশন', desc: 'অনলাইন পোর্টালে ফর্ম পূরণ করে আপনার মামলার প্রাথমিক তথ্য প্রদান করুন।' },
            { num: '২', title: 'জেলা ও আইনজীবী চয়ন', desc: 'আপনার জেলার অনুমোদিত প্যানেল আইনজীবীদের তালিকা থেকে উপযুক্ত পরামর্শক বেছে নিন।' },
            { num: '৩', title: 'নথি যাচাই ও অনুমোদন', desc: 'ফাউন্ডেশনের আইনী টিম আপনার তথ্য পর্যালোচনা করে আইনজীবী নির্ধারণ করবে।' },
            { num: '৪', title: 'আইনী কার্যক্রম ও ট্র্যাকিং', desc: 'মনোনীত আইনজীবী কার্যক্রম শুরু করবেন এবং আপনি লাইভ ট্র্যাকিং আইডি দিয়ে অগ্রগতি দেখবেন।' },
          ].map((step, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 space-y-3 relative hover:-translate-y-1 transition-transform border border-amber-500/20 shadow-xl">
              <div className="w-10 h-10 rounded-2xl bg-[#0F172A] text-amber-400 font-black flex items-center justify-center text-lg font-heading shadow-md">
                {step.num}
              </div>
              <h3 className="text-lg font-bold font-heading text-gray-900">{step.title}</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligible Criteria & Documents Required */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-8 space-y-5 shadow-xl border border-amber-500/20">
            <h3 className="text-xl font-bold font-heading text-gray-900 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <ShieldCheck className="w-6 h-6 text-[#D97706]" />
              কারা আবেদন করতে পারবেন?
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-sans">
              {[
                'দুস্থ, অসচ্ছল ও প্রান্তিক জনগোষ্ঠীর নাগরিকগণ',
                'পারিবারিক নির্যাতন বা খোরপোশ বঞ্চিত নারী ও শিশু',
                'ভূমি ও জমিজমা সংক্রান্ত প্রতারণার শিকার কৃষক ও খাসজমির অধিবাসী',
                'শ্রম অধিকার থেকে বঞ্চিত শ্রমিক ও প্রান্তিক কর্মজীবী'
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0" />
                  <span className="font-bold">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-5 shadow-xl border border-amber-500/20">
            <h3 className="text-xl font-bold font-heading text-gray-900 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <FileText className="w-6 h-6 text-[#D97706]" />
              প্রয়োজনীয় তথ্য ও কাগজপত্র
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-sans">
              {[
                'জাতীয় পরিচয়পত্র (NID) অথবা জন্ম নিবন্ধন সনদের কপি',
                'পারিবারিক/আইনী বিরোধের সংক্ষিপ্ত বিবরণী',
                'পূর্বের মামলা/জিডি সংক্রান্ত কোনো কাগজ থাকলে (যদি থাকে)',
                'আবেদনকারীর যোগাযোগের সচল মোবাইল নম্বর'
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

      {/* Calculator Section */}
      <EligibilityCalculator />

      {/* FAQ Section */}
      <FaqAccordion />
    </div>
  );
};

