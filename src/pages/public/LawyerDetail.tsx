import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Briefcase, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { lawyerService } from '../../services/lawyer.service';
import type { Lawyer } from '../../types';
import { Button } from '../../components/ui/Button';
import { AvatarPlaceholder } from '../../components/ui/AvatarPlaceholder';

export const LawyerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center font-bangla">
        <div className="w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-3 text-sm text-gray-600 font-sans font-bold">আইনজীবী প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 font-bangla">
        <h2 className="text-2xl font-bold text-gray-800 font-heading">আইনজীবী প্রোফাইল পাওয়া যায়নি</h2>
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
    <div className="space-y-10 pb-20 font-bangla">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-500/40">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/lawyers" className="inline-flex items-center text-xs font-bold text-amber-400 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            আইনজীবী ডিরেক্টরিতে ফিরে যান
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <AvatarPlaceholder name={lawyer.fullName} isDemo={lawyer.isDemo} size="xl" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">{lawyer.fullName}</h1>
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-bold border border-amber-400/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    যাচাইকৃত আইনজীবী
                  </span>
                </div>
                <p className="text-sm font-semibold text-amber-300 font-sans">{lawyer.designation}</p>
                <p className="text-xs text-slate-300 font-sans">{lawyer.barAssociation}</p>
              </div>
            </div>

            <Button
              size="lg"
              variant="gold"
              onClick={() => navigate(`/legal-assistance/apply?lawyerId=${lawyer.id}`)}
              className="shadow-xl"
            >
              আইনী সহায়তা নিন
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#D97706] shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider font-sans">
              <MapPin className="w-4 h-4" />
              অধিক্ষেত্র ও কর্মস্থল
            </div>
            <p className="text-base font-bold text-gray-900 font-heading">{lawyer.district} জেলা ({lawyer.upazila})</p>
            <p className="text-xs text-gray-600 font-sans">{lawyer.chamberAddress}</p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#D97706] shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider font-sans">
              <Briefcase className="w-4 h-4" />
              পেশাগত অভিজ্ঞতা
            </div>
            <p className="text-base font-bold text-gray-900 font-heading">{lawyer.yearsOfExperience} বছর</p>
            <p className="text-xs text-gray-600 font-sans">প্যানেল মেম্বার ও নিয়মিত চর্চাকারী</p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#D97706] shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider font-sans">
              <Award className="w-4 h-4" />
              বার কাউন্সিল এনরোলমেন্ট
            </div>
            <p className="text-base font-mono font-bold text-[#D97706]">{lawyer.enrollmentNumber}</p>
            <p className="text-xs text-gray-600 font-sans">যাচাইকৃত সনদপ্রাপ্ত নম্বর</p>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="glass-card rounded-3xl p-8 space-y-4 shadow-xl border border-amber-500/20 mt-8">
          <h3 className="text-xl font-bold font-heading text-gray-900 border-b border-amber-500/20 pb-3">
            বিশেষজ্ঞতার ক্ষেত্রসমূহ
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {lawyer.practiceAreas.map((area, idx) => (
              <span key={idx} className="px-4 py-2 bg-amber-100/70 text-[#D97706] text-xs font-bold rounded-xl border border-amber-300 font-sans">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
