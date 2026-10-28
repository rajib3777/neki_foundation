import React, { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
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
    deskAddress: 'সুপ্রিম কোর্ট মেইন গেইট রোড, ঢাকা জজ কোর্ট সংলগ্ন, ঢাকা-১১০০',
    hotline: '০১৭০০-১12233',
    popularDistricts: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'ফরিদপুর', 'টাঙ্গাইল', 'নরসিংদী']
  },
  'চট্টগ্রাম': {
    nameBn: 'চট্টগ্রাম বিভাগ',
    districtsCount: 11,
    lawyersCount: 14,
    deskAddress: 'কোর্ট হিল রোড, জজ কোর্ট চত্বর, কোতোয়ালী, চট্টগ্রাম',
    hotline: '০১৭০০-২২৩৩৪৪',
    popularDistricts: ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'নোয়াখালী', 'ব্রাহ্মণবাড়িয়া']
  },
  'রাজশাহী': {
    nameBn: 'রাজশাহী বিভাগ',
    districtsCount: 8,
    lawyersCount: 9,
    deskAddress: 'কোর্ট রোড, আইনজীবী ভবন-১, বোয়ালিয়া, রাজশাহী',
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
    deskAddress: 'সদর রোড, জজ কোর্ট এলাকা, কোতোয়ালী, বরিশাল',
    hotline: '০১৭০০-৫৫৬৬৭৭',
    popularDistricts: ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'পিরোজপুর']
  },
  'সিলেট': {
    nameBn: 'সিলেট বিভাগ',
    districtsCount: 4,
    lawyersCount: 7,
    deskAddress: 'কোর্ট পয়েন্ট, জজ কোর্ট রোড, বন্দরবাজার, সিলেট',
    hotline: '০১৭০০-৬৬৭৭৮৮',
    popularDistricts: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ']
  },
  'রংপুর': {
    nameBn: 'রংপুর বিভাগ',
    districtsCount: 8,
    lawyersCount: 6,
    deskAddress: 'কাচারি বাজার, জেলা জজ কোর্ট লেন, রংপুর',
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
      <div className="text-center flex flex-col items-center">
        <div className="mb-3">
          <span className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-[#064E3B] text-xs font-bold rounded-full border border-emerald-300 font-sans">
            দেশব্যাপী আইনী নেটওয়ার্ক
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 leading-snug sm:leading-normal">
          ৮টি বিভাগের ৬৪ জেলা আইনী সহায়তা কেন্দ্র
        </h2>
        <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto pt-2">
          বিভাগ ভিত্তিক অনুমোদিত প্যানেল আইনজীবী ও সরাসরি ডেক্স কার্যালয়ের তথ্য একনজরে দেখুন
        </p>
      </div>

      {/* Division Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.keys(divisionDataMap).map((divName) => (
          <button
            key={divName}
            onClick={() => setSelectedDivision(divName)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-heading transition-all duration-300 cursor-pointer ${
              selectedDivision === divName
                ? 'bg-[#064E3B] text-amber-300 shadow-xl border border-emerald-500 scale-105'
                : 'glass-card text-slate-700 hover:bg-emerald-50 hover:text-[#064E3B]'
            }`}
          >
            {divName} বিভাগ
          </button>
        ))}
      </div>

      {/* Selected Division Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center font-bold border border-emerald-300">
              <Building2 className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 leading-normal">
                {current.nameBn} আইনী সহায়তা ডেক্স
              </h3>
              <p className="text-xs text-[#064E3B] font-sans font-bold flex items-center gap-2">
                <span>{current.districtsCount}টি জেলা কভারেজ</span>
                <span>•</span>
                <span>{current.lawyersCount}+ প্যানেল আইনজীবী সক্রিয়</span>
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 font-sans border-t border-slate-100 pt-4">
            <p className="flex items-start gap-2">
              <strong className="text-slate-900 font-heading shrink-0">কার্যালয় ঠিকানা:</strong>
              <span>{current.deskAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-slate-900 font-heading shrink-0">বিভাগীয় হটলাইন:</strong>
              <span className="font-mono font-bold text-[#064E3B]">{current.hotline}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 font-sans uppercase tracking-wider">
              প্রধান জেলাসমূহের আইনজীবী তালিকা:
            </p>
            <div className="flex flex-wrap gap-2">
              {current.popularDistricts.map((district) => (
                <button
                  key={district}
                  onClick={() => navigate(`/lawyers?district=${encodeURIComponent(district)}`)}
                  className="px-3 py-1 bg-slate-100 hover:bg-emerald-100/70 text-slate-800 hover:text-[#064E3B] rounded-xl text-xs font-bold font-sans transition-colors cursor-pointer"
                >
                  {district} →
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-[#064E3B] to-[#0F172A] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-emerald-500/30 text-center">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-widest font-sans">
            {current.nameBn} থেকে আইনজীবী খুঁজছেন?
          </p>
          <p className="text-sm text-emerald-100 font-sans leading-relaxed">
            আপনার জেলা ও বিরোধের ধরন নির্বাচন করে অবিলম্বে অভিজ্ঞতা ও বিশেষজ্ঞতার ভিত্তিতে প্যানেল আইনজীবী নির্ধারণ করুন।
          </p>
          <Button
            variant="gold"
            size="md"
            isFullWidth
            onClick={() => navigate(`/lawyers?district=${encodeURIComponent(current.popularDistricts[0])}`)}
            className="font-bold shadow-lg"
          >
            {current.nameBn} আইনজীবী তালিকা দেখুন
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};
