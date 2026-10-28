import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import { lawyerService } from '../../services/lawyer.service';
import { legalAidService } from '../../services/legalAid.service';
import type { Lawyer, LegalAidRequest, AuditLog } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { imageConfig } from '../../config/image.config';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  History, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Sliders, 
  FileSpreadsheet, 
  Award, 
  X,
  CreditCard,
  Building2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [pendingLawyers, setPendingLawyers] = useState<Lawyer[]>([]);
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([]);
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  useEffect(() => {
    Promise.all([
      lawyerService.getLawyers({ status: 'UNDER_REVIEW' }),
      lawyerService.getLawyers(),
      legalAidService.getRequests(),
      adminService.getAuditLogs(),
    ]).then(([pending, approved, reqs, logs]) => {
      setPendingLawyers(pending);
      setAllLawyers(approved);
      setRequests(reqs);
      setAuditLogs(logs);
    });
  }, []);

  const handleApprove = async (lawyer: Lawyer) => {
    await lawyerService.updateLawyerStatus(lawyer.id, 'APPROVED');
    await adminService.logAction(
      'আইনজীবী আবেদন অনুমোদন', 
      `Lawyer #${lawyer.id} (${lawyer.fullName})`, 
      'বার সনদ ও অভিজ্ঞতা যাচাই সাপেক্ষে প্যানেলভুক্তির অনুমোদন প্রদান করা হয়েছে।'
    );
    setPendingLawyers((prev) => prev.filter((l) => l.id !== lawyer.id));
    setAllLawyers((prev) => [lawyer, ...prev]);
    setActionNotice(`${lawyer.fullName}-এর আবেদন সফলভাবে অনুমোদিত হয়েছে!`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleReject = async () => {
    if (!selectedLawyer || !rejectReason.trim()) return;
    await lawyerService.updateLawyerStatus(selectedLawyer.id, 'REJECTED', rejectReason);
    await adminService.logAction(
      'আইনজীবী আবেদন প্রত্যাখ্যান', 
      `Lawyer #${selectedLawyer.id} (${selectedLawyer.fullName})`, 
      rejectReason
    );
    setPendingLawyers((prev) => prev.filter((l) => l.id !== selectedLawyer.id));
    setSelectedLawyer(null);
    setRejectReason('');
    setActionNotice('আইনজীবী আবেদন প্রত্যাখ্যান করা হয়েছে।');
    setTimeout(() => setActionNotice(''), 3000);
  };

  const stats = [
    { 
      label: 'অনুমোদনের অপেক্ষায় আইনজীবী', 
      value: pendingLawyers.length, 
      subtext: 'বার সনদপত্র যাচাই প্রক্রিয়াধীন', 
      icon: Award, 
      color: 'bg-amber-50 text-amber-800 border-amber-200' 
    },
    { 
      label: 'অনুমোদিত প্যানেল আইনজীবী', 
      value: allLawyers.length + 12, 
      subtext: '৬৪ জেলায় সক্রিয় ও তালিকাভুক্ত', 
      icon: ShieldCheck, 
      color: 'bg-emerald-50 text-[#064E3B] border-emerald-200' 
    },
    { 
      label: 'নিবন্ধিত সেবাগ্রহীতা', 
      value: '১২৮ জন', 
      subtext: 'আইনী সহায়তা প্রাপ্ত নাগরিক', 
      icon: Users, 
      color: 'bg-blue-50 text-blue-800 border-blue-200' 
    },
    { 
      label: 'চলমান আইনী মামলা', 
      value: requests.filter((r) => ['ASSIGNED', 'IN_PROGRESS'].includes(r.status)).length, 
      subtext: 'বিজ্ঞ আদালতে পরিচালিত হচ্ছে', 
      icon: FileSpreadsheet, 
      color: 'bg-purple-50 text-purple-800 border-purple-200' 
    },
  ];

  return (
    <div className="space-y-7 font-bangla pb-12">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#043E2F] to-[#011F1B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                সুপার এডমিন কন্ট্রোল প্যানেল
              </span>
              <span className="text-xs text-emerald-200 font-sans">
                সিস্টেম ভার্সন: v2.6.4 • সম্পূর্ণ নিয়ন্ত্রিত
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              নেকী ফাউন্ডেশন কেন্দ্রীয় প্রশাসন ও অডিট ড্যাশবোর্ড
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl font-bangla leading-relaxed">
              ৬৪ জেলার প্যানেল আইনজীবী অনুমোদন, সেবাগ্রহীতাদের কেস অগ্রগতি, আর্থিক অনুদান মনিটরিং ও সিস্টেম অডিট পরিচালনা করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/admin/reports">
              <Button variant="gold" size="md" className="gap-2 shadow-lg">
                <Download className="w-4 h-4 text-slate-950" />
                <span>রিপোর্ট ও CSV এক্সপোর্ট</span>
              </Button>
            </Link>
            <Link to="/admin/cms">
              <Button variant="outline" size="md" className="bg-white/10 hover:bg-white text-white hover:text-[#064E3B] border-emerald-400/40 gap-2">
                <Sliders className="w-4 h-4" />
                <span>সিএমএস কনটেন্ট</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#064E3B] flex items-center gap-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* KPI Cards */}
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

      {/* 2. PENDING LAWYER VERIFICATION WIDGET */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900">আইনজীবী প্যানেল আবেদন যাচাইকরণ</h3>
            <p className="text-xs text-slate-500">বাংলাদেশ বার কাউন্সিল সনদ ও চেম্বার তথ্য পর্যালোচনা করে অনুমোদন বা প্রত্যাখ্যান করুন</p>
          </div>
          <Link to="/admin/lawyers">
            <span className="text-xs font-bold text-[#064E3B] hover:underline flex items-center gap-1">
              <span>সকল আইনজীবী তালিকা ({allLawyers.length} জন)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {pendingLawyers.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-slate-700">সকল আবেদন যাচাই সম্পন্ন হয়েছে!</p>
            <p className="text-[11px] text-slate-400">এই মুহূর্তে কোনো আইনজীবী আবেদন পর্যালোচনার জন্য অপেক্ষমাণ নেই।</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingLawyers.map((lawyer) => (
              <div 
                key={lawyer.id} 
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFCF6]"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={imageConfig.getAvatarSvg(lawyer.fullName)}
                    alt="Avatar"
                    className="w-14 h-14 rounded-2xl border border-slate-200 shadow-xs object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{lawyer.fullName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        যাচাই অপেক্ষমাণ
                      </span>
                    </div>
                    <p className="text-xs text-[#064E3B] font-semibold">{lawyer.designation} • {lawyer.barAssociation}</p>
                    <p className="text-xs text-slate-500">
                      সনদ নং: {lawyer.enrollmentNumber} ({lawyer.enrollmentYear}) • জেলা: {lawyer.district} • অভিজ্ঞতা: {lawyer.yearsOfExperience} বছর
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(lawyer)}
                    className="text-xs"
                  >
                    অনুমোদন করুন
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLawyer(lawyer)}
                    className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                  >
                    প্রত্যাখ্যান
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. RECENT REQUESTS & AUDIT LOGS DUAL COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Legal Aid Requests Monitor */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">সাম্প্রতিক আইনী সহায়তা আবেদন</h3>
              <p className="text-xs text-slate-500">সেবাগ্রহীতাদের দায়েরকৃত সর্বশেষ কেসসমূহ</p>
            </div>
            <Link to="/admin/requests">
              <span className="text-xs font-bold text-[#064E3B] hover:underline">সব দেখুন</span>
            </Link>
          </div>

          <div className="space-y-3">
            {requests.slice(0, 3).map((req) => (
              <div key={req.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                    {req.trackingNumber}
                  </span>
                  <StatusBadge status={req.status} type="request" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{req.legalCategory}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>ক্লায়েন্ট: {req.beneficiaryName} ({req.district})</span>
                  <span>আইনজীবী: {req.lawyerName || 'বরাদ্দ প্রক্রিয়াধীন'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Audit Logs */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">নিরাপত্তা ও সিস্টেম অডিট ট্রেইল</h3>
              <p className="text-xs text-slate-500">প্ল্যাটফর্মের গুরুত্বপূর্ণ কার্যক্রমের অডিট হিস্টোরি</p>
            </div>
            <Link to="/admin/audit-logs">
              <span className="text-xs font-bold text-[#064E3B] hover:underline">পূর্ণাঙ্গ লগ</span>
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="p-3 rounded-2xl border border-slate-100 bg-[#FCFDFD] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-amber-500" />
                    {log.action}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {log.status === 'SUCCESS' ? '✓ সফল' : 'ব্যর্থ'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>অ্যাক্টর: {log.actor}</span>
                  <span className="font-sans">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* REJECT LAWYER MODAL */}
      {selectedLawyer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold font-heading text-slate-900">আইনজীবী আবেদন প্রত্যাখ্যান</h3>
              <button 
                onClick={() => setSelectedLawyer(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {selectedLawyer.fullName}-এর আবেদন প্রত্যাখ্যানের সুনির্দিষ্ট কারণ উল্লেখ করুন (এটি আইনজীবীর কাছে প্রেরিত হবে):
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="যেমন: বাংলাদেশ বার কাউন্সিলের সনদপত্রের কপি স্পষ্ট নয় / সনদ নম্বর যাচাইয়ে অমিল..."
              className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedLawyer(null)}>বাতিল</Button>
              <Button variant="danger" size="sm" onClick={handleReject}>প্রত্যাখ্যান নিশ্চিত করুন</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
