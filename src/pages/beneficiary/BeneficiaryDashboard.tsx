import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { legalAidService } from '../../services/legalAid.service';
import type { LegalAidRequest, User } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { 
  FileText, 
  Search, 
  FolderLock, 
  CreditCard, 
  UserCheck, 
  Calendar, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  PlusCircle, 
  AlertCircle,
  X,
  FileCheck2,
  Printer
} from 'lucide-react';

export const BeneficiaryDashboard: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [selectedCase, setSelectedCase] = useState<LegalAidRequest | null>(null);

  useEffect(() => {
    legalAidService.getRequests({ beneficiaryId: currentUser?.id }).then((data) => {
      setRequests(data);
    });
  }, [currentUser]);

  // Primary active case
  const activeCase = requests.find((r) => !['COMPLETED', 'CANCELLED'].includes(r.status)) || requests[0];

  const stats = [
    { 
      label: 'চলমান আইনী মামলা', 
      value: requests.filter((r) => ['IN_PROGRESS', 'ASSIGNED'].includes(r.status)).length, 
      subtext: 'বিজ্ঞ আইনজীবীর অধীনে পরিচালিত',
      icon: FileText, 
      color: 'bg-emerald-50 text-[#064E3B] border-emerald-200' 
    },
    { 
      label: 'নিযুক্ত প্যানেল আইনজীবী', 
      value: requests.filter((r) => r.lawyerName).length, 
      subtext: 'বার কাউন্সিল তালিকাভুক্ত',
      icon: UserCheck, 
      color: 'bg-blue-50 text-blue-800 border-blue-200' 
    },
    { 
      label: 'সংরক্ষিত আইনী নথি', 
      value: requests.reduce((acc, r) => acc + (r.documents?.length || 0), 0) + 3, 
      subtext: 'ভল্টে নিরাপদে সংরক্ষিত',
      icon: FolderLock, 
      color: 'bg-amber-50 text-amber-800 border-amber-200' 
    },
    { 
      label: 'ফাউন্ডেশন আইনী অনুদান', 
      value: '১০০% ফি মওকুফ', 
      subtext: 'মানবিক সহায়তা তহবিলের অধীনে',
      icon: CreditCard, 
      color: 'bg-purple-50 text-purple-800 border-purple-200' 
    },
  ];

  return (
    <div className="space-y-7 font-bangla pb-12">

      {/* 1. WELCOME HERO BANNER */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#043E2F] to-[#011F1B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                যাচাইকৃত সেবাগ্রহীতা
              </span>
              <span className="text-xs text-emerald-200 font-sans">
                আইডি: NF-BEN-2026/8842
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              স্বাগতম, {currentUser?.name || 'মোঃ রহিম উল্লাহ'}!
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed font-bangla">
              নেকী ফাউন্ডেশন আইনী সহায়তা পোর্টাল। আপনার আবেদনের অগ্রগতি, আদালতের শুনানির তারিখ এবং আইনজীবীর সাথে যোগাযোগ এখান থেকেই সরাসরি পরিচালনা করুন।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                আবাসস্থল: {currentUser?.district || 'যশোর'}, বাংলাদেশ
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                জরুরি আইনী হটলাইন: ০৯৬১১-০০০০০০ (২৪/৭)
              </span>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link to="/beneficiary/requests?create=true">
              <Button variant="gold" size="md" className="w-full shadow-lg gap-2">
                <PlusCircle className="w-4 h-4 text-slate-950" />
                <span>নতুন আইনী সহায়তা আবেদন</span>
              </Button>
            </Link>
            <Link to="/beneficiary/lawyers">
              <Button variant="outline" size="md" className="w-full bg-white/10 hover:bg-white text-white hover:text-[#064E3B] border-emerald-400/40 gap-2">
                <Search className="w-4 h-4" />
                <span>বিজ্ঞ আইনজীবী খুঁজুন</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md bg-white ${stat.color.split(' ')[2]}`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-600 block">{stat.label}</span>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-slate-500 font-medium">{stat.subtext}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color.split(' ')[0]} ${stat.color.split(' ')[1]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ACTIVE CASE SPOTLIGHT TRACKER */}
      {activeCase && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-[#064E3B] border border-emerald-200">
                  চলমান আইনী সহায়তা
                </span>
                <code className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md">
                  {activeCase.trackingNumber}
                </code>
                <span className="text-xs text-slate-500">• {activeCase.district} জেলা</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 pt-1">
                {activeCase.legalCategory}
              </h2>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedCase(activeCase)}
              className="self-start sm:self-auto gap-1.5"
            >
              <span>বিস্তারিত কেস লগ ও নথিপত্র</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">আবেদনের চলমান অবস্থা</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
              {[
                { title: 'আবেদন দাখিল', desc: 'অনলাইনে গ্রহণ', active: true, done: true },
                { title: 'প্রাথমিক নিরীক্ষা', desc: 'নথি যাচাই সম্পন্ন', active: true, done: true },
                { title: 'আইনজীবী নিয়োগ', desc: 'দায়িত্ব অর্পণ সম্পন্ন', active: true, done: true },
                { title: 'আদালত কার্যক্রম', desc: 'শুনানি ও নোটিশ চলমান', active: true, done: false, current: true },
                { title: 'চূড়ান্ত নিষ্পত্তি', desc: 'আইনী রায় ও সমাধান', active: false, done: false },
              ].map((step, sIdx) => (
                <div 
                  key={sIdx} 
                  className={`p-3 rounded-2xl border transition-all ${
                    step.current
                      ? 'bg-emerald-50/80 border-[#064E3B] ring-2 ring-emerald-600/20 shadow-xs'
                      : step.done
                      ? 'bg-slate-50 border-emerald-200 text-slate-800'
                      : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step.current
                        ? 'bg-[#064E3B] text-white animate-pulse'
                        : step.done
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step.done ? '✓' : sIdx + 1}
                    </div>
                    <span className={`text-xs font-bold ${step.current ? 'text-[#064E3B]' : 'text-slate-800'}`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lawyer & Upcoming Court Hearing Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            
            {/* Assigned Advocate Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#064E3B] text-amber-400 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border border-amber-400/40">
                আই
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider block">নিযুক্ত প্যানেল আইনজীবী</span>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  {activeCase.lawyerName || 'এডভোকেট সৈয়দ রেজওয়ান হোসেন'}
                </h4>
                <p className="text-xs text-slate-600">সিনিয়র আইনজীবী • জেলা বার এসোসিয়েশন, যশোর</p>
                <div className="pt-2 flex items-center gap-3">
                  <a 
                    href="tel:+8801819234567" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] bg-white px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>কল করুন</span>
                  </a>
                  <span className="text-xs text-slate-500">চেম্বার সময়: বিকাল ৪টা - রাত ৮টা</span>
                </div>
              </div>
            </div>

            {/* Next Hearing / Action Card */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                <Calendar className="w-6 h-6 text-amber-700" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">পরবর্তী গুরুত্বপূর্ণ তারিখ ও সময়</span>
                <p className="text-base font-bold text-slate-900 font-heading">
                  ১৮ এপ্রিল ২০২৬, সকাল ১০:৩০ মিনিট
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  পারিবারিক আদালত, যশোর — বিজ্ঞ আদালতে জবাব দাখিল ও নোটিশ নিরীক্ষার জন্য দিন ধার্য রয়েছে।
                </p>
                <p className="text-[11px] text-amber-800 font-bold pt-1">
                  নোট: প্রয়োজনীয় সকল মূল নথিপত্র সাথে আনতে হবে।
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. RECENT REQUESTS & CASE HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900">আমার সকল আইনী সহায়তা আবেদন</h3>
            <p className="text-xs text-slate-500">নেকী ফাউন্ডেশনে জমা দেওয়া আপনার চলমান ও অতীত আবেদনের বিবরণ</p>
          </div>

          <Link to="/beneficiary/requests">
            <span className="text-xs font-bold text-[#064E3B] hover:text-[#047857] flex items-center gap-1 hover:underline">
              <span>সব আবেদন ও ফিল্টার দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ট্র্যাকিং নম্বর</th>
                <th className="py-3 px-4">আইনী বিষয় ও ধরন</th>
                <th className="py-3 px-4">জেলা</th>
                <th className="py-3 px-4">নিযুক্ত আইনজীবী</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {req.trackingNumber}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{req.legalCategory}</span>
                    <span className="text-[11px] text-slate-500 truncate max-w-xs block">{req.caseSummary}</span>
                  </td>
                  <td className="py-3.5 px-4">{req.district}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {req.lawyerName || 'অপেক্ষমাণ'}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.status} type="request" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCase(req)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    >
                      বিবরণ দেখুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. QUICK NAVIGATION SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/beneficiary/documents" 
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#064E3B] hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center shrink-0 group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
            <FolderLock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#064E3B]">নথিপত্র ভল্ট</h4>
            <p className="text-xs text-slate-500 mt-1">NID, পরচা, আদালতের আদেশপত্র নিরাপদে আপলোড ও ডাউনলোড করুন</p>
          </div>
        </Link>

        <Link 
          to="/beneficiary/payments" 
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#064E3B] hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">পেমেন্ট ও মানি রিসিপ্ট</h4>
            <p className="text-xs text-slate-500 mt-1">ফাউন্ডেশনের অফিসিয়াল ফি ও গ্রান্ট হিস্টোরি ও মানি রিসিপ্ট ডাউনলোড</p>
          </div>
        </Link>

        <Link 
          to="/beneficiary/profile" 
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#064E3B] hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">প্রোফাইল ও সেটিংস</h4>
            <p className="text-xs text-slate-500 mt-1">আপনার নাম, মোবাইল, বর্তমান ঠিকানা এবং জরুরি কন্টাক্ট আপডেট করুন</p>
          </div>
        </Link>
      </div>

      {/* CASE DETAILS MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                    {selectedCase.trackingNumber}
                  </span>
                  <StatusBadge status={selectedCase.status} type="request" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-2">
                  {selectedCase.legalCategory}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCase(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Case Details */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-700 block">ঘটনার সারসংক্ষেপ:</span>
                <p className="text-slate-600 leading-relaxed font-bangla">{selectedCase.caseSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-500 block">জেলা ও আওতা:</span>
                  <span className="font-bold text-slate-900">{selectedCase.district}</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-500 block">নিযুক্ত আইনজীবী:</span>
                  <span className="font-bold text-slate-900">{selectedCase.lawyerName || 'প্রক্রিয়াধীন'}</span>
                </div>
              </div>

              {/* Attached Documents */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 block text-xs">সংযুক্ত আইনী কাগজপত্র ({selectedCase.documents?.length || 0}):</span>
                <div className="space-y-2">
                  {selectedCase.documents?.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-[#064E3B]" />
                        <div>
                          <p className="font-bold text-slate-800 text-xs">{doc.fileName}</p>
                          <span className="text-[10px] text-slate-500">{doc.fileSize} • {doc.fileType}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#064E3B]">
                        যাচাইকৃত
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Log */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 block text-xs">অগ্রগতি টাইমলাইন:</span>
                <div className="space-y-3 pl-2 border-l-2 border-emerald-600">
                  {selectedCase.timeline.map((event) => (
                    <div key={event.id} className="relative pl-3">
                      <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#064E3B]" />
                      <p className="font-bold text-slate-900 text-xs">{event.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{event.description}</p>
                      <span className="text-[10px] text-slate-400 font-sans mt-0.5 block">{event.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.print()}
                className="gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট করুন</span>
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setSelectedCase(null)}
              >
                ঠিক আছে
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
