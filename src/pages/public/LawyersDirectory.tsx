import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Briefcase, Award, ShieldCheck, CheckCircle2, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
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

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');

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
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
        <h3 className="text-base font-bold font-heading text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#D97706]" />
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
            className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 font-sans"
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
    <div className="space-y-12 pb-20 font-bangla">
      
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white border-b-2 border-amber-500/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 mb-5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>যাচাইকৃত প্যানেল আইনজীবী ডিরেক্টরি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block">
            জেলা-ভিত্তিক{' '}
            <span className="text-gold-gradient font-heading">আইনজীবী ডিরেক্টরি</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans leading-relaxed mt-5">
            বাংলাদেশ বার কাউন্সিল কর্তৃক অনুমোদিত এবং আমাদের ফাউন্ডেশন কমিটি কর্তৃক নিবন্ধিত প্যানেল আইনজীবীদের সাথে সরাসরি সংযোগ তৈরি করুন।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Filter Button Bar */}
        <div className="lg:hidden flex items-center justify-between glass-card p-4 rounded-2xl mb-6">
          <span className="text-xs font-bold text-gray-700 font-sans">
            মোট আইনজীবী: <strong className="text-[#D97706]">{lawyers.length} জন</strong>
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D97706]" />
            ফিল্টার ও অনুসন্ধান
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6 border-t-4 border-t-[#D97706] shadow-xl">
              {filterContent}
            </div>
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold font-heading text-gray-900">ফিল্টার প্যানেল</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
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
            <div className="hidden lg:flex items-center justify-between text-xs text-gray-600 font-sans border-b border-amber-500/20 pb-2">
              <span>
                মোট প্রাপ্ত প্যানেল আইনজীবী: <strong className="text-gray-900 font-heading">{lawyers.length} জন</strong>
              </span>
              {selectedDistrict && <span>জেলা: <strong className="text-[#D97706]">{selectedDistrict}</strong></span>}
            </div>

            {/* Results Cards List */}
            {isLoading ? (
              <div className="p-16 text-center glass-card rounded-3xl">
                <div className="w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-sm text-gray-600 font-sans font-bold">প্যানেল আইনজীবী তালিকা লোড হচ্ছে...</p>
              </div>
            ) : lawyers.length === 0 ? (
              <div className="p-16 text-center glass-card rounded-3xl space-y-3">
                <p className="text-lg font-bold text-gray-800 font-heading">
                  আপনার নির্বাচিত ফিল্টারে কোনো অনুমোদিত প্যানেল আইনজীবী পাওয়া যায়নি।
                </p>
                <p className="text-xs text-gray-500 font-sans">অন্য জেলা বা দক্ষতার ক্ষেত্র নির্বাচন করে পুনরায় চেষ্টা করুন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between border-t-4 border-t-[#D97706] shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <AvatarPlaceholder name={lawyer.fullName} isDemo={lawyer.isDemo} size="lg" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-gray-900 font-heading">{lawyer.fullName}</h3>
                            <span title="ফাউন্ডেশন যাচাইকৃত">
                              <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 font-semibold font-sans">{lawyer.designation}</p>
                          <p className="text-[11px] text-[#D97706] font-bold font-sans">{lawyer.barAssociation}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 text-xs text-gray-600 font-sans border-t border-amber-500/15">
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
                          <span>এনরোলমেন্ট: <code className="bg-amber-100/60 text-[#D97706] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">{lawyer.enrollmentNumber}</code></span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {lawyer.practiceAreas.map((p, idx) => (
                          <span key={idx} className="text-[10px] bg-amber-100 text-[#D97706] px-2 py-0.5 rounded-md font-bold border border-amber-300">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between gap-2">
                      <Link to={`/lawyers/${lawyer.id}`} className="text-xs font-bold text-gray-700 hover:text-[#D97706]">
                        প্রোফাইল দেখুন
                      </Link>
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => navigate(`/legal-assistance/apply?lawyerId=${lawyer.id}`)}
                      >
                        আইনী সহায়তা নিন
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
