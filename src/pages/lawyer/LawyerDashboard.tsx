import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { lawyerService } from '../../services/lawyer.service';
import { legalAidService } from '../../services/legalAid.service';
import type { Lawyer, LegalAidRequest, User } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { imageConfig } from '../../config/image.config';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Phone, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Award, 
  FolderLock, 
  Users,
  X
} from 'lucide-react';

export const LawyerDashboard: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();
  const [lawyerProfile, setLawyerProfile] = useState<Lawyer | null>(null);
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      lawyerService.getLawyerById('lawyer-demo-01'),
      legalAidService.getRequests(),
    ]).then(([profile, reqs]) => {
      setLawyerProfile(profile);
      setRequests(reqs);
    });
  }, []);

  const handleAcceptCase = async (id: string, clientName: string) => {
    await legalAidService.updateRequestStatus(
      id, 
      'ASSIGNED', 
      currentUser?.name || 'আইনজীবী', 
      'বিজ্ঞ আইনজীবী আবেদনটি গ্রহণ করে কেস ফাইল চালুর সম্মতি প্রদান করেছেন।'
    );
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'ASSIGNED', lawyerName: currentUser?.name || 'এডভোকেট সৈয়দ রেজওয়ান হোসেন' } : r))
    );
    setActionSuccess(`কেসটি সফলভাবে গ্রহণ করা হয়েছে (${clientName})`);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleRejectCase = async (id: string) => {
    if (window.confirm('আপনি কি এই মামলাটি প্রত্যাহার বা প্রত্যাখ্যান করতে চান?')) {
      await legalAidService.updateRequestStatus(
        id, 
        'CANCELLED', 
        currentUser?.name || 'আইনজীবী', 
        'সময়ের সীমাবদ্ধতার কারণে অন্য আইনজীবী বরাদ্দের অনুরোধ করা হয়েছে।'
      );
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const activeCases = requests.filter((r) => ['IN_PROGRESS', 'ASSIGNED'].includes(r.status));
  const pendingRequests = requests.filter((r) => ['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(r.status));

  const stats = [
    { 
      label: 'চলমান সক্রিয় মামলা', 
      value: activeCases.length, 
      subtext: 'আদালত ও আইনী কার্যক্রমে যুক্ত', 
      icon: Briefcase, 
      color: 'bg-emerald-50 text-[#064E3B] border-emerald-200' 
    },
    { 
      label: 'নতুন ক্লায়েন্ট অনুরোধ', 
      value: pendingRequests.length, 
      subtext: 'অনুমোদন বা পর্যালোচনার অপেক্ষায়', 
      icon: Users, 
      color: 'bg-amber-50 text-amber-800 border-amber-200' 
    },
    { 
      label: 'আজকের শুনানি ও পরামর্শ', 
      value: '২ টি', 
      subtext: 'পারিবারিক আদালত ও চেম্বার', 
      icon: Calendar, 
      color: 'bg-blue-50 text-blue-800 border-blue-200' 
    },
    { 
      label: 'নিষ্পত্তিকৃত মামলা', 
      value: requests.filter((r) => r.status === 'COMPLETED').length + 8, 
      subtext: 'সফল আইনী প্রতিকার ও রায়', 
      icon: CheckCircle2, 
      color: 'bg-purple-50 text-purple-800 border-purple-200' 
    },
  ];

  return (
    <div className="space-y-7 font-bangla pb-12">

      {/* 1. LAWYER HERO CARD */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#043E2F] to-[#011F1B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={imageConfig.getAvatarSvg(currentUser?.name || 'এডভোকেট সৈয়দ রেজওয়ান হোসেন')}
              alt="Avatar"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400/80 shadow-md object-cover bg-white shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  বার কাউন্সিল তালিকাভুক্ত প্যানেল আইনজীবী
                </span>
                <span className="text-xs text-emerald-200 font-sans">
                  সনদ নং: ১৫৮২/২০০৮
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                {currentUser?.name || lawyerProfile?.fullName || 'এডভোকেট সৈয়দ রেজওয়ান হোসেন'}
              </h1>
              <p className="text-sm text-emerald-100/90 font-bangla">
                সিনিয়র আইনজীবী • জেলা ও দায়রা জজ আদালত বার এসোসিয়েশন, যশোর
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-emerald-200">
                <span>প্র্যাকটিস: দেওয়ানি, ফৌজদারি ও পারিবারিক মোকদ্দমা</span>
                <span>•</span>
                <span>অভিজ্ঞতা: ১৮ বছর</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link to="/lawyer/availability">
              <Button variant="gold" size="md" className="w-full shadow-lg gap-2">
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>সময়সূচী ও স্লট আপডেট</span>
              </Button>
            </Link>
            <Link to="/lawyer/profile">
              <Button variant="outline" size="md" className="w-full bg-white/10 hover:bg-white text-white hover:text-[#064E3B] border-emerald-400/40 gap-2">
                <UserCheck className="w-4 h-4" />
                <span>প্রোফাইল সম্পাদন</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#064E3B] flex items-center gap-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* 2. STATS SUMMARY */}
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

      {/* 3. TODAY'S COURT & CONSULTATION SCHEDULE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#064E3B]" />
              <h3 className="text-base font-bold font-heading text-slate-900">আজকের সময়সূচী</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              আজকে ২টি
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  ১০:৩০ AM
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200/80 rounded text-amber-900">
                  আদালতে শুনানি
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 font-heading">
                পারিবারিক আদালত, যশোর — মোকদ্দমা নং ৪২/২০২৬
              </p>
              <p className="text-[11px] text-slate-600">ক্লায়েন্ট: মোঃ রহিম উল্লাহ (ভরণপোষণ মামলা)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  ০৫:০০ PM
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200/80 rounded text-emerald-900">
                  চেম্বার পরামর্শ
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 font-heading">
                জমিজমা দখল ও নিষেধাজ্ঞা পরামর্শ
              </p>
              <p className="text-[11px] text-slate-600">ক্লায়েন্ট: সাদিয়া আক্তার (যশোর চেম্বার)</p>
            </div>
          </div>

          <Link to="/lawyer/availability" className="block pt-2">
            <Button variant="outline" size="sm" isFullWidth className="text-xs">
              সকল স্লট ও ক্যালেন্ডার দেখুন
            </Button>
          </Link>
        </div>

        {/* Pending Client Requests Widget */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">নতুন আইনী সহায়তা অনুরোধ</h3>
              <p className="text-xs text-slate-500">সেবাগ্রহীতাদের পক্ষ থেকে আসা অপেক্ষমাণ আবেদন পর্যালোচনা ও গ্রহণ করুন</p>
            </div>
            <Link to="/lawyer/requests">
              <span className="text-xs font-bold text-[#064E3B] hover:underline flex items-center gap-1">
                <span>সব দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {pendingRequests.slice(0, 2).map((req) => (
              <div 
                key={req.id} 
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#064E3B]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/40"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                      {req.trackingNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{req.beneficiaryName}</span>
                    <span className="text-xs text-slate-400">• {req.district}</span>
                  </div>
                  <h4 className="text-xs font-bold text-emerald-800">{req.legalCategory}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">{req.caseSummary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAcceptCase(req.id, req.beneficiaryName)}
                    className="text-xs"
                  >
                    গ্রহণ করুন
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRejectCase(req.id)}
                    className="text-xs text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    প্রত্যাখ্যান
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. ACTIVE CASES UNDER THIS LAWYER */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900">আমার পরিচালনাধীন সক্রিয় মামলাসমূহ</h3>
            <p className="text-xs text-slate-500">যেসব মামলার দায়িত্ব আপনি গ্রহণ করেছেন এবং আইনী প্রক্রিয়া চলমান</p>
          </div>
          <Link to="/lawyer/requests">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <span>মামলা ও নথিপত্র ব্যবস্থাপনা</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ট্র্যাকিং নম্বর</th>
                <th className="py-3 px-4">ক্লায়েন্ট / সেবাগ্রহীতা</th>
                <th className="py-3 px-4">মামলার বিষয় ও আদালত</th>
                <th className="py-3 px-4">নথিপত্র</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeCases.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">{req.trackingNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{req.beneficiaryName}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-sans">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {req.beneficiaryMobile}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{req.legalCategory}</span>
                    <span className="text-[11px] text-slate-500">{req.district} জেলা আদালত</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[11px]">
                      {req.documents?.length || 2} টি নথি
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.status} type="request" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link to="/lawyer/requests">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#064E3B] bg-emerald-50 hover:bg-emerald-100 transition-colors">
                        কেস ফাইল খুলুন
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
