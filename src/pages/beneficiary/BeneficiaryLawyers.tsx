import React, { useState, useEffect } from 'react';
import { lawyerService } from '../../services/lawyer.service';
import type { Lawyer } from '../../types';
import { bangladeshDistricts } from '../../config/districts.config';
import { imageConfig } from '../../config/image.config';
import { Button } from '../../components/ui/Button';
import { 
  Search, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Briefcase, 
  X, 
  Send
} from 'lucide-react';

export const BeneficiaryLawyers: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [districtFilter, setDistrictFilter] = useState('');
  const [practiceFilter, setPracticeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState(false);
  const [consultNote, setConsultNote] = useState('');

  useEffect(() => {
    lawyerService.getLawyers().then((data) => {
      setLawyers(data);
    });
  }, []);

  const practiceAreasList = [
    'দেওয়ানি আইন',
    'ফৌজদারি আইন',
    'পারিবারিক ও অভিভাবকত্ব',
    'জমিজমা ও দলিল রেজিস্ট্রি',
    'শ্রম ও কর্মসংস্থান',
    'সাইবার নিরাপত্তা ও আইসিটি',
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesDistrict = !districtFilter || lawyer.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesPractice = !practiceFilter || lawyer.practiceAreas.some((p) => p.includes(practiceFilter));
    const matchesSearch = !searchQuery || 
      lawyer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.barAssociation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDistrict && matchesPractice && matchesSearch;
  });

  const handleSendConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setIsConsultModalOpen(false);
      setConsultNote('');
    }, 1500);
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">ফাউন্ডেশন প্যানেল আইনজীবী ডিরেক্টরি</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ৬৪ জেলার বাংলাদেশ বার কাউন্সিল তালিকাভুক্ত বিজ্ঞ প্যানেল আইনজীবীদের সাথে সরাসরি আইনী পরামর্শ ও যোগাযোগ
          </p>
        </div>
        <div className="shrink-0 bg-emerald-50 text-[#064E3B] px-4 py-2 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>মোট সক্রিয় আইনজীবী: {lawyers.length} জন</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="আইনজীবীর নাম বা বার দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
            />
          </div>

          {/* District Select */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
          >
            <option value="">— সকল জেলা —</option>
            {bangladeshDistricts.map((d) => (
              <option key={d.nameBn} value={d.nameBn}>{d.nameBn}</option>
            ))}
          </select>

          {/* Practice Area Select */}
          <select
            value={practiceFilter}
            onChange={(e) => setPracticeFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
          >
            <option value="">— সকল প্র্যাকটিস এরিয়া —</option>
            {practiceAreasList.map((pa) => (
              <option key={pa} value={pa}>{pa}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLawyers.map((lawyer) => (
          <div 
            key={lawyer.id} 
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#064E3B]/70 hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              
              {/* Header: Monogram Avatar & Status */}
              <div className="flex items-start gap-3.5">
                <img
                  src={imageConfig.getAvatarSvg(lawyer.fullName)}
                  alt={lawyer.fullName}
                  className="w-14 h-14 rounded-2xl shadow-sm shrink-0 border border-slate-200 object-cover"
                />
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      যাচাইকৃত
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      নং: {lawyer.enrollmentNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 truncate">
                    {lawyer.fullName}
                  </h3>
                  <p className="text-xs text-[#064E3B] font-semibold truncate">
                    {lawyer.designation}
                  </p>
                </div>
              </div>

              {/* Bio & Bar Details */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {lawyer.bio}
              </p>

              {/* Details Pills */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{lawyer.barAssociation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{lawyer.chamberAddress || `${lawyer.upazila}, ${lawyer.district}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>অভিজ্ঞতা: {lawyer.yearsOfExperience} বছর</span>
                </div>
              </div>

              {/* Practice Areas */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lawyer.practiceAreas.slice(0, 3).map((area, aIdx) => (
                  <span 
                    key={aIdx} 
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedLawyer(lawyer);
                  setIsConsultModalOpen(true);
                }}
                className="gap-1 text-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>পরামর্শ চান</span>
              </Button>
              <a
                href="tel:+8801819234567"
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#064E3B] hover:bg-[#047857] px-3 py-2 rounded-xl transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>কল করুন</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* CONSULTATION REQUEST MODAL */}
      {isConsultModalOpen && selectedLawyer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={imageConfig.getAvatarSvg(selectedLawyer.fullName)}
                  alt={selectedLawyer.fullName}
                  className="w-12 h-12 rounded-xl shadow-xs object-cover"
                />
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{selectedLawyer.fullName}</h3>
                  <p className="text-xs text-emerald-800 font-semibold">{selectedLawyer.barAssociation}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsConsultModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {consultSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">পরামর্শের অনুরোধ পাঠানো হয়েছে!</h4>
                <p className="text-xs text-slate-600">
                  বিজ্ঞ আইনজীবী আপনার অনুরোধ পর্যালোচনা করে ফাউন্ডেশন ডেটিং শিডিউল অনুযায়ী যোগাযোগ করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendConsult} className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">পরামর্শের ধরন: ফাউন্ডেশন অনুদানভিত্তিক প্রাক-আইনী পরামর্শ</p>
                  <p>চেম্বার অথবা টেলিফোনে প্রাথমিক আলোচনার জন্য অনুরোধ জমা হচ্ছে।</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">আপনার আইনী সমস্যা বা প্রশ্ন সংক্ষেপে লিখুন</label>
                  <textarea
                    rows={4}
                    required
                    value={consultNote}
                    onChange={(e) => setConsultNote(e.target.value)}
                    placeholder="বিজ্ঞ আইনজীবীকে আপনার সমস্যা সম্পর্কে স্পষ্ট ধারণা দিতে সংক্ষেপে ঘটনা ও প্রশ্ন তুলে ধরুন..."
                    className="w-full p-3 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsConsultModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="sm"
                    className="gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>অনুরোধ পাঠান</span>
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
