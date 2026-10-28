import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Briefcase, Award, CheckCircle2, ArrowLeft, ShieldCheck, Calendar, HeartHandshake } from 'lucide-react';
import { lawyerService } from '../../services/lawyer.service';
import type { Lawyer } from '../../types';
import { Button } from '../../components/ui/Button';
import { AvatarPlaceholder } from '../../components/ui/AvatarPlaceholder';
import { QuickConsultationModal } from '../../components/common/QuickConsultationModal';

export const LawyerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      lawyerService.getLawyerById(id).then((res) => {
        setLawyer(res);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-bangla">
        <div className="w-10 h-10 border-4 border-[#064E3B] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-sm text-slate-600 font-sans font-bold">আইনজীবী প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 font-bangla">
        <h2 className="text-2xl font-bold text-slate-800 font-heading">আইনজীবী প্রোফাইল পাওয়া যায়নি</h2>
        <Link to="/lawyers">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            আইনজীবী ডিরেক্টরিতে ফিরে যান
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 font-bangla">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-2 border-emerald-600/30">
        <div className="max-w-7xl mx-auto space-y-5">
          <Link to="/lawyers" className="inline-flex items-center text-xs font-bold text-emerald-200 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            আইনজীবী ডিরেক্টরিতে ফিরে যান
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <AvatarPlaceholder name={lawyer.fullName} isDemo={lawyer.isDemo} size="xl" />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">{lawyer.fullName}</h1>
                  <span className="bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full font-bold border border-amber-400/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    যাচাইকৃত প্যানেল আইনজীবী
                  </span>
                </div>
                <p className="text-sm font-semibold text-emerald-200 font-sans">{lawyer.designation}</p>
                <p className="text-xs text-slate-300 font-sans">{lawyer.barAssociation}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="gold"
                onClick={() => navigate(`/legal-assistance/apply?lawyerId=${lawyer.id}`)}
                className="shadow-xl font-bold"
              >
                আইনী সহায়তা আবেদন করুন
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={() => setConsultationOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                পরামর্শ নির্ধারণ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Core Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#064E3B] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider font-sans">
              <MapPin className="w-4 h-4 text-[#D97706]" />
              অধিক্ষেত্র ও চেম্বার ঠিকানা
            </div>
            <p className="text-base font-bold text-slate-900 font-heading">{lawyer.district} জেলা ({lawyer.upazila})</p>
            <p className="text-xs text-slate-600 font-sans">{lawyer.chamberAddress}</p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#064E3B] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider font-sans">
              <Briefcase className="w-4 h-4 text-[#D97706]" />
              পেশাগত অভিজ্ঞতা ও ভাষা
            </div>
            <p className="text-base font-bold text-slate-900 font-heading">{lawyer.yearsOfExperience} বছরের অভিজ্ঞতা</p>
            <p className="text-xs text-slate-600 font-sans">ভাষা দক্ষতা: {lawyer.languages.join(', ')}</p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#064E3B] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider font-sans">
              <Award className="w-4 h-4 text-[#D97706]" />
              বার কাউন্সিল এনরোলমেন্ট
            </div>
            <p className="text-base font-mono font-bold text-[#D97706]">{lawyer.enrollmentNumber}</p>
            <p className="text-xs text-slate-600 font-sans">তালিকাভুক্তির বছর: {lawyer.enrollmentYear}</p>
          </div>
        </div>

        {/* Bio Statement & Pro-Bono Commitment */}
        <div className="glass-card rounded-3xl p-8 space-y-4 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 text-[#064E3B] border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold font-heading text-slate-900">
              আইনজীবীর পরিচিতি ও মানবিক প্রতিশ্রুতি
            </h3>
          </div>
          <p className="text-sm text-slate-700 font-sans leading-relaxed">
            {lawyer.bio}
          </p>

          <div className="pt-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-950 font-sans">
            <HeartHandshake className="w-5 h-5 text-[#064E3B] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">নেকী ফাউন্ডেশন প্রো-বোনো পার্টনারশিপ:</p>
              <p className="text-emerald-900/80 mt-0.5">
                এই আইনজীবী নেকী ফাউন্ডেশন প্যানেলের মাধ্যমে প্রতিমাসে সুবিধাবঞ্চিত পরিবারের জন্য নির্ধারিত সংখ্যক মামলা সম্পূর্ণ নিঃশুল্ক বা নামমাত্র প্রসেসিং ফিতে পরিচালনা করতে চুক্তিবদ্ধ।
              </p>
            </div>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="glass-card rounded-3xl p-8 space-y-4 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
            বিশেষজ্ঞতার ক্ষেত্রসমূহ
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {lawyer.practiceAreas.map((area, idx) => (
              <span key={idx} className="px-4 py-2 bg-emerald-50 text-[#064E3B] text-xs font-bold rounded-xl border border-emerald-200 font-sans">
                {area}
              </span>
            ))}
          </div>
        </div>

      </div>

      <QuickConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultDistrict={lawyer.district}
        defaultCategory={lawyer.practiceAreas[0]}
      />
    </div>
  );
};
