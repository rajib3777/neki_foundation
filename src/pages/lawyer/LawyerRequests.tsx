import React, { useState, useEffect } from 'react';
import { legalAidService } from '../../services/legalAid.service';
import type { LegalAidRequest, LegalAidRequestStatus } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { 
  Briefcase, 
  Search, 
  CheckCircle2, 
  X, 
  Phone, 
  FileCheck2, 
  Calendar, 
  Clock, 
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';

export const LawyerRequests: React.FC = () => {
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<LegalAidRequest | null>(null);
  const [statusUpdateCase, setStatusUpdateCase] = useState<LegalAidRequest | null>(null);
  const [newStatus, setNewStatus] = useState<LegalAidRequestStatus>('IN_PROGRESS');
  const [hearingDate, setHearingDate] = useState('১৮ এপ্রিল ২০২৬');
  const [lawyerNote, setLawyerNote] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  useEffect(() => {
    legalAidService.getRequests().then((data) => {
      setRequests(data);
    });
  }, []);

  const handleAccept = async (id: string, name: string) => {
    await legalAidService.updateRequestStatus(
      id, 
      'ASSIGNED', 
      'এডভোকেট সৈয়দ রেজওয়ান হোসেন', 
      'বিজ্ঞ আইনজীবী মামলাটি গ্রহণ করে ক্লায়েন্টের সাথে পরামর্শের সম্মতি দিয়েছেন।'
    );
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'ASSIGNED', lawyerName: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন' } : r))
    );
    setActionNotice(`মামলাটি সফলভাবে গ্রহণ করা হয়েছে (${name})`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleReject = async (id: string) => {
    if (window.confirm('আপনি কি এই মামলার দায়িত্ব প্রত্যাখ্যান করতে চান?')) {
      await legalAidService.updateRequestStatus(
        id, 
        'CANCELLED', 
        'এডভোকেট সৈয়দ রেজওয়ান হোসেন', 
        'বিজ্ঞ আইনজীবী অপারগতা প্রকাশ করেছেন।'
      );
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setActionNotice('আবেদনটি বাতিল/প্রত্যাখ্যান করা হয়েছে।');
      setTimeout(() => setActionNotice(''), 3000);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusUpdateCase) return;

    await legalAidService.updateRequestStatus(
      statusUpdateCase.id,
      newStatus,
      'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
      `আদালতের সর্বশেষ শুনানি: ${hearingDate}। আইনজীবীর নোট: ${lawyerNote || 'কেস প্রক্রিয়া অগ্রসরমান।'}`
    );

    setRequests((prev) =>
      prev.map((r) => (r.id === statusUpdateCase.id ? { ...r, status: newStatus } : r))
    );

    setStatusUpdateCase(null);
    setLawyerNote('');
    setActionNotice('মামলার স্ট্যাটাস ও শুনানির তারিখ সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filteredRequests = requests.filter((r) => {
    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'PENDING' ? ['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(r.status) :
      activeTab === 'ACTIVE' ? ['ASSIGNED', 'IN_PROGRESS'].includes(r.status) :
      activeTab === 'COMPLETED' ? r.status === 'COMPLETED' : true;

    const matchesSearch = 
      r.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.legalCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">কাজের অনুরোধ ও মামলা ব্যবস্থাপনা</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            সেবাগ্রহীতাদের আবেদনের দায়িত্ব গ্রহণ, আদালতের অগ্রগতি ও আইনী প্রক্রিয়া পরিচালনা করুন
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            মোট মামলা: {requests.length} টি
          </span>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#064E3B] flex items-center gap-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'ALL', label: 'সকল মামলা ও অনুরোধ', count: requests.length },
              { id: 'PENDING', label: 'নতুন অনুরোধ (অপেক্ষমাণ)', count: requests.filter((r) => ['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(r.status)).length },
              { id: 'ACTIVE', label: 'চলমান সক্রিয় মামলা', count: requests.filter((r) => ['ASSIGNED', 'IN_PROGRESS'].includes(r.status)).length },
              { id: 'COMPLETED', label: 'নিষ্পত্তিকৃত', count: requests.filter((r) => r.status === 'COMPLETED').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ক্লায়েন্টের নাম বা ট্র্যাকিং নম্বর..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
            />
          </div>

        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => (
          <div 
            key={req.id} 
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#064E3B]/60 hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {req.trackingNumber}
                  </span>
                  <h3 className="text-base font-bold font-heading text-slate-900 pt-1">
                    {req.legalCategory}
                  </h3>
                </div>
                <StatusBadge status={req.status} type="request" />
              </div>

              {/* Client Info Banner */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">সেবাগ্রহীতা / ক্লায়েন্ট:</span>
                  <span className="font-bold text-slate-900">{req.beneficiaryName}</span>
                </div>
                <a
                  href={`tel:${req.beneficiaryMobile}`}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#064E3B] bg-white px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-50"
                >
                  <Phone className="w-3 h-3" />
                  <span>{req.beneficiaryMobile}</span>
                </a>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {req.caseSummary}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>জেলা: {req.district}</span>
                <span className="font-bold text-emerald-800">নথিপত্র: {req.documents?.length || 2} টি</span>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCase(req)}
                className="text-xs"
              >
                কেস ফাইল দেখুন
              </Button>

              {['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(req.status) ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAccept(req.id, req.beneficiaryName)}
                    className="text-xs"
                  >
                    গ্রহণ করুন
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(req.id)}
                    className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                  >
                    বাতিল
                  </Button>
                </div>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setStatusUpdateCase(req);
                    setNewStatus(req.status);
                  }}
                  className="text-xs shadow-xs"
                >
                  অগ্রগতি আপডেট করুন
                </Button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* UPDATE STATUS MODAL */}
      {statusUpdateCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">মামলার আইনী অগ্রগতি আপডেট</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{statusUpdateCase.trackingNumber} • {statusUpdateCase.beneficiaryName}</p>
              </div>
              <button 
                onClick={() => setStatusUpdateCase(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">মামলার বর্তমান স্ট্যাটাস</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as LegalAidRequestStatus)}
                  className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                >
                  <option value="ASSIGNED">আইনজীবী নিয়োগ সম্পন্ন (পরামর্শ অপেক্ষমাণ)</option>
                  <option value="IN_PROGRESS">আদালত কার্যক্রম ও শুনানি চলমান</option>
                  <option value="COMPLETED">মামলা সফলভাবে নিষ্পত্তিকৃত</option>
                  <option value="CANCELLED">মামলা প্রত্যাহার / বাতিল</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">পরবর্তী শুনানির তারিখ ও আদালত</label>
                <input
                  type="text"
                  value={hearingDate}
                  onChange={(e) => setHearingDate(e.target.value)}
                  placeholder="যেমন: ১৮ এপ্রিল ২০২৬, সকাল ১০:৩০ টা — জেলা আদালত"
                  className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">আইনজীবীর মন্তব্য / মামলার নির্দেশনা</label>
                <textarea
                  rows={4}
                  value={lawyerNote}
                  onChange={(e) => setLawyerNote(e.target.value)}
                  placeholder="শুনানিতে কী ঘটেছে বা ক্লায়েন্টকে কী কী নথি আনতে হবে তা স্পষ্টভাবে লিখুন (সেবাগ্রহীতার ড্যাশবোর্ডে এটি দেখা যাবে)..."
                  className="w-full p-3 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setStatusUpdateCase(null)}
                >
                  বাতিল
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm"
                >
                  আপডেট সংরক্ষণ করুন
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* FULL CASE DETAILS MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded text-slate-800">
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
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-800 block">ক্লায়েন্টের ঘটনার বিবরণ:</span>
                <p className="text-slate-600 leading-relaxed font-bangla">{selectedCase.caseSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 block">সেবাগ্রহীতার নাম:</span>
                  <span className="font-bold text-slate-900">{selectedCase.beneficiaryName}</span>
                  <span className="text-slate-500 block font-mono mt-0.5">{selectedCase.beneficiaryMobile}</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 block">আদালত আওতা:</span>
                  <span className="font-bold text-slate-900">{selectedCase.district} জেলা আদালত</span>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 block text-xs">দাখিলকৃত আইনী কাগজপত্র:</span>
                <div className="space-y-2">
                  {selectedCase.documents?.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-[#064E3B]" />
                        <div>
                          <p className="font-bold text-slate-800 text-xs">{doc.fileName}</p>
                          <span className="text-[10px] text-slate-400">{doc.fileSize} • {doc.fileType}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`ডাউনলোড শুরু হয়েছে: ${doc.fileName}`)}
                        className="text-xs font-bold text-[#064E3B] hover:underline"
                      >
                        ডাউনলোড
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 block text-xs">মামলা ডকেট ও টাইমলাইন:</span>
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

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.print()}
                className="gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>কেস ফাইল প্রিন্ট</span>
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setSelectedCase(null)}
              >
                বন্ধ করুন
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
