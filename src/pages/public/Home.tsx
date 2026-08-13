import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Award,
  Clock,
  FileText,
} from 'lucide-react';
import { imageConfig } from '../../config/image.config';
import { mockNewsArticles } from '../../data/mock/news.data';
import { bangladeshDistricts } from '../../config/districts.config';
import { legalAidService } from '../../services/legalAid.service';
import type { LegalAidRequest } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DistrictExplorer } from '../../components/home/DistrictExplorer';
import { EligibilityCalculator } from '../../components/legal/EligibilityCalculator';
import { FaqAccordion } from '../../components/common/FaqAccordion';


export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Quick Hero Search
  const [heroDistrict, setHeroDistrict] = useState('');
  const [heroCategory, setHeroCategory] = useState('');

  // Live Case Tracker State
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [trackedCase, setTrackedCase] = useState<LegalAidRequest | null>(null);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [isSearchingCase, setIsSearchingCase] = useState(false);
  const [caseNotFound, setCaseNotFound] = useState(false);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/lawyers';
    const params = new URLSearchParams();
    if (heroDistrict) params.set('district', heroDistrict);
    if (heroCategory) params.set('practiceArea', heroCategory);
    if (params.toString()) url += `?${params.toString()}`;
    navigate(url);
  };

  const handleTrackCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumberInput.trim()) return;
    setIsSearchingCase(true);
    setCaseNotFound(false);
    const result = await legalAidService.getRequestByTrackingNumber(trackingNumberInput.trim());
    setIsSearchingCase(false);
    if (result) {
      setTrackedCase(result);
      setTrackerModalOpen(true);
    } else {
      setCaseNotFound(true);
    }
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-20 font-bangla">
      
      {/* 1. CINEMATIC FULL-WIDTH REAL PHOTOGRAPHY HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#0F172A] text-white overflow-hidden shadow-2xl border-b-2 border-amber-500/40">
        
        {/* Full-width Real Photography Layer — MORE VISIBLE */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageConfig.heroCourt}
            alt="Courthouse Golden Hour"
            className="w-full h-full object-cover object-center filter brightness-110 contrast-100"
          />
          {/* Lighter Gradient — Image now clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-[#0F172A]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-10 lg:pt-28 lg:pb-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Content — Full Width, compact spacing */}
            <div className="lg:col-span-12 space-y-5 text-left max-w-4xl">
              
              {/* Tiro Bangla Heading — Two clear distinct lines */}
              <div className="space-y-3">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-300 font-sans tracking-wide">
                  ন্যায়, মানবতা ও
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-heading leading-none drop-shadow-2xl"
                  style={{ color: '#F59E0B', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
                >
                  আইনের সুরক্ষায় নিবেদিত
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-xs">
                অর্থের অভাবে যেন কোনো নাগরিক আইনী সহায়তা থেকে বঞ্চিত না হন — নেকী ফাউন্ডেশন ৬৪ জেলায় বিনামূল্যে ও নামমাত্র প্রসেসিং ফিতে বিশেষজ্ঞ আইনজীবী প্যানেলের সংযোগ নিশ্চিত করে।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  size="md"
                  variant="gold"
                  onClick={() => navigate('/legal-assistance/apply')}
                  className="shadow-xl hover:scale-105 transition-transform"
                >
                  আইনী সহায়তা নিন (ফ্রি/স্বল্পমূল্য)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  className="border-amber-400/80 text-white hover:bg-slate-800/80 hover:border-amber-400 backdrop-blur-xs"
                  onClick={() => navigate('/lawyers')}
                >
                  প্যানেল আইনজীবী খুঁজুন
                </Button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 1.5 LIVE STATUS TRACKER — below hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass-card rounded-3xl shadow-2xl border border-amber-500/25 overflow-hidden">
          {/* Top accent bar */}
          <div className="bg-[#0F172A] px-6 py-4 flex items-center gap-3 border-b border-amber-500/20">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </span>
            <div>
              <p className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">
                আবেদনের লাইভ স্ট্যাটাস ট্র্যাকার
              </p>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                আপনার ট্র্যাকিং নম্বর দিয়ে রিয়েল-টাইম অগ্রগতি দেখুন
              </p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-400 text-[10px] font-bold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              সক্রিয়
            </span>
          </div>

          {/* Form body */}
          <div className="px-6 py-5 bg-white/80">
            <form onSubmit={handleTrackCase} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="ট্র্যাকিং নম্বর লিখুন — যেমন: NF-LEG-2026-001"
                  className="w-full pl-10 pr-4 py-3 text-sm font-mono font-bold text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:font-sans placeholder:font-normal placeholder:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="md"
                isLoading={isSearchingCase}
                className="shrink-0 sm:w-auto w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                স্ট্যাটাস দেখুন
              </Button>
            </form>

            {caseNotFound && (
              <div className="mt-3 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-base shrink-0">⚠️</span>
                <p className="text-xs text-amber-800 font-sans">
                  ট্র্যাকিং নম্বরটি পাওয়া যায়নি।{' '}
                  <button
                    type="button"
                    onClick={() => setTrackingNumberInput('NF-LEG-2026-001')}
                    className="font-bold font-mono underline underline-offset-2 text-[#D97706] hover:text-amber-700 transition-colors"
                  >
                    NF-LEG-2026-001
                  </button>{' '}
                  ব্যবহার করুন।
                </p>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-gray-400 font-sans">দ্রুত পরীক্ষা করুন:</span>
              {['NF-LEG-2026-001', 'NF-LEG-2026-002', 'NF-LEG-2026-003'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setTrackingNumberInput(code)}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold text-[#D97706] bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-amber-500/15">
          
          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-black text-gray-900 font-heading">৬৪টি</p>
            <p className="text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">জেলা আইনী নেটওয়ার্ক</p>
            <p className="text-[11px] text-gray-500">সমগ্র বাংলাদেশে সক্রিয়</p>
          </div>

          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-black text-[#D97706] font-heading">৫০+</p>
            <p className="text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">প্যানেল আইনজীবী (ডেমো)</p>
            <p className="text-[11px] text-gray-500">বার অ্যাসোসিয়েশন তালিকাভুক্ত</p>
          </div>

          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-black text-gray-900 font-heading">১,২০০+</p>
            <p className="text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">আবেদন প্রক্রিয়াকৃত (ডেমো)</p>
            <p className="text-[11px] text-gray-500">প্রাক-আইনী ও কেস সহায়তা</p>
          </div>

          <div className="space-y-2">
            <p className="text-4xl lg:text-5xl font-black text-[#D97706] font-heading">১০০%</p>
            <p className="text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">স্বচ্ছতা ও গভর্ন্যান্স</p>
            <p className="text-[11px] text-gray-500">বার্ষিক হিসাব উন্মুক্ত</p>
          </div>

        </div>
      </section>

      {/* 2.5 FEATURE SPLIT SECTION: IMAGE + ABOUT TEXT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left: Real Photographic Image Card */}
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src={imageConfig.legalDesk}
                alt="আইনী সহায়তা ডেস্ক"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-5 -right-4 bg-white glass-card rounded-2xl px-5 py-4 shadow-2xl border border-amber-400/40 animate-float">
              <p className="text-2xl font-black text-[#D97706] font-heading">৬৪টি</p>
              <p className="text-xs font-bold text-gray-700 mt-0.5 font-sans">জেলায় সক্রিয় নেটওয়ার্ক</p>
            </div>
          </div>

          {/* Right: Editorial Text */}
          <div className="space-y-6">
            <span className="px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-300 inline-block">
              আমাদের পরিচয়
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">
              পেশাদার আইনী সহায়তা এখন সবার নাগালে
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              নেকী ফাউন্ডেশন বাংলাদেশ বার কাউন্সিল তালিকাভুক্ত অভিজ্ঞ আইনজীবীদের একটি সুসংগঠিত প্যানেল তৈরি করেছে যারা দরিদ্র ও অসচ্ছল পরিবারের পক্ষে বিনামূল্যে বা নামমাত্র ফিতে মামলা পরিচালনা করেন।
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">
              প্রতিটি আবেদন সম্পূর্ণ গোপনীয়তার সাথে পর্যালোচনা করা হয় এবং সেবাগ্রহীতার জেলা ও মামলার ধরন অনুযায়ী সবচেয়ে উপযুক্ত আইনজীবী নির্ধারণ করে দেওয়া হয়।
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { num: '৫০+', label: 'প্যানেল আইনজীবী (ডেমো)' },
                { num: '১,২০০+', label: 'সহায়তাপ্রাপ্ত পরিবার (ডেমো)' },
                { num: '৮টি', label: 'বিভাগীয় কার্যালয়' },
                { num: '১০০%', label: 'স্বচ্ছ অর্থায়ন ব্যবস্থা' },
              ].map(({ num, label }) => (
                <div key={label} className="glass-card rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-[#D97706] font-heading">{num}</p>
                  <p className="text-[11px] font-bold text-gray-600 mt-1 font-sans leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2.7 INTERACTIVE DIVISION & DISTRICT EXPLORER */}
      <DistrictExplorer />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

        <div className="w-14 h-14 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center mx-auto text-2xl font-bold shadow-sm border border-amber-300">
          “
        </div>
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed font-heading italic max-w-4xl mx-auto">
          “অর্থের অভাবে যেন কোনো নাগরিক আইনী অধিকার বা সামাজিক সুরক্ষা থেকে বঞ্চিত না হন — এই লক্ষ্যেই আমাদের সার্বক্ষণিক মানবিক নিবেদন।”
        </blockquote>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/70 text-[#D97706] rounded-full text-xs font-bold border border-amber-300">
          <Award className="w-4 h-4 text-amber-600" />
          <span>নেকী ফাউন্ডেশন পরিচালনা পরিষদ ও নীতি সংস্থা</span>
        </div>
      </section>

      {/* 4. HUMANITARIAN SERVICES DIRECTORY WITH REAL PHOTOGRAPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-300">
            কার্যক্রম ও সেবাসমূহ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-heading">
            আমাদের মূল মানবিক উদ্যোগসমূহ
          </h2>
          <p className="text-sm text-gray-600 font-sans leading-relaxed">
            আইনী সহায়তা প্রদানসহ পরিবেশ সংরক্ষণ ও সমাজ সুরক্ষায় নিবেদিত নেকী ফাউন্ডেশনের বহুমুখী কার্যক্রম।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Legal Aid */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-[#0F172A]">
            <div className="h-48 overflow-hidden relative">
              <img src={imageConfig.legalDesk} alt="আইনী সহায়তা" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-400 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">বিনামূল্যে/স্বল্পমূল্য</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-[#D97706] transition-colors">
                  আইনী সহায়তা কার্যক্রম
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                  দরিদ্র ও অসচ্ছল পরিবারের জন্য প্যানেল আইনজীবীদের মাধ্যমে সম্পূর্ণ নিখরচে বা স্বল্প খরচে আইনী পরামর্শ ও কেস সহায়তা।
                </p>
              </div>
              <Link to="/services/legal-assistance" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#D97706] pt-2">
                বিস্তারিত বিবরণী <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 2: Tree Plantation */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-amber-600">
            <div className="h-48 overflow-hidden relative">
              <img src={imageConfig.treeEnv} alt="বৃক্ষরোপণ" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">পরিবেশ সংরক্ষণ</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-[#D97706] transition-colors">
                  বৃক্ষরোপণ ও পরিবেশ সুরক্ষা
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                  জলবায়ু পরিবর্তন মোকাবেলায় দেশব্যাপী চারা রোপণ ও পরিবেশ সচেতনতা প্রচার অভিযান।
                </p>
              </div>
              <Link to="/services/tree-plantation" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#D97706] pt-2">
                বিস্তারিত বিবরণী <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 3: Blood Donation */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-red-600">
            <div className="h-48 overflow-hidden relative">
              <img src={imageConfig.healthCare} alt="রক্তদান" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-red-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">জরুরী হেল্পডেস্ক</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-[#D97706] transition-colors">
                  রক্তদান ও স্বাস্থ্য সহায়তা
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                  জরুরী মুমূর্ষু রোগীর রক্তের প্রয়োজনে স্বেচ্ছাসেবী রক্তদাতা অনুসন্ধান ও প্রাথমিক স্বাস্থ্য সহায়তা।
                </p>
              </div>
              <Link to="/services/blood-donation" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#D97706] pt-2">
                বিস্তারিত বিবরণী <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 4: Social Protection */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-amber-700">
            <div className="h-48 overflow-hidden relative">
              <img src={imageConfig.heroCourt} alt="সামাজিক সুরক্ষা" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">ত্রাণ ও সামাজিক সুরক্ষা</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-[#D97706] transition-colors">
                  সামাজিক সুরক্ষা ও ত্রাণ
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                  প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত পরিবার ও সুবিধাবঞ্চিত জনগোষ্ঠীর জন্য শীতবস্ত্র ও জরুরি খাদ্য বিতরণ।
                </p>
              </div>
              <Link to="/services/social-protection" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-[#D97706] pt-2">
                বিস্তারিত বিবরণী <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

        </div>
      </section>

      {/* 5. DISTRICT LAWYER DIRECTORY SEARCH HIGHLIGHT & FILTER HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-2xl border-t-4 border-t-[#D97706] relative overflow-hidden space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 text-left">
              <span className="px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full border border-amber-300 font-sans">
                জেলা-ভিত্তিক আইনজীবী ডিরেক্টরি
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 leading-normal">
                আপনার নিজ জেলার অনুমোদিত প্যানেল আইনজীবী খুঁজুন
              </h2>
              <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-2xl">
                বাংলাদেশ বার কাউন্সিল কর্তৃক নিবন্ধিত এবং আমাদের ফাউন্ডেশন কমিটি কর্তৃক সংগৃহীত প্যানেল আইনজীবীদের সাথে সরাসরি সমাধান নিন।
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Button
                size="lg"
                variant="gold"
                onClick={() => navigate('/lawyers')}
                className="w-full shadow-xl"
              >
                <Search className="w-5 h-5 mr-2" />
                সকল প্যানেল আইনজীবী তালিকা
              </Button>
            </div>
          </div>

          {/* Quick Filter Form Box */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20 shadow-lg space-y-4">
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 font-sans">
              <Search className="w-4 h-4 text-[#D97706]" />
              দ্রুত জেলা ও ক্যাটাগরি ফিল্টার অনুসন্ধান:
            </p>
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={heroDistrict}
                onChange={(e) => setHeroDistrict(e.target.value)}
                className="w-full px-4 py-3 text-xs font-bold text-gray-900 bg-white border border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs font-sans"
              >
                <option value="">— জেলা নির্বাচন করুন (৬৪টি) —</option>
                {bangladeshDistricts.map((d) => (
                  <option key={d.id} value={d.nameBn}>{d.nameBn}</option>
                ))}
              </select>

              <select
                value={heroCategory}
                onChange={(e) => setHeroCategory(e.target.value)}
                className="w-full px-4 py-3 text-xs font-bold text-gray-900 bg-white border border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs font-sans"
              >
                <option value="">— বিষয়ক ক্যাটাগরি —</option>
                <option value="ফৌজদারী আইন">ফৌজদারী আইন</option>
                <option value="পারিবারিক ও দেওয়ানী আইন">পারিবারিক আইন</option>
                <option value="জমিজমা ও দেওয়ানী আইন">জমিজমা সংক্রান্ত</option>
                <option value="শ্রম আইন">শ্রম আইন</option>
                <option value="সাইবার অপরাধ">সাইবার অপরাধ</option>
              </select>

              <Button type="submit" variant="gold" size="md" className="w-full">
                অনুসন্ধান করুন →
              </Button>
            </form>

            <div className="pt-2 flex flex-wrap gap-2 text-xs border-t border-amber-500/15">
              <span className="text-[#D97706] font-bold self-center mr-1 font-sans">জনপ্রিয় জেলা:</span>
              {['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর'].map((dist) => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => navigate(`/lawyers?district=${encodeURIComponent(dist)}`)}
                  className="px-3 py-1 rounded-xl bg-amber-100/60 hover:bg-[#D97706] hover:text-white text-[#D97706] font-bold border border-amber-300 transition-all font-sans"
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 6. HOW IT WORKS STEPPER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-4 py-1.5 bg-amber-100 text-[#B45309] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200">
            সহজ কার্যপ্রণালী
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading">
            কীভাবে আইনী সহায়তা পাবেন?
          </h2>
          <p className="text-sm text-gray-600 font-sans">
            মাত্র ৪টি সুনির্দিষ্ট ধাপে আপনার আবেদন গৃহীত ও প্যানেল আইনজীবীদের দ্বারা পর্যালোচিত হবে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-4 relative border-t-4 border-t-[#0F172A]">
            <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-amber-400 font-extrabold flex items-center justify-center text-lg shadow-md">
              ১
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">আবেদন ও বিবরণ জমা</h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              অনলাইন ফর্মে আপনার আইনী সমস্যা ও জেলার তথ্য প্রদান করে আবেদন করুন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#0F172A]">
            <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-amber-400 font-extrabold flex items-center justify-center text-lg shadow-md">
              ২
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">আইনজীবী নির্বাচন</h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              আপনার জেলার অনুমোদিত প্যানেল আইনজীবীদের তালিকা থেকে উপযুক্ত অভিজ্ঞ এডভোকেট চয়ন করুন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#0F172A]">
            <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-amber-400 font-extrabold flex items-center justify-center text-lg shadow-md">
              ৩
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">নথি যাচাই ও পেমেন্ট</h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              প্রয়োজনীয় কাগজপত্র সংযুক্ত করুন এবং নির্ধারিত প্রসেসিং ফি (ডেমো) প্রদান করে ট্র্যাকিং আইডি নিন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#0F172A]">
            <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-amber-400 font-extrabold flex items-center justify-center text-lg shadow-md">
              ৪
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">পরামর্শ ও ট্র্যাকিং</h3>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              মনোনীত আইনজীবী সরাসরি মামলা পর্যালোচনা করে আইনী প্রক্রিয়া শুরু করবেন।
            </p>
          </Card>
        </div>
      </section>

      {/* 7. TRANSPARENCY & AUDIT REPORT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <span className="px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-300">
              স্বচ্ছতা ও জবাবদিহিতা
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900">
              ফাউন্ডেশনের সকল আয়-ব্যয় ও প্রতিবেদন উন্মুক্ত
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed max-w-2xl">
              নেকী ফাউন্ডেশনের বার্ষিক আর্থিক হিসাব, প্যানেল তালিকা এবং সাহায্যপ্রাপ্ত পরিবারের রিপোর্ট নিয়মিতভাবে ওয়েবসাইটে প্রকাশ করা হয়।
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button variant="outline" onClick={() => navigate('/transparency')}>
              <FileText className="w-4 h-4 mr-2" />
              বার্ষিক প্রতিবেদন ডাউনলোড করুন
            </Button>
          </div>

        </div>
      </section>

      {/* 8. LATEST NEWS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
              সংবাদ ও সাম্প্রতিক হালনাগাদ
            </h2>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              নেকী ফাউন্ডেশনের সাম্প্রতিক কার্যক্রম, ইভেন্ট ও অফিশিয়াল নোটিশ
            </p>
          </div>
          <Link
            to="/news"
            className="text-xs font-bold text-[#0F172A] hover:text-[#D97706] flex items-center gap-1 font-sans"
          >
            সব খবর দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNewsArticles.map((article) => (
            <Card key={article.id} isHoverable className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {article.categoryBn}
                </span>
                <h3 className="text-base font-bold text-gray-900 font-heading leading-snug line-clamp-2 hover:text-[#D97706] transition-colors">
                  <Link to={`/news/${article.slug}`}>{article.titleBn}</Link>
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 font-sans leading-relaxed">
                  {article.excerptBn}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-sans">
                <span>{article.publishedAt}</span>
                <span>{article.readTime} পড়া</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE ELIGIBILITY & FEE WAIVER CALCULATOR */}
      <EligibilityCalculator />

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <FaqAccordion />

      {/* Live Case Tracker Result Modal */}
      <Modal

        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
        title={`আবেদনের লাইভ অবস্থা: ${trackedCase?.trackingNumber}`}
      >
        {trackedCase && (
          <div className="space-y-6 font-bangla">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-800">বর্তমান স্ট্যাটাস:</p>
                <p className="text-lg font-bold text-[#0F172A] font-heading mt-0.5">{trackedCase.legalCategory}</p>
                <p className="text-xs text-gray-600 mt-1">জেলা: {trackedCase.district} • সেবাগ্রহীতা: {trackedCase.beneficiaryName}</p>
              </div>
              <StatusBadge status={trackedCase.status} type="request" />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">আবেদনের টাইমলাইন অগ্রগতি:</h4>
              <div className="space-y-4 pl-2">
                {trackedCase.timeline.map((event, idx) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${idx === 0 ? 'bg-[#0F172A] border-[#0F172A]' : 'bg-white border-gray-300'}`} />
                      {idx < trackedCase.timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{event.description}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{event.timestamp} ({event.actor})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
