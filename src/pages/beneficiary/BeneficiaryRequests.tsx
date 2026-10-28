import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { legalAidService } from '../../services/legalAid.service';
import type { LegalAidRequest, User, LegalAidRequestStatus } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { bangladeshDistricts } from '../../config/districts.config';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  X, 
  FileCheck2, 
  Printer, 
  ArrowRight,
  ShieldAlert,
  Clock
} from 'lucide-react';

export const BeneficiaryRequests: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();
  const [searchParams] = useSearchParams();
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'IN_PROGRESS' | 'ASSIGNED' | 'SUBMITTED' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<LegalAidRequest | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  // New Case Form State
  const [formData, setFormData] = useState({
    legalCategory: 'পারিবারিক ও ভরণপোষণ আইন',
    district: currentUser?.district || 'যশোর',
    upazila: currentUser?.upazila || 'ঝিকরগাছা',
    caseSummary: '',
    urgencyLevel: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY',
  });

  useEffect(() => {
    legalAidService.getRequests({ beneficiaryId: currentUser?.id }).then((data) => {
      setRequests(data);
    });

    if (searchParams.get('create') === 'true') {
      setIsCreateModalOpen(true);
    }
  }, [currentUser, searchParams]);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caseSummary.trim()) return;

    setIsSubmitting(true);
    try {
      const newCase = await legalAidService.createRequest({
        beneficiaryId: currentUser?.id || 'user-beneficiary-01',
        beneficiaryName: currentUser?.name || 'মোঃ রহিম উল্লাহ',
        beneficiaryMobile: currentUser?.mobile || '01712-345678',
        district: formData.district,
        legalCategory: formData.legalCategory,
        caseSummary: formData.caseSummary,
        urgencyLevel: formData.urgencyLevel,
      });

      setRequests((prev) => [newCase, ...prev]);
      setCreateSuccess(true);
      setTimeout(() => {
        setCreateSuccess(false);
        setIsCreateModalOpen(false);
        setFormData({
          legalCategory: 'পারিবারিক ও ভরণপোষণ আইন',
          district: currentUser?.district || 'যশোর',
          upazila: currentUser?.upazila || 'ঝিকরগাছা',
          caseSummary: '',
          urgencyLevel: 'MEDIUM',
        });
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'IN_PROGRESS' ? r.status === 'IN_PROGRESS' :
      activeTab === 'ASSIGNED' ? r.status === 'ASSIGNED' :
      activeTab === 'SUBMITTED' ? ['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(r.status) :
      activeTab === 'COMPLETED' ? r.status === 'COMPLETED' : true;

    const matchesSearch = 
      r.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.legalCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.caseSummary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আমার আইনী সহায়তা আবেদনসমূহ</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            নেকী ফাউন্ডেশনের মাধ্যমে দায়েরকৃত সকল আইনী আবেদনের পূর্ণাঙ্গ তালিকা ও ট্র্যাকিং
          </p>
        </div>

        <Button 
          variant="gold" 
          size="md" 
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 shadow-md shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>নতুন আবেদন জমা দিন</span>
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'ALL', label: 'সকল আবেদন', count: requests.length },
              { id: 'IN_PROGRESS', label: 'চলমান মামলা', count: requests.filter((r) => r.status === 'IN_PROGRESS').length },
              { id: 'ASSIGNED', label: 'আইনজীবী নিযুক্ত', count: requests.filter((r) => r.status === 'ASSIGNED').length },
              { id: 'SUBMITTED', label: 'যাচাই প্রক্রিয়াধীন', count: requests.filter((r) => ['SUBMITTED', 'PAYMENT_CONFIRMED', 'IN_REVIEW'].includes(r.status)).length },
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

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ট্র্যাকিং নম্বর বা বিষয় দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
            />
          </div>
        </div>
      </div>

      {/* Case Grid Cards */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">কোনো আবেদন খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের বিপরীতে কোনো আইনী সহায়তা রেকর্ড নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => (
            <div 
              key={req.id} 
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#064E3B]/60 hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Card Top */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                      {req.trackingNumber}
                    </span>
                    <h3 className="text-base font-bold font-heading text-slate-900 pt-1">
                      {req.legalCategory}
                    </h3>
                  </div>
                  <StatusBadge status={req.status} type="request" />
                </div>

                {/* Case Summary Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {req.caseSummary}
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-slate-400 block">জেলা:</span>
                    <span className="font-bold text-slate-800">{req.district}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-slate-400 block">আইনজীবী:</span>
                    <span className="font-bold text-slate-800 truncate block">
                      {req.lawyerName || 'বরাদ্দ প্রক্রিয়াধীন'}
                    </span>
                  </div>
                </div>

                {/* Urgency & Timeline snippet */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>দায়ের: {new Date(req.createdAt).toLocaleDateString('bn-BD')}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                    নথি: {req.documents?.length || 0} টি
                  </span>
                </div>

              </div>

              {/* Card Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-800 font-bold">
                  {req.isFeePaid ? '✓ ফি পরিশোধিত' : 'মওকুফযোগ্য ফি'}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedCase(req)}
                  className="gap-1 text-xs"
                >
                  <span>সম্পূর্ণ কেস ফাইল দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* CREATE NEW CASE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900">নতুন আইনী সহায়তা আবেদন</h3>
                <p className="text-xs text-slate-500 mt-0.5">আপনার সমস্যা সংক্ষেপে তুলে ধরুন, আমাদের লিগ্যাল টিম দ্রুত যোগাযোগ করবে</p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">আবেদন সফলভাবে গৃহীত হয়েছে!</h4>
                <p className="text-xs text-slate-600">
                  আপনার ট্র্যাকিং নম্বর জেনারেট হয়েছে। শীঘ্রই আপনাকে আইনজীবী বরাদ্দ করা হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateCase} className="space-y-4 text-xs sm:text-sm">
                
                <Select
                  label="আইনী সহায়তার বিষয়"
                  isRequired
                  value={formData.legalCategory}
                  onChange={(e) => setFormData({ ...formData, legalCategory: e.target.value })}
                  options={[
                    { label: 'পারিবারিক ও ভরণপোষণ আইন', value: 'পারিবারিক ও ভরণপোষণ আইন' },
                    { label: 'জমিজমা ও দেওয়ানী আইন', value: 'জমিজমা ও দেওয়ানী আইন' },
                    { label: 'ফৌজদারি মামলা ও জামিন সহায়তা', value: 'ফৌজদারি মামলা ও জামিন সহায়তা' },
                    { label: 'নারী ও শিশু নির্যাতন প্রতিরোধ আইন', value: 'নারী ও শিশু নির্যাতন প্রতিরোধ আইন' },
                    { label: 'শ্রম আইন ও কর্মসংস্থান বিরোধ', value: 'শ্রম আইন ও কর্মসংস্থান বিরোধ' },
                    { label: 'মানবাধিকার ও সংবিধানিক প্রতিকার', value: 'মানবাধিকার ও সংবিধানিক প্রতিকার' },
                    { label: 'সাধারণ আইনী পরামর্শ', value: 'সাধারণ আইনী পরামর্শ' },
                  ]}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Select
                    label="সংশ্লিষ্ট জেলা"
                    isRequired
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    options={bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))}
                  />

                  <Input
                    label="উপজেলা / থানা"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    placeholder="উপজেলার নাম লিখুন"
                  />
                </div>

                <Textarea
                  label="ঘটনার বিস্তারিত বিবরণ"
                  isRequired
                  rows={4}
                  value={formData.caseSummary}
                  onChange={(e) => setFormData({ ...formData, caseSummary: e.target.value })}
                  placeholder="আপনার আইনী সমস্যা, ঘটনা ঘটার তারিখ ও আপনার পক্ষ থেকে কী ধরনের সহায়তা চান তা স্পষ্টভাবে লিখুন..."
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">জরুরি মাত্রা</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'LOW', label: 'সাধারণ' },
                      { id: 'MEDIUM', label: 'মাঝারি' },
                      { id: 'HIGH', label: 'অত্যন্ত জরুরি' },
                    ].map((lvl) => (
                      <button
                        type="button"
                        key={lvl.id}
                        onClick={() => setFormData({ ...formData, urgencyLevel: lvl.id as typeof formData.urgencyLevel })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.urgencyLevel === lvl.id
                            ? 'bg-emerald-50 border-[#064E3B] text-[#064E3B] ring-1 ring-[#064E3B]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="md" 
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="md" 
                    isLoading={isSubmitting}
                  >
                    আবেদন দাখিল করুন
                  </Button>
                </div>

              </form>
            )}

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
                <span className="font-bold text-slate-800 block">ঘটনার সংক্ষিপ্ত বিবরণ:</span>
                <p className="text-slate-600 leading-relaxed font-bangla">{selectedCase.caseSummary}</p>
              </div>

              {/* Advocate info */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-bold block uppercase tracking-wider">দায়িত্বপ্রাপ্ত আইনজীবী</span>
                  <p className="text-sm font-bold text-slate-900">{selectedCase.lawyerName || 'অপেক্ষমাণ'}</p>
                  <p className="text-xs text-slate-500">জেলা বার এসোসিয়েশন, {selectedCase.district}</p>
                </div>
                {selectedCase.lawyerName && (
                  <a 
                    href="tel:+8801819234567" 
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#064E3B] px-3 py-1.5 rounded-xl hover:bg-[#047857]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>কল করুন</span>
                  </a>
                )}
              </div>

              {/* Documents */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 block text-xs">সংযুক্ত আইনী কাগজপত্র ({selectedCase.documents?.length || 0}):</span>
                {selectedCase.documents?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">কোনো নথি সংযুক্ত নেই।</p>
                ) : (
                  <div className="space-y-2">
                    {selectedCase.documents?.map((doc) => (
                      <div key={doc.id} className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
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
                )}
              </div>

              {/* Timeline */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 block text-xs">কেস টাইমলাইন:</span>
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
                <span>প্রিন্ট করুন</span>
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
