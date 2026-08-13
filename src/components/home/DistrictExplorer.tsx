import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface DivisionData {
  nameBn: string;
  districtsCount: number;
  lawyersCount: number;
  deskAddress: string;
  hotline: string;
  popularDistricts: string[];
}

const divisionDataMap: Record<string, DivisionData> = {
  'ঢাকা': {
    nameBn: 'ঢাকা বিভাগ',
    districtsCount: 13,
    lawyersCount: 18,
    deskAddress: 'ঢাকা জজ কোর্ট সংলগ্ন, সুপ্রিম কোর্ট মেইন গেইট রোড, ঢাকা',
    hotline: '০১৭০০-১12233',
    popularDistricts: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'ফরিদপুর', 'টাঙ্গাইল', 'নরসিংদী']
  },
  'চট্টগ্রাম': {
    nameBn: 'চট্টগ্রাম বিভাগ',
    districtsCount: 11,
    lawyersCount: 14,
    deskAddress: 'কোর্ট হিল রোড, জজ কোর্ট চত্বর, চট্টগ্রাম',
    hotline: '০১৭০০-২২৩৩৪৪',
    popularDistricts: ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'নোয়াখালী', 'ব্রাহ্মণবাড়িয়া']
  },
  'রাজশাহী': {
    nameBn: 'রাজশাহী বিভাগ',
    districtsCount: 8,
    lawyersCount: 9,
    deskAddress: 'কোর্ট রোড, জজ কোর্ট চত্বর, রাজশাহী',
    hotline: '০১৭০০-৩৩৪৪৫৫',
    popularDistricts: ['রাজশাহী', 'বগুড়া', 'পাবনা', 'সিরাজগঞ্জ', 'নওগাঁ']
  },
  'খুলনা': {
    nameBn: 'খুলনা বিভাগ',
    districtsCount: 10,
    lawyersCount: 8,
    deskAddress: 'কেডিএ এভিনিউ, জজ কোর্ট মোড়, খুলনা',
    hotline: '০১৭০০-৪৪৫৫৬৬',
    popularDistricts: ['খুলনা', 'যশোর', 'কুষ্টিয়া', 'সাতক্ষীরা', 'ঝিনাইদহ']
  },
  'বরিশাল': {
    nameBn: 'বরিশাল বিভাগ',
    districtsCount: 6,
    lawyersCount: 6,
    deskAddress: 'সদর রোড, জজ কোর্ট এলাকা, বরিশাল',
    hotline: '০১৭০০-৫৫৬৬৭৭',
    popularDistricts: ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'পিরোজপুর']
  },
  'সিলেট': {
    nameBn: 'সিলেট বিভাগ',
    districtsCount: 4,
    lawyersCount: 7,
    deskAddress: 'কোর্ট পয়েন্ট, জজ কোর্ট রোড, সিলেট',
    hotline: '০১৭০০-৬৬৭৭৮৮',
    popularDistricts: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ']
  },
  'রংপুর': {
    nameBn: 'রংপুর বিভাগ',
    districtsCount: 8,
    lawyersCount: 6,
    deskAddress: 'কাচারি বাজার, জজ কোর্ট রোড, রংপুর',
    hotline: '০১৭০০-৭৭৮৮৯৯',
    popularDistricts: ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম']
  },
  'ময়মনসিংহ': {
    nameBn: 'ময়মনসিংহ বিভাগ',
    districtsCount: 4,
    lawyersCount: 5,
    deskAddress: 'কাচারি রোড, জজ কোর্ট মোড়, ময়মনসিংহ',
    hotline: '০১৭০০-৮৮৯৯০০',
    popularDistricts: ['ময়মনসিংহ', 'জামালপুর', 'নেত্রকোণা', 'শেরপুর']
  },
};

export const DistrictExplorer: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>('ঢাকা');
  const navigate = useNavigate();
  const current = divisionDataMap[selectedDivision];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-bangla">
      <div className="text-center space-y-2">
        <span className="px-4 py-1.5 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full border border-amber-300 font-sans">
          দেশব্যাপী আইনী নেটওয়ার্ক
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 leading-normal">
          ৮টি বিভাগের ৬৪ জেলা আইনী সহায়তা কেন্দ্র
        </h2>
        <p className="text-sm text-gray-600 font-sans max-w-xl mx-auto">
          বিভাগ ভিত্তিক প্যানেল আইনজীবী ও সরাসরি ডেক্স কার্যালয়ের তথ্য একনজরে দেখুন
        </p>
      </div>

      {/* Division Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.keys(divisionDataMap).map((divName) => (
          <button
            key={divName}
            onClick={() => setSelectedDivision(divName)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-heading transition-all duration-300 ${
              selectedDivision === divName
                ? 'bg-[#0F172A] text-amber-400 shadow-xl border border-amber-400/40 scale-105'
                : 'glass-card text-gray-700 hover:bg-amber-100/50 hover:text-[#D97706]'
            }`}
          >
            {divName}
          </button>
        ))}
      </div>

      {/* Selected Division Card */}
      <div className="glass-card rounded-3xl p-8 shadow-2xl border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-2xl font-bold font-heading text-gray-900 leading-normal">
                {current.nameBn} আইনী সহায়তা ডেক্স
              </h3>
              <p className="text-xs text-[#D97706] font-sans font-bold">
                {current.districtsCount}টি জেলা • {current.lawyersCount}+ প্যানেল আইনজীবী সক্রিয়
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-gray-700 font-sans border-t border-amber-500/15 pt-4">
            <p className="flex items-start gap-2">
              <strong className="text-gray-900 font-heading shrink-0">কার্যালয় ঠিকানা:</strong>
              <span>{current.deskAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-gray-900 font-heading shrink-0">জরুরি হটলাইন:</strong>
              <span className="font-mono font-bold text-[#D97706]">{current.hotline}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-500 font-sans uppercase tracking-wider">
              প্রধান জেলাসমূহ:
            </p>
            <div className="flex flex-wrap gap-2">
              {current.popularDistricts.map((district) => (
                <button
                  key={district}
                  onClick={() => navigate(`/lawyers?district=${encodeURIComponent(district)}`)}
                  className="px-3 py-1 bg-amber-100/70 hover:bg-amber-200 text-[#D97706] rounded-xl text-xs font-bold font-sans transition-colors"
                >
                  {district} →
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl p-6 space-y-4 shadow-xl border border-amber-400/30 text-center">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest font-sans">
            {current.nameBn} থেকে আইনজীবী খুঁজছেন?
          </p>
          <p className="text-sm text-slate-200 font-sans leading-relaxed">
            আপনার জেলা নির্বাচন করে অবিলম্বে অভিজ্ঞতা ও বিশেষজ্ঞতার ভিত্তিতে প্যানেল আইনজীবী নির্বাচন করুন।
          </p>
          <Button
            variant="gold"
            size="md"
            isFullWidth
            onClick={() => navigate(`/lawyers?district=${encodeURIComponent(current.popularDistricts[0])}`)}
          >
            {current.nameBn} আইনজীবী তালিকা দেখুন
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};
