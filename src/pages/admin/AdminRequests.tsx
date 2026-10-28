import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Briefcase, 
  Eye, 
  X,
  Phone,
  Calendar,
  ShieldCheck,
  Send
} from 'lucide-react';
import { mockLegalAidRequests } from '../../data/mock/requests.data';
import type { LegalAidRequest } from '../../types';

export const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<LegalAidRequest[]>(mockLegalAidRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [selectedRequest, setSelectedRequest] = useState<LegalAidRequest | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Status mapping
  const statusLabels: Record<string, { label: string; bg: string; text: string }> = {
    PENDING: { label: 'প্রাথমিক যাচাইতে', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
    ASSIGNED: { label: 'আইনজীবী নির্ধারিত', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800' },
    IN_PROGRESS: { label: 'আদালতে চলমান', bg: 'bg-emerald-50 border-emerald-200', text: 'text-[#064E3B]' },
    RESOLVED: { label: 'নিষ্পত্তিকৃত', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-800' },
    REJECTED: { label: 'অননুমোদিত', bg: 'bg-red-50 border-red-200', text: 'text-red-700' },
  };

  const urgencyLabels: Record<string, { label: string; color: string }> = {
    HIGH: { label: 'জরুরী অগ্রাধিকার', color: 'text-red-600 bg-red-50 border-red-200' },
    MEDIUM: { label: 'সাধারণ অগ্রাধিকার', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    LOW: { label: 'স্বাভাবিক', color: 'text-slate-600 bg-slate-50 border-slate-200' },
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.lawyerName && req.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'ALL' || req.urgencyLevel === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const handleUpdateStatus = (reqId: string, newStatus: LegalAidRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest && selectedRequest.id === reqId) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    setSuccessToast(`আবেদন #${selectedRequest?.trackingNumber || reqId} এর স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E3B] flex items-center justify-between text-sm shadow-md animate-fade-in font-bangla font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>সেন্ট্রাল কেস মনিটরিং ও সমন্বয়</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">আইনী সহায়তা আবেদন ও মামলা ট্র্যাকিং</h1>
          <p className="text-sm text-slate-600 font-bangla mt-1">
            সারাদেশের ৬৪ জেলা থেকে আসা প্রাক-আইনী ও আদালতের আইনী সহায়তা আবেদনসমূহের সার্বক্ষণিক মনিটরিং।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#064E3B]">
            মোট রেজিস্টার্ড মামলা: {requests.length} টি
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">চলমান কার্যক্রম</p>
          <p className="text-2xl font-extrabold text-[#064E3B] mt-1 font-heading">
            {requests.filter(r => r.status === 'IN_PROGRESS' || r.status === 'ASSIGNED').length}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-bangla">
            <Clock className="w-3 h-3" /> অ্যাডভোকেট তত্ত্বাবধানে
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">অপেক্ষমাণ আবেদন</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1 font-heading">
            {requests.filter(r => r.status === 'SUBMITTED' || r.status === 'IN_REVIEW').length}
          </p>
          <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1 font-bangla">
            <AlertCircle className="w-3 h-3" /> আইনজীবী নির্ধারণ বাকি
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">জরুরী বিবেচনাধীন</p>
          <p className="text-2xl font-extrabold text-red-600 mt-1 font-heading">
            {requests.filter(r => r.urgencyLevel === 'HIGH').length}
          </p>
          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-bangla">
            <ShieldCheck className="w-3 h-3" /> ২৪ ঘণ্টার মধ্যে ব্যবস্থা
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">নিষ্পত্তিকৃত কেস</p>
          <p className="text-2xl font-extrabold text-slate-700 mt-1 font-heading">
            {requests.filter(r => r.status === 'COMPLETED').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-bangla">
            <CheckCircle2 className="w-3 h-3" /> সফল সমাধান প্রাপ্ত
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="ট্র্যাকিং নম্বর, সেবাগ্রহীতার নাম, জেলা বা আইনজীবীর নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent font-bangla"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> স্ট্যাটাস:
            </span>
            {[
              { id: 'ALL', label: 'সকল' },
              { id: 'PENDING', label: 'অপেক্ষমাণ' },
              { id: 'ASSIGNED', label: 'নির্ধারিত' },
              { id: 'IN_PROGRESS', label: 'চলমান' },
              { id: 'RESOLVED', label: 'নিষ্পত্তিকৃত' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-bangla">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
              <tr>
                <th className="py-3.5 px-4">ট্র্যাকিং কোড ও বিষয়</th>
                <th className="py-3.5 px-4">সেবাগ্রহীতা</th>
                <th className="py-3.5 px-4">জেলা ও স্থান</th>
                <th className="py-3.5 px-4">দায়িত্বপ্রাপ্ত আইনজীবী</th>
                <th className="py-3.5 px-4">অগ্রাধিকার ও স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    কোনো আবেদন পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const sInfo = statusLabels[req.status] || { label: req.status, bg: 'bg-gray-100', text: 'text-gray-700' };
                  const uInfo = urgencyLabels[req.urgencyLevel] || urgencyLabels.LOW;

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono font-bold text-xs text-[#064E3B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {req.trackingNumber}
                        </span>
                        <p className="font-bold text-slate-800 text-sm mt-1">{req.legalCategory}</p>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{req.caseSummary}</p>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{req.beneficiaryName}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{req.beneficiaryMobile}</p>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{req.district}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        {req.lawyerName ? (
                          <div>
                            <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-[#B45309]" />
                              <span>{req.lawyerName}</span>
                            </p>
                            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                              প্যানেল আইনজীবী
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                            আইনজীবী নির্ধারণ প্রয়োজন
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${sInfo.bg} ${sInfo.text}`}>
                          {sInfo.label}
                        </span>
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${uInfo.color}`}>
                            {uInfo.label}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(req)}
                          className="text-xs font-bold text-slate-700 hover:text-[#064E3B] hover:border-[#064E3B]"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          বিস্তারিত দেখুন
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-bangla animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#064E3B] to-[#043E2F] text-white p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-white/20 px-2.5 py-0.5 rounded text-xs font-bold text-amber-300">
                    {selectedRequest.trackingNumber}
                  </span>
                  <span className="text-xs text-emerald-100 font-semibold">আইনী সহায়তা কেস ফাইল</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{selectedRequest.legalCategory}</h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Beneficiary & Location info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <p className="text-slate-500 font-bold mb-1">আবেদনকারী / সেবাগ্রহীতা:</p>
                  <p className="text-sm font-bold text-slate-900">{selectedRequest.beneficiaryName}</p>
                  <p className="text-slate-600 font-mono mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {selectedRequest.beneficiaryMobile}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold mb-1">এলাকা ও এখতিয়ার:</p>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {selectedRequest.district} জেলা
                  </p>
                  <p className="text-slate-600 mt-0.5">আবেদনের তারিখ: {new Date(selectedRequest.createdAt).toLocaleDateString('bn-BD')}</p>
                </div>
              </div>

              {/* Case Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ঘটনা ও মামলার সারসংক্ষেপ:</h4>
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-sm text-slate-800 leading-relaxed">
                  {selectedRequest.caseSummary || 'কোনো লিখিত বিবরণ পাওয়া যায়নি।'}
                </div>
              </div>

              {/* Assigned Lawyer Details */}
              <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">দায়িত্বপ্রাপ্ত প্যানেল আইনজীবী:</h4>
                  {selectedRequest.lawyerName && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      সরাসরি যুক্ত
                    </span>
                  )}
                </div>

                {selectedRequest.lawyerName ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{selectedRequest.lawyerName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">যশোর জেলা বার এসোসিয়েশন • সনদ নং: ১৫৮২/২০০৮</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`আইনজীবী ${selectedRequest.lawyerName} এর সাথে যোগাযোগ নম্বর প্রেরিত হয়েছে।`)}
                      className="text-xs"
                    >
                      যোগাযোগ করুন
                    </Button>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
                    <span>এই আবেদনের জন্য এখনো কোনো আইনজীবী চূড়ান্ত করা হয়নি।</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest({ ...selectedRequest, lawyerName: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন' });
                        handleUpdateStatus(selectedRequest.id, 'ASSIGNED');
                      }}
                      className="text-xs bg-[#064E3B] text-white"
                    >
                      রেজওয়ান হোসেনকে দায়িত্ব দিন
                    </Button>
                  </div>
                )}
              </div>

              {/* Status Update Actions */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">স্ট্যাটাস পরিবর্তন করুন:</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'IN_PROGRESS')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    আদালতে চলমান হিসেবে চিহ্নিত করুন
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'COMPLETED')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                  >
                    নিষ্পত্তিকৃত হিসেবে রেকর্ড করুন
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'IN_REVIEW')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                  >
                    পুনরায় যাচাইয়ে রাখুন
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedRequest(null)} className="text-xs font-bold">
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
