import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Briefcase, Award, ShieldCheck, CheckCircle2, RotateCcw, X, SlidersHorizontal, Scale, ArrowRight } from 'lucide-react';
import { lawyerService } from '../../services/lawyer.service';
import type { Lawyer } from '../../types';
import { bangladeshDistricts } from '../../config/districts.config';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { AvatarPlaceholder } from '../../components/ui/AvatarPlaceholder';

export const LawyersDirectory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialDistrict = searchParams.get('district') || '';
  const initialCategory = searchParams.get('practiceArea') || '';

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState(initialCategory);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLawyers();
  }, [selectedDistrict, selectedUpazila, selectedPracticeArea]);

  const fetchLawyers = async () => {
    setIsLoading(true);
    const data = await lawyerService.getLawyers({
      district: selectedDistrict || undefined,
      upazila: selectedUpazila || undefined,
      practiceArea: selectedPracticeArea || undefined,
      searchQuery: searchQuery || undefined,
      status: 'APPROVED',
    });
    setLawyers(data);
    setIsLoading(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLawyers();
  };

  const selectedDistrictObj = bangladeshDistricts.find((d) => d.nameBn === selectedDistrict);

  const filterContent = (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#064E3B]" />
          ফিল্টার অপশনসমূহ
        </h3>
        {(selectedDistrict || selectedUpazila || selectedPracticeArea || searchQuery) && (
          <button
            onClick={() => {
              setSelectedDistrict('');
              setSelectedUpazila('');
              setSelectedPracticeArea('');
              setSearchQuery('');
              fetchLawyers();
            }}
            className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 font-sans cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> রিসেট
          </button>
        )}
      </div>

      {/* District Dropdown */}
      <Select
        label="জেলা নির্বাচন করুন (৬৪ জেলা)"
        value={selectedDistrict}
        onChange={(e) => {
          setSelectedDistrict(e.target.value);
          setSelectedUpazila('');
        }}
        options={[
          { label: '— সকল জেলা —', value: '' },
          ...bangladeshDistricts.map((d) => ({ label: `${d.nameBn} (${d.divisionBn} বিভাগ)`, value: d.nameBn })),
        ]}
      />

      {/* Upazila Dropdown */}
      {selectedDistrictObj && (
        <Select
          label="উপজেলা নির্বাচন করুন"
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          options={[
            { label: '— সকল উপজেলা —', value: '' },
            ...selectedDistrictObj.upazilasBn.map((u) => ({ label: u, value: u })),
          ]}
        />
      )}

      {/* Practice Area */}
      <Select
        label="বিশেষজ্ঞতার ক্ষেত্র"
        value={selectedPracticeArea}
        onChange={(e) => setSelectedPracticeArea(e.target.value)}
        options={[
          { label: '— সকল ক্ষেত্র —', value: '' },
          { label: 'ফৌজদারী আইন', value: 'ফৌজদারী আইন' },
          { label: 'পারিবারিক ও দেওয়ানী আইন', value: 'পারিবারিক ও দেওয়ানী আইন' },
          { label: 'জমিজমা ও দেওয়ানী আইন', value: 'জমিজমা ও দেওয়ানী আইন' },
          { label: 'শ্রম আইন', value: 'শ্রম আইন' },
          { label: 'সাইবার অপরাধ', value: 'সাইবার অপরাধ' },
          { label: 'মানবাধিকার ও সংবিধান', value: 'মানবাধিকার ও সংবিধান' },
        ]}
      />
    </div>
  );

  return (
    <div className="space-y-12 pb-24 font-bangla">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white border-b-2 border-emerald-600/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>বাংলাদেশ বার কাউন্সিল সনদপ্রাপ্ত প্যানেল ডিরেক্টরি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block leading-tight sm:leading-snug">
            জেলা-ভিত্তিক{' '}
            <span className="text-gold-gradient font-heading">প্যানেল আইনজীবী</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl font-sans leading-relaxed mt-4">
            ৬৪টি জেলায় আমাদের ফাউন্ডেশন কমিটি কর্তৃক তালিকাভুক্ত বিজ্ঞ আইনজীবীদের সাথে সরাসরি সংযোগ তৈরি করুন। সম্পূর্ণ গোপনীয়তার সাথে মামলার প্রাক-আইনী পরামর্শ গ্রহণ করুন।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Filter Button Bar */}
        <div className="lg:hidden flex items-center justify-between glass-card p-4 rounded-2xl mb-6">
          <span className="text-xs font-bold text-slate-700 font-sans">
            মোট আইনজীবী: <strong className="text-[#064E3B]">{lawyers.length} জন</strong>
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#064E3B]" />
            ফিল্টার ও অনুসন্ধান
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6 border-t-4 border-t-[#064E3B] shadow-xl">
              {filterContent}
            </div>

            {/* Helpline Card */}
            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-sm font-heading text-[#064E3B]">
                <Scale className="w-4 h-4" /> আইনী পরামর্শ অনুসন্ধান হেল্পলাইন
              </p>
              <p className="text-slate-600 font-sans leading-relaxed">
                আপনার জেলার আইনজীবী খুঁজে পেতে অসুবিধা হলে সরাসরি আমাদের হটলাইনে ফোন করে আইনজীবী রেফারেন্স পেতে পারেন।
              </p>
              <p className="font-mono font-bold text-emerald-800 pt-1 text-sm">
                +৮৮০ ১৮০০-০০০০০০ (টোল-ফ্রি)
              </p>
            </div>
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold font-heading text-slate-900">ফিল্টার প্যানেল</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {filterContent}

                <Button isFullWidth variant="gold" onClick={() => setMobileFilterOpen(false)}>
                  ফলাফল দেখুন ({lawyers.length})
                </Button>
              </div>
            </div>
          )}

          {/* Right Search Results */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                placeholder="আইনজীবীর নাম বা দক্ষতার বিষয় লিখে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-white"
              />
              <Button type="submit" variant="gold">
                <Search className="w-4 h-4 mr-1.5" />
                খুঁজুন
              </Button>
            </form>

            {/* Results Summary */}
            <div className="hidden lg:flex items-center justify-between text-xs text-slate-600 font-sans border-b border-slate-200 pb-2">
              <span>
                মোট প্রাপ্ত প্যানেল আইনজীবী: <strong className="text-slate-900 font-heading">{lawyers.length} জন</strong>
              </span>
              {selectedDistrict && <span>জেলা: <strong className="text-[#064E3B]">{selectedDistrict}</strong></span>}
            </div>

            {/* Results Cards List */}
            {isLoading ? (
              <div className="p-16 text-center glass-card rounded-3xl">
                <div className="w-10 h-10 border-4 border-[#064E3B] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-sm text-slate-600 font-sans font-bold">প্যানেল আইনজীবী তালিকা লোড হচ্ছে...</p>
              </div>
            ) : lawyers.length === 0 ? (
              <div className="p-16 text-center glass-card rounded-3xl space-y-3">
                <p className="text-lg font-bold text-slate-800 font-heading">
                  আপনার নির্বাচিত ফিল্টারে কোনো অনুমোদিত প্যানেল আইনজীবী পাওয়া যায়নি।
                </p>
                <p className="text-xs text-slate-500 font-sans">অন্য জেলা বা দক্ষতার ক্ষেত্র নির্বাচন করে পুনরায় চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between border-t-4 border-t-[#064E3B] shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-start gap-4">
                        <AvatarPlaceholder name={lawyer.fullName} isDemo={lawyer.isDemo} size="lg" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-slate-900 font-heading leading-tight">{lawyer.fullName}</h3>
                            <span title="ফাউন্ডেশন যাচাইকৃত">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-semibold font-sans">{lawyer.designation}</p>
                          <p className="text-[11px] text-[#064E3B] font-bold font-sans">{lawyer.barAssociation}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 text-xs text-slate-600 font-sans border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>জেলা: <strong>{lawyer.district}</strong> ({lawyer.upazila})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>অভিজ্ঞতা: <strong>{lawyer.yearsOfExperience} বছর</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>সনদ নং: <code className="bg-emerald-50 text-[#064E3B] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">{lawyer.enrollmentNumber}</code></span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {lawyer.practiceAreas.map((p, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-bold border border-slate-200">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <Link to={`/lawyers/${lawyer.id}`} className="text-xs font-bold text-slate-700 hover:text-[#064E3B] flex items-center gap-1">
                        প্রোফাইল দেখুন <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => navigate(`/legal-assistance/apply?lawyerId=${lawyer.id}`)}
                      >
                        সহায়তা নিন
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
