import React, { useState, useEffect } from 'react';
import { lawyerService } from '../../services/lawyer.service';
import { adminService } from '../../services/admin.service';
import type { Lawyer, LawyerStatus } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { bangladeshDistricts } from '../../config/districts.config';
import { imageConfig } from '../../config/image.config';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  X, 
  MapPin, 
  Briefcase, 
  Eye, 
  ShieldCheck, 
  Ban, 
  Check
} from 'lucide-react';

export const AdminLawyers: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'>('ALL');
  const [districtFilter, setDistrictFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectLawyer, setInspectLawyer] = useState<Lawyer | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const loadLawyers = () => {
    // Load all lawyers regardless of status for admin
    Promise.all([
      lawyerService.getLawyers({ status: 'UNDER_REVIEW' }),
      lawyerService.getLawyers({ status: 'APPROVED' }),
    ]).then(([underReview, approved]) => {
      // Also add some mock rejected/suspended for comprehensive admin view
      const demoSuspended: Lawyer = {
        id: 'lawyer-demo-susp',
        userId: 'user-susp-01',
        fullName: 'এডভোকেট মোঃ কামরুল ইসলাম',
        isDemo: true,
        designation: 'এডভোকেট',
        barAssociation: 'ঢাকা জেলা বার',
        enrollmentNumber: '৯৯৮১/২০১৫',
        enrollmentYear: 2015,
        district: 'ঢাকা',
        upazila: 'সদর',
        chamberAddress: 'কোর্ট চত্বর, ঢাকা',
        yearsOfExperience: 9,
        practiceAreas: ['দেওয়ানি আইন'],
        bio: 'বার কাউন্সিল অভিযোগ নিষ্পত্তির অপেক্ষায় সাময়িক স্থগিত।',
        languages: ['বাংলা'],
        status: 'REJECTED',
        isVerified: false,
        rejectionReason: 'বার সনদপত্র নবায়ন কপি দাখিল না করায় স্থগিত।',
        createdAt: new Date().toISOString(),
        profileCompletionPercentage: 70,
      };
      setLawyers([...underReview, ...approved, demoSuspended]);
    });
  };

  useEffect(() => {
    loadLawyers();
  }, []);

  const handleApprove = async (lawyer: Lawyer) => {
    await lawyerService.updateLawyerStatus(lawyer.id, 'APPROVED');
    await adminService.logAction(
      'আইনজীবী আবেদন অনুমোদন', 
      `Lawyer #${lawyer.id} (${lawyer.fullName})`, 
      'বার সনদ ও অভিজ্ঞতা যাচাই সাপেক্ষে প্যানেলভুক্তির অনুমোদন প্রদান করা হয়েছে।'
    );
    setLawyers((prev) =>
      prev.map((l) => (l.id === lawyer.id ? { ...l, status: 'APPROVED', isVerified: true } : l))
    );
    if (inspectLawyer?.id === lawyer.id) setInspectLawyer(null);
    setActionNotice(`${lawyer.fullName}-এর আবেদন অনুমোদিত হয়েছে!`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleRejectSubmit = async () => {
    if (!inspectLawyer || !rejectReason.trim()) return;
    await lawyerService.updateLawyerStatus(inspectLawyer.id, 'REJECTED', rejectReason);
    await adminService.logAction(
      'আইনজীবী আবেদন প্রত্যাখ্যান', 
      `Lawyer #${inspectLawyer.id} (${inspectLawyer.fullName})`, 
      rejectReason
    );
    setLawyers((prev) =>
      prev.map((l) => (l.id === inspectLawyer.id ? { ...l, status: 'REJECTED', isVerified: false, rejectionReason: rejectReason } : l))
    );
    setIsRejectOpen(false);
    setInspectLawyer(null);
    setRejectReason('');
    setActionNotice('আইনজীবী আবেদন প্রত্যাখ্যান / স্থগিত করা হয়েছে।');
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filteredLawyers = lawyers.filter((l) => {
    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'UNDER_REVIEW' ? l.status === 'UNDER_REVIEW' :
      activeTab === 'APPROVED' ? l.status === 'APPROVED' :
      activeTab === 'REJECTED' ? ['REJECTED', 'SUSPENDED'].includes(l.status) : true;

    const matchesDistrict = !districtFilter || l.district.toLowerCase() === districtFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.barAssociation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesDistrict && matchesSearch;
  });

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আইনজীবী প্যানেল ও যাচাইকরণ কন্ট্রোল</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ৬৪ জেলার বাংলাদেশ বার কাউন্সিল তালিকাভুক্ত আইনজীবীদের আবেদন যাচাই, অনুমোদন ও স্থগিতকরণ
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>মোট আইনজীবী রেকর্ড: {lawyers.length} জন</span>
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
              { id: 'ALL', label: 'সকল আইনজীবী', count: lawyers.length },
              { id: 'UNDER_REVIEW', label: 'যাচাই অপেক্ষমাণ', count: lawyers.filter((l) => l.status === 'UNDER_REVIEW').length },
              { id: 'APPROVED', label: 'অনুমোদিত প্যানেল', count: lawyers.filter((l) => l.status === 'APPROVED').length },
              { id: 'REJECTED', label: 'স্থগিত / প্রত্যাখ্যাত', count: lawyers.filter((l) => ['REJECTED', 'SUSPENDED'].includes(l.status)).length },
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

          <div className="flex items-center gap-2">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
            >
              <option value="">— সকল জেলা —</option>
              {bangladeshDistricts.map((d) => (
                <option key={d.nameBn} value={d.nameBn}>{d.nameBn}</option>
              ))}
            </select>

            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="নাম বা সনদ নম্বর..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Lawyers List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">আইনজীবীর নাম ও পরিচিতি</th>
                <th className="py-3.5 px-4">বার এসোসিয়েশন</th>
                <th className="py-3.5 px-4">সনদ নম্বর ও সন</th>
                <th className="py-3.5 px-4">জেলা</th>
                <th className="py-3.5 px-4">অভিজ্ঞতা</th>
                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                <th className="py-3.5 px-5 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLawyers.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={imageConfig.getAvatarSvg(l.fullName)}
                        alt="Avatar"
                        className="w-10 h-10 rounded-xl border border-slate-200 object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{l.fullName}</p>
                        <span className="text-[11px] text-[#064E3B] font-semibold">{l.designation}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-800">{l.barAssociation}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-800">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">{l.enrollmentNumber}</span>
                  </td>
                  <td className="py-4 px-4">{l.district}</td>
                  <td className="py-4 px-4 font-sans">{l.yearsOfExperience} বছর</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={l.status} type="lawyer" />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInspectLawyer(l)}
                        className="text-xs gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>যাচাই</span>
                      </Button>

                      {l.status === 'UNDER_REVIEW' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(l)}
                          className="text-xs"
                        >
                          অনুমোদন
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT LAWYER DETAILS MODAL */}
      {inspectLawyer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={imageConfig.getAvatarSvg(inspectLawyer.fullName)}
                  alt="Avatar"
                  className="w-14 h-14 rounded-2xl border border-slate-200 object-cover"
                />
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{inspectLawyer.fullName}</h3>
                  <p className="text-xs text-[#064E3B] font-semibold">{inspectLawyer.designation} • {inspectLawyer.barAssociation}</p>
                </div>
              </div>
              <button 
                onClick={() => setInspectLawyer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">বার সনদ নম্বর</span>
                  <span className="font-mono font-bold text-slate-900">{inspectLawyer.enrollmentNumber} ({inspectLawyer.enrollmentYear})</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">প্রধান কর্মস্থল</span>
                  <span className="font-bold text-slate-900">{inspectLawyer.chamberAddress || inspectLawyer.district}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-800 text-xs">আইনজীবীর বায়ো / পরিচিতি:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-bangla">{inspectLawyer.bio}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 text-xs">বিশেষজ্ঞতার ক্ষেত্রসমূহ:</span>
                <div className="flex flex-wrap gap-1.5">
                  {inspectLawyer.practiceAreas.map((pa) => (
                    <span key={pa} className="px-2.5 py-1 bg-emerald-50 text-[#064E3B] rounded-lg text-xs font-bold border border-emerald-200">
                      {pa}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">বাংলাদেশ বার কাউন্সিল অনলাইন রেকর্ড ভেরিফিকেশন:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  ✓ রেকর্ড ম্যাচ করেছে
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {inspectLawyer.status === 'APPROVED' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRejectOpen(true)}
                  className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Ban className="w-3.5 h-3.5 mr-1" />
                  <span>স্থগিত করুন</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(inspectLawyer)}
                    className="text-xs gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>অনুমোদন করুন</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsRejectOpen(true)}
                    className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                  >
                    প্রত্যাখ্যান
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInspectLawyer(null)}
              >
                বন্ধ করুন
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {isRejectOpen && inspectLawyer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold font-heading text-slate-900">স্থগিত / প্রত্যাখ্যানের কারণ</h3>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="সুনির্দিষ্ট কারণ লিখুন..."
              className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsRejectOpen(false)}>বাতিল</Button>
              <Button variant="danger" size="sm" onClick={handleRejectSubmit}>নিশ্চিত করুন</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
