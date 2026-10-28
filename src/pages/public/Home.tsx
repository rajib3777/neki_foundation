import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Award,
  Clock,
  FileText,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Phone,
  Scale,
  Calendar,
  Quote,
  TreePine,
  Droplets,
  BookOpen,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { imageConfig } from '../../config/image.config';
import { mockNewsArticles } from '../../data/mock/news.data';
import { mockImpactStories } from '../../data/mock/stories.data';
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
import { QuickConsultationModal } from '../../components/common/QuickConsultationModal';
import { FoundationLandSection } from '../../components/common/FoundationLandSection';

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

  // Consultation Modal State
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Active Story Tab State
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

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
      
      {/* 1. CINEMATIC HUMAN-CENTERED HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#064E3B] text-white overflow-hidden border-b-2 border-emerald-600/30">
        
        {/* Full-width Photography Background with reduced gentle overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageConfig.heroCourt}
            alt="বাংলাদেশ সুপ্রিম কোর্ট ও বিচার ভবন"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Subtle gradient to highlight the photo while maintaining text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-14 sm:py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Main Headline */}
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-slate-200 font-sans tracking-wide">
                  ন্যায়বিচার, মানবিক মর্যাদা ও
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-heading leading-snug sm:leading-normal text-white drop-shadow-xl">
                  আইনের সুরক্ষায়{' '}
                  <span className="text-gold-gradient font-heading">নিবেদিত</span>
                </h1>
              </div>

              {/* Human Tagline */}
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans max-w-2xl drop-shadow-sm font-normal">
                অর্থের অভাবে যেন কোনো নাগরিকের ন্যায্য অধিকার পদদলিত না হয়। নেকী ফাউন্ডেশন ৬৪ জেলায় সম্পূর্ণ বিনামূল্যে ও নামমাত্র খরচে বাংলাদেশ বার কাউন্সিল সনদপ্রাপ্ত অভিজ্ঞ আইনজীবীদের প্রত্যক্ষ সহায়তা নিশ্চিত করে।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <Button
                  size="lg"
                  variant="gold"
                  onClick={() => navigate('/legal-assistance/apply')}
                  className="shadow-xl hover:scale-105 transition-all text-slate-950 font-black"
                >
                  বিনামূল্যে আইনী সহায়তা নিন
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <button
                  type="button"
                  onClick={() => setConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-base bg-white hover:bg-slate-50 text-[#064E3B] border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-[#D97706]" />
                  <span>পরামর্শ অ্যাপয়েন্টমেন্ট</span>
                </button>
              </div>

              {/* Four Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs font-sans text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>বার কাউন্সিল নিবন্ধিত</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>৬৪ জেলা আইনী উইং</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>১০০% গোপনীয়তা</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>২৪/৭ হেল্পডেস্ক</span>
                </div>
              </div>

            </div>

            {/* Right Card: Quick Consultation & Lawyer Finder Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-2xl">
                
                {/* Decorative glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-1 relative z-10 border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-sans flex items-center gap-1.5">
                      <Scale className="w-4 h-4" /> সরাসরি আইনজীবী অনুসন্ধান
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                      সরাসরি সংযোগ
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    আপনার জেলায় আইনজীবী খুঁজছেন?
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    অভিজ্ঞ প্যানেল আইনজীবীদের প্রোফাইল ও বিশেষজ্ঞতার তথ্য দেখতে জেলা নির্বাচন করুন:
                  </p>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">জেলা নির্বাচন:</label>
                    <select
                      value={heroDistrict}
                      onChange={(e) => setHeroDistrict(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-bold text-slate-900 bg-white/95 rounded-xl border border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans shadow-sm"
                    >
                      <option value="">— সকল জেলা (৬৪টি জেলায় প্যানেল সক্রিয়) —</option>
                      {bangladeshDistricts.map((d) => (
                        <option key={d.id} value={d.nameBn}>{d.nameBn} ({d.divisionBn} বিভাগ)</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">মামলা বা বিরোধের ক্ষেত্র:</label>
                    <select
                      value={heroCategory}
                      onChange={(e) => setHeroCategory(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-bold text-slate-900 bg-white/95 rounded-xl border border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans shadow-sm"
                    >
                      <option value="">— সকল আইনী ক্ষেত্র —</option>
                      <option value="জমিজমা ও দেওয়ানী আইন">জমিজমা ও দেওয়ানী আইন</option>
                      <option value="ফৌজদারী আইন">ফৌজদারী আইন</option>
                      <option value="পারিবারিক ও দেওয়ানী আইন">পারিবারিক ও খোরপোষ</option>
                      <option value="শ্রম আইন">শ্রম আইন ও অধিকার</option>
                      <option value="সাইবার অপরাধ">সাইবার অপরাধ ও হয়রানি</option>
                      <option value="মানবাধিকার ও সংবিধান">মানবাধিকার ও নাগরিক সমতা</option>
                    </select>
                  </div>

                  <Button type="submit" variant="gold" isFullWidth size="lg" className="font-black shadow-lg">
                    <Search className="w-4 h-4 mr-2" />
                    আইনজীবী তালিকা দেখুন
                  </Button>
                </form>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-sans relative z-10">
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(true)}
                    className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> ফ্রি পরামর্শ বুকিং
                  </button>
                  <a href="tel:+8801800000000" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> জরুরি হেল্পলাইন
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REAL-TIME LIVE CASE STATUS TRACKER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-14 relative z-20">
        <div className="glass-card rounded-3xl shadow-xl border border-emerald-600/20 overflow-hidden">
          
          {/* Accent Header */}
          <div className="bg-[#064E3B] px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white border-b border-emerald-700/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs font-black text-amber-300 uppercase tracking-widest">
                  আবেদনের রিয়েল-টাইম লাইভ ট্র্যাকার
                </p>
                <p className="text-xs text-emerald-100 font-sans">
                  আপনার ট্র্যাকিং নম্বর দিয়ে তাৎক্ষণিক অগ্রগতি ও আইনজীবী মনোনয়ন তথ্য জানুন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ট্র্যাকিং সার্ভার সক্রিয়
              </span>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 bg-white/95">
            <form onSubmit={handleTrackCase} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="ট্র্যাকিং আইডি লিখুন — যেমন: NF-LEG-2026-001"
                  className="w-full pl-10 pr-4 py-3 text-xs font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 transition-all"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="md"
                isLoading={isSearchingCase}
                className="shrink-0 sm:w-auto w-full font-black"
              >
                <Search className="w-4 h-4 mr-2" />
                স্ট্যাটাস দেখুন
              </Button>
            </form>

            {caseNotFound && (
              <div className="mt-3 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-base shrink-0">⚠️</span>
                <p className="text-xs text-amber-800 font-sans">
                  ট্র্যাকিং নম্বরটি পাওয়া যায়নি। নিচের ডেমো নম্বরটিতে ক্লিক করে পরীক্ষা করতে পারেন:{' '}
                  <button
                    type="button"
                    onClick={() => setTrackingNumberInput('NF-LEG-2026-001')}
                    className="font-bold font-mono underline text-[#D97706] hover:text-amber-800"
                  >
                    NF-LEG-2026-001
                  </button>
                </p>
              </div>
            )}

            <div className="mt-3.5 flex flex-wrap gap-2 items-center text-xs font-sans">
              <span className="text-slate-400 font-semibold">সরাসরি টেস্ট করুন:</span>
              {['NF-LEG-2026-001', 'NF-LEG-2026-002', 'NF-LEG-2026-003'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setTrackingNumberInput(code)}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold text-[#064E3B] bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. FOUNDATION EMBLEM, IDENTITY, WORK & MISSION (কাজ ও উদ্দেশ্য) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-white via-emerald-50/25 to-white rounded-3xl border-2 border-emerald-800/15 p-6 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden">
          
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
            {/* Sacred Inscription from the top of the emblem */}
            <div>
              <span className="text-sm sm:text-base font-bold text-[#064E3B] bg-emerald-50/90 px-6 py-1.5 rounded-full border border-emerald-300/80 shadow-xs inline-block">
                “আল্লাহ্ সর্ব শক্তিমান পরম দয়ালু ও করুনাময়”
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
              নেকী ফাউন্ডেশন — আমাদের মূল কাজ ও উদ্দেশ্য
            </h2>
          </div>

          {/* PROMINENT CENTERED LOGO SHOWCASE */}
          <div className="flex flex-col items-center justify-center my-8 sm:my-10 relative z-10 text-center">
            
            {/* Grand Circular Logo */}
            <div className="relative group w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-600/30 via-amber-400/30 to-emerald-600/30 blur-3xl group-hover:blur-4xl transition-all duration-700" />
              <div className="relative w-full h-full rounded-full p-3 bg-white shadow-2xl border-4 border-emerald-700/40 overflow-hidden flex items-center justify-center">
                <img
                  src={imageConfig.logo}
                  alt="নেকী ফাউন্ডেশন অফিসিয়াল মনোগ্রাম"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Official Registration & Geographical Roots */}
            <div className="mt-6 space-y-2.5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-emerald-300 shadow-sm text-xs sm:text-sm font-bold text-[#064E3B]">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>বালুড়া, গদখালী, ঝিকরগাছা, যশোর, বাংলাদেশ</span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                যশোরের ঝিকরগাছা উপজেলার গদখালী ইউনিয়নের ঐতিহ্যবাহী বালুড়া গ্রাম থেকে সূচিত হওয়া এই সংগঠন সারা বাংলাদেশের পিছিয়ে পড়া ও প্রান্তিক মানুষের অধিকার রক্ষা, আইনী সহায়তা, সামাজিক মর্যাদা ও পরিবেশ সুরক্ষায় আজ এক বিশ্বস্ত ঠিকানা।
              </p>
            </div>

          </div>

          {/* 4 CORE PILLARS OF WORK & MISSION (কাজ ও উদ্দেশ্যসমূহ) */}
          <div className="relative z-10 pt-4 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest font-sans">
                চারটি মূল স্তম্ভে আমাদের মানবিক কর্মযজ্ঞ
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                যে লক্ষ্যে আমরা অবিরাম কাজ করে যাচ্ছি
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* 1. Legal Aid */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all space-y-3 group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                    বিনামূল্যে আইনী সহায়তা
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    অর্থ ও প্রতিপত্তির অভাবে কোনো নাগরিক যেন ন্যায়বিচার থেকে বঞ্চিত না হয়। সুপ্রিম কোর্ট ও জেলা জজ কোর্টের অভিজ্ঞ আইনজীবীদের মাধ্যমে প্রাক-আইনী পরামর্শ ও আদালতের প্রতিনিধিত্ব প্রদান।
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-800">
                  ন্যায়বিচার প্রাপ্তির নিশ্চয়তা
                </div>
              </div>

              {/* 2. Tree Plantation & Green Environment */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all space-y-3 group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                    সবুজ বিপ্লব ও বৃক্ষরোপণ
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    ফুল ও প্রাকৃতিক প্রাচুর্যের লীলাভূমি গদখালী-যশোরের ঐতিহ্য ধারণ করে দেশব্যাপী লক্ষাধিক ফলদ, বনজ ও ঔষধি বৃক্ষরোপণের মাধ্যমে পরিবেশ ও জীববৈচিত্র্য রক্ষা।
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-green-800">
                  পরিবেশের ভারসাম্য ও বনায়ন
                </div>
              </div>

              {/* 3. Blood Donation & Emergency Health */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all space-y-3 group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                    জরুরি রক্তদান ও স্বাস্থ্যসেবা
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    মুমূর্ষু রোগীর জীবন রক্ষার্থে ২৪ ঘণ্টা রক্ত সংগ্রহ সহায়তা, স্বেচ্ছাসেবী রক্তদাতা নেটওয়ার্ক পরিচালনা এবং সংকটকালে মানবিক খাদ্য ও বিনামূল্যে চিকিৎসাসেবা।
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-red-700">
                  ২৪/৭ জরুরি ব্লাড সাপোর্ট
                </div>
              </div>

              {/* 4. Education, Ethics & Social Rehabilitation */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all space-y-3 group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                    শিক্ষা, নীতিবোধ ও পুনর্বাসন
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    লোগোর উন্মুক্ত গ্রন্থ ও জ্ঞানশিখার আদর্শ অনুযায়ী সুবিধাবঞ্চিত শিশুদের শিক্ষার প্রসার, ধর্মীয় ও নৈতিক মূল্যবোধ জাগ্রত করা এবং অসহায়দের আত্মনির্ভরশীল করা।
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-amber-800">
                  জ্ঞানের আলো ও মানবিক মর্যাদা
                </div>
              </div>

            </div>

            {/* Centered Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/legal-assistance/apply')}
                className="font-bold text-sm shadow-md"
              >
                সহায়তার জন্য আবেদন করুন
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/about')}
                className="font-bold text-sm"
              >
                আমাদের পূর্ণ গঠনতন্ত্র ও উদ্দেশ্য
              </Button>
            </div>

          </div>

          {/* Trust Principles Strip at Bottom */}
          <div className="mt-12 pt-8 border-t border-emerald-900/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <p className="text-xs font-bold text-[#064E3B]">১০০% অলাভজনক</p>
              <p className="text-[11px] text-slate-500 font-sans">সম্পূর্ণ মানবিক ও নিঃস্বার্থ ব্রত</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <p className="text-xs font-bold text-[#064E3B]">সার্বজনীন মানবতা</p>
              <p className="text-[11px] text-slate-500 font-sans">ধর্ম-বর্ণ নির্বিশেষে সেবা</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <p className="text-xs font-bold text-[#064E3B]">আরজেএসসি স্বচ্ছতা</p>
              <p className="text-[11px] text-slate-500 font-sans">প্রতিটি কার্যক্রম আইনানুগ ও অডিটেড</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <p className="text-xs font-bold text-[#064E3B]">যশোর থেকে দেশব্যাপী</p>
              <p className="text-[11px] text-slate-500 font-sans">৬৪টি জেলায় সমন্বিত নেটওয়ার্ক</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LIVE IMPACT METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-slate-200">
          
          <div className="space-y-1.5">
            <p className="text-4xl lg:text-5xl font-black text-[#064E3B] font-heading">৬৪টি</p>
            <p className="text-xs font-bold text-slate-800 font-sans uppercase tracking-wider">জেলা আইনী নেটওয়ার্ক</p>
            <p className="text-[11px] text-slate-500 font-sans">সমগ্র বাংলাদেশে সক্রিয় প্যানেল</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-4xl lg:text-5xl font-black text-[#D97706] font-heading">৫০+</p>
            <p className="text-xs font-bold text-slate-800 font-sans uppercase tracking-wider">প্যানেল আইনজীবী</p>
            <p className="text-[11px] text-slate-500 font-sans">বাংলাদেশ বার কাউন্সিল নিবন্ধিত</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-4xl lg:text-5xl font-black text-[#064E3B] font-heading">১,২০০+</p>
            <p className="text-xs font-bold text-slate-800 font-sans uppercase tracking-wider">পরিবারকে আইনী সহায়তা</p>
            <p className="text-[11px] text-slate-500 font-sans">বিনা খরচে ও স্বল্প প্রসেসিং ফিতে</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-4xl lg:text-5xl font-black text-[#D97706] font-heading">১০০%</p>
            <p className="text-xs font-bold text-slate-800 font-sans uppercase tracking-wider">স্বচ্ছতা ও জবাবদিহিতা</p>
            <p className="text-[11px] text-slate-500 font-sans">উন্মুক্ত ত্রৈমাসিক অডিট প্রতিবেদন</p>
          </div>

        </div>
      </section>

      {/* 4. REAL BENEFICIARY IMPACT STORIES (PICTURE-FREE EDITORIAL CASE DOSSIER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Fixed Header with No Overlap */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-[#064E3B] text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-200 shadow-2xs">
              বাস্তব জীবনের গল্প ও আইনী লড়াই
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading leading-snug sm:leading-normal pt-2">
            যাঁদের পাশে দাঁড়িয়েছি আমরা
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-1">
            কোনো কাগুজে পরিসংখ্যান নয় — সাধারণ মানুষের অধিকার রক্ষা, পৈতৃক ভিটে উদ্ধার ও মানবিক মর্যাদা প্রতিষ্ঠায় আমাদের আইনজীবীদের সফল আইনী নিষ্পত্তির প্রামাণ্য বিবরণ।
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {mockImpactStories.map((story, idx) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setActiveStoryIdx(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-bangla transition-all cursor-pointer flex items-center gap-2 border ${
                activeStoryIdx === idx
                  ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-md scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeStoryIdx === idx ? 'bg-amber-400' : 'bg-slate-300'}`} />
              <span>কেস #{idx + 1}: {story.category.split(' ')[0]} ({story.beneficiaryLocation.split(' ')[0]})</span>
            </button>
          ))}
        </div>

        {/* Picture-Free Editorial Case Dossier Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-emerald-800/15 shadow-xl relative overflow-hidden space-y-8">
          
          {/* Top Case Meta Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 bg-emerald-50 text-[#064E3B] text-xs font-bold rounded-lg border border-emerald-200/80 font-bangla">
                আইনী ক্ষেত্র: {mockImpactStories[activeStoryIdx].category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 font-sans">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {mockImpactStories[activeStoryIdx].beneficiaryLocation}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-sans">
              <span className="text-slate-400 font-medium">নিষ্পত্তিকাল: {mockImpactStories[activeStoryIdx].date}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-bangla">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                আদালতে চূড়ান্ত নিষ্পত্তি
              </span>
            </div>
          </div>

          {/* Case Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Dignified Beneficiary Quote & Identity Badge */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/30 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 space-y-6 flex flex-col justify-between shadow-2xs">
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-amber-300 flex items-center justify-center shadow-md">
                  <Quote className="w-6 h-6 fill-amber-300" />
                </div>

                <blockquote className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-relaxed italic">
                  “{mockImpactStories[activeStoryIdx].quote}”
                </blockquote>
              </div>

              <div className="pt-5 border-t border-emerald-200/60 space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#064E3B] text-amber-300 flex items-center justify-center font-heading font-black text-base shadow-sm border border-emerald-700">
                    {mockImpactStories[activeStoryIdx].beneficiaryName.charAt(0) || 'সে'}
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 font-heading">
                      {mockImpactStories[activeStoryIdx].beneficiaryName}
                    </p>
                    <p className="text-xs text-slate-500 font-sans">
                      সেবাগ্রহীতা • {mockImpactStories[activeStoryIdx].beneficiaryLocation}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 border border-emerald-100 text-xs font-sans space-y-0.5">
                  <span className="text-slate-400 block text-[11px]">পরিচালনাকারী প্যানেল আইনজীবী:</span>
                  <strong className="text-slate-800 text-xs font-bangla block">
                    {mockImpactStories[activeStoryIdx].lawyerName}
                  </strong>
                </div>
              </div>

            </div>

            {/* Right: Detailed Legal Journey & Official Court Outcome */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading leading-snug">
                  {mockImpactStories[activeStoryIdx].title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                  {mockImpactStories[activeStoryIdx].story}
                </p>
              </div>

              {/* Official Court Outcome Ribbon */}
              <div className="p-5 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl border-2 border-emerald-600/30 flex items-start gap-4 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-950 uppercase tracking-wider font-sans">
                    আদালতের চূড়ান্ত রায় ও আইনী নিষ্পত্তি:
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#064E3B] font-heading leading-snug">
                    {mockImpactStories[activeStoryIdx].outcome}
                  </p>
                  <p className="text-xs text-slate-500 font-sans">
                    নেকী ফাউন্ডেশনের প্রত্যক্ষ অর্থায়ন ও সুপ্রিম কোর্ট/জেলা বার প্যানেল আইনজীবীর সহায়তায় অর্জিত
                  </p>
                </div>
              </div>

              {/* Bottom Call to Action for viewers */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <p className="text-xs text-slate-600 font-sans">
                  আপনারও কি একই ধরণের আইনী বিরোধ বা অধিকার হরণের সমস্যা রয়েছে?
                </p>
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => navigate('/legal-assistance/apply')}
                  className="font-bold text-xs"
                >
                  বিনামূল্যে আপনার কেস নথিভুক্ত করুন
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. THE FOUR HUMANITARIAN PILLARS OF NEKI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-300 shadow-2xs">
              আমাদের ৪টি মানবিক স্তম্ভ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading leading-snug sm:leading-normal pt-2">
            ন্যায়, পরিবেশ ও জীবন সুরক্ষার যৌথ প্রয়াস
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed">
            নেকী ফাউন্ডেশন কেবল আদালতেই সীমাবদ্ধ নয় — সামাজিক সুরক্ষা ও পরিবেশের ভারসাম্য রক্ষায়ও আমরা নিবেদিতপ্রাণ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Legal Aid */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-[#064E3B]">
            <div className="h-52 overflow-hidden relative">
              <img src={imageConfig.legalDesk} alt="বিনামূল্যে আইনী সহায়তা" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">১ম স্তম্ভ • আইনী সুরক্ষা</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#064E3B] transition-colors">
                  বিনামূল্যে ও স্বল্পব্যয়ে আইনী সহায়তা
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  দরিদ্র, খেটে খাওয়া কৃষক ও শ্রমজীবী মানুষের অধিকার রক্ষায় প্যানেল আইনজীবীদের মাধ্যমে সুপ্রিম কোর্ট ও জেলা জজ আদালতে মামলা পরিচালনা।
                </p>
              </div>
              <Link to="/services/legal-assistance" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] hover:text-[#D97706] pt-2">
                বিস্তারিত কার্যক্রম জানুন <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 2: Tree Plantation */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-emerald-600">
            <div className="h-52 overflow-hidden relative">
              <img src={imageConfig.treeEnv} alt="বৃক্ষরোপণ কর্মসূচি" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-emerald-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">২য় স্তম্ভ • সবুজ বাংলাদেশ</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-emerald-700 transition-colors">
                  দেশব্যাপী বৃক্ষরোপণ কর্মসূচি
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  জলবায়ু ঝুঁকি মোকাবেলায় নদীভাঙন ও উপকূলীয় এলাকায় ফলদ ও বনজ চারা রোপণ এবং গ্রামীণ সচেতনতা অভিযান।
                </p>
              </div>
              <Link to="/services/tree-plantation" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-[#064E3B] pt-2">
                বৃক্ষরোপণ রিপোর্ট <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 3: Blood Donation */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-red-600">
            <div className="h-52 overflow-hidden relative">
              <img src={imageConfig.healthCare} alt="রক্তদান নেটওয়ার্ক" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-red-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">৩য় স্তম্ভ • জীবন রক্ষাকারী হেল্পডেস্ক</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-red-700 transition-colors">
                  রক্তদান ও জরুরি স্বাস্থ্য সেবা
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  মুমূর্ষু রোগীর রক্তের প্রয়োজনে স্বেচ্ছাসেবী রক্তদাতা অনুসন্ধান, থ্যালাসেমিয়া শিশুদের সহায়তা ও জরুরি স্বাস্থ্য পরামর্শ।
                </p>
              </div>
              <Link to="/services/blood-donation" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 pt-2">
                রক্তদাতা নেটওয়ার্ক <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 4: Social Protection */}
          <Card isHoverable padding="none" className="flex flex-col justify-between h-full group overflow-hidden border-t-4 border-t-amber-600">
            <div className="h-52 overflow-hidden relative">
              <img src={imageConfig.heroCourt} alt="সামাজিক সুরক্ষা" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-xs">৪র্থ স্তম্ভ • সামাজিক কল্যাণ</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-amber-700 transition-colors">
                  দুর্যোগকালীন ত্রাণ ও শীতবস্ত্র
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  বন্যা ও শৈত্যপ্রবাহে ক্ষতিগ্রস্ত প্রান্তিক জনগোষ্ঠীকে খাদ্য সহায়তা, পুনর্বাসন সামগ্রী ও শীতবস্ত্র পৌঁছে দেওয়া।
                </p>
              </div>
              <Link to="/services/social-protection" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 pt-2">
                ত্রাণ কার্যক্রমের বিবরণী <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

        </div>
      </section>

      {/* 6. INTERACTIVE DIVISION & DISTRICT EXPLORER */}
      <DistrictExplorer />

      {/* 7. DEDICATED FOUNDATION PROPERTY & LAND DEVELOPMENT SECTION */}
      <FoundationLandSection />

      {/* 8. FINANCIAL TRANSPARENCY & WHERE EVERY TAKA GOES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="px-4 py-1.5 bg-emerald-100 text-[#064E3B] text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-300">
              স্বচ্ছ গভর্ন্যান্স ও অডিট
            </span>
            <h2 className="text-3xl font-bold font-heading text-slate-900 leading-normal">
              আপনার আস্থার প্রতিটি পয়সার হিসাব জনসম্মুখে উন্মুক্ত
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              নেকী ফাউন্ডেশন শতভাগ আর্থিক স্বচ্ছতায় বিশ্বাসী। আমাদের বার্ষিক নিরীক্ষিত হিসাব, পরিচালনা ব্যয় এবং আইনী সহায়তা প্রাপ্ত পরিবারের রিপোর্ট নিয়মিত ওয়েবসাইটে প্রকাশ করা হয়।
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>সরাসরি মামলা পরিচালনা, আইনী নথি ও কোর্ট ফি খরচ</span>
                  <span className="text-[#064E3B]">৮২%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#064E3B] rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>জরুরি ত্রাণ, খাদ্য সুরক্ষা ও বৃক্ষরোপণ তহবিল</span>
                  <span className="text-emerald-600">১০%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>প্রশাসনিক পরিচালনা ও কেন্দ্রীয় হেল্পডেস্ক</span>
                  <span className="text-amber-600">৮%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#064E3B] to-[#0F172A] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-amber-400/30 text-center">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-white">
              নিরীক্ষিত বার্ষিক হিসাব বিবরণী
            </h3>
            <p className="text-xs text-slate-200 font-sans leading-relaxed">
              আইনগত বাধ্যবাধকতা ও নৈতিক দায়বদ্ধতা থেকে আমাদের চার্টার্ড একাউন্টেন্টস ফার্ম কর্তৃক নিরীক্ষিত প্রতিবেদন ডাউনলোড করুন।
            </p>
            <div className="pt-2">
              <Button
                variant="gold"
                size="md"
                isFullWidth
                onClick={() => navigate('/transparency')}
                className="font-bold shadow-lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                অডিট রিপোর্ট ডাউনলোড করুন
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. HOW IT WORKS: 4 COMPASSIONATE STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 bg-amber-100 text-[#B45309] text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200">
              সহজ কার্যপ্রণালী
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading leading-snug sm:leading-normal">
            কীভাবে আইনী সহায়তা পাবেন?
          </h2>
          <p className="text-sm text-slate-600 font-sans pt-2">
            মাত্র ৪টি সুনির্দিষ্ট ধাপে আপনার আবেদন গৃহীত ও প্যানেল আইনজীবীদের দ্বারা পর্যালোচিত হবে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-4 relative border-t-4 border-t-[#064E3B] hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-amber-400 font-extrabold flex items-center justify-center text-xl shadow-md">
              ১
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">আবেদন ও বিবরণ জমা</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              অনলাইন ফর্মে বা সরাসরি আমাদের হেল্পলাইনে আপনার আইনী সমস্যা ও জেলার তথ্য প্রদান করে আবেদন করুন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#064E3B] hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-amber-400 font-extrabold flex items-center justify-center text-xl shadow-md">
              ২
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">আইনজীবী নির্বাচন</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              আপনার জেলার অনুমোদিত প্যানেল আইনজীবীদের তালিকা থেকে উপযুক্ত অভিজ্ঞ এডভোকেট সমন্বয়ক কর্তৃক মনোনীত হবেন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#064E3B] hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-amber-400 font-extrabold flex items-center justify-center text-xl shadow-md">
              ৩
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">নথি যাচাই ও প্রাক-পরামর্শ</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              প্রয়োজনীয় কাগজপত্র পর্যালোচনা করে আইনজীবী সরাসরি আপনার সাথে কথা বলবেন এবং মামলার আইনী দিক বোঝাবেন।
            </p>
          </Card>

          <Card className="space-y-4 relative border-t-4 border-t-[#064E3B] hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-amber-400 font-extrabold flex items-center justify-center text-xl shadow-md">
              ৪
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">আইনী লড়াই বা মীমাংসা</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              আদালতে জোরালো আইনী প্রতিনিধিত্ব অথবা দুই পক্ষের সম্মানজনক আপোষের মাধ্যমে সমাধান নিশ্চিত করা হবে।
            </p>
          </Card>
        </div>
      </section>

      {/* 9. LATEST NEWS & EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading leading-snug sm:leading-normal">
              সংবাদ ও সাম্প্রতিক কার্যক্রম
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-1">
              নেকী ফাউন্ডেশনের সাম্প্রতিক আইনী সহায়তা, বৃক্ষরোপণ ক্যাম্প ও অফিশিয়াল নোটিশ
            </p>
          </div>
          <Link
            to="/news"
            className="text-xs font-bold text-[#064E3B] hover:text-[#D97706] flex items-center gap-1 font-sans"
          >
            সব সংবাদ দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNewsArticles.slice(0, 3).map((article) => (
            <Card key={article.id} isHoverable className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#064E3B] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {article.categoryBn}
                </span>
                <h3 className="text-base font-bold text-slate-900 font-heading leading-snug line-clamp-2 hover:text-[#064E3B] transition-colors">
                  <Link to={`/news/${article.slug}`}>{article.titleBn}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 font-sans leading-relaxed">
                  {article.excerptBn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-sans">
                <span>{article.publishedAt}</span>
                <span>{article.readTime} পড়া</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 10. INTERACTIVE ELIGIBILITY & FEE WAIVER CALCULATOR */}
      <EligibilityCalculator />

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <FaqAccordion />

      {/* Live Case Tracker Result Modal */}
      <Modal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
        title={`আবেদনের লাইভ অবস্থা: ${trackedCase?.trackingNumber}`}
      >
        {trackedCase && (
          <div className="space-y-6 font-bangla">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800">বর্তমান স্ট্যাটাস:</p>
                <p className="text-lg font-bold text-[#064E3B] font-heading mt-0.5">{trackedCase.legalCategory}</p>
                <p className="text-xs text-slate-600 mt-1">জেলা: {trackedCase.district} • সেবাগ্রহীতা: {trackedCase.beneficiaryName}</p>
              </div>
              <StatusBadge status={trackedCase.status} type="request" />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">আবেদনের টাইমলাইন অগ্রগতি:</h4>
              <div className="space-y-4 pl-2">
                {trackedCase.timeline.map((event, idx) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${idx === 0 ? 'bg-[#064E3B] border-[#064E3B]' : 'bg-white border-slate-300'}`} />
                      {idx < trackedCase.timeline.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{event.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{event.timestamp} ({event.actor})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Quick Consultation Modal */}
      <QuickConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

    </div>
  );
};
