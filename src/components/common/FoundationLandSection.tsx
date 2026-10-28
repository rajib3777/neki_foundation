import React, { useState } from 'react';
import { MapPin, Building, ShieldCheck, CheckCircle2, Trees, Sparkles, X, ZoomIn, Eye } from 'lucide-react';
import { imageConfig } from '../../config/image.config';

export const FoundationLandSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const landPhotos = [
    {
      src: imageConfig.land1,
      title: 'স্থায়ী কার্যালয় ও সেবা কমপ্লেক্সের নির্ধারিত নিজস্ব ভূমি',
      subtitle: 'বালুড়া, গদখালী, ঝিকরগাছা, যশোর',
      caption: 'নেকী ফাউন্ডেশনের প্রাতিষ্ঠানিক ও দীর্ঘমেয়াদী সমাজসেবা নিশ্চিতকরণে কেনা নিজস্ব ভূমির প্রাথমিক অবকাঠামো ও সীমানা উন্নয়ন।',
      tag: 'জমি ক্রয় সম্পন্ন',
    },
    {
      src: imageConfig.land2,
      title: 'প্রাথমিক নির্বাহী কার্যালয় ও চেম্বার শেড',
      subtitle: 'মাঠ পর্যায়ের সমন্বয় কেন্দ্র',
      caption: 'গ্রাহক ও সেবাগ্রহীতাদের প্রাথমিক আইনী আবেদন গ্রহণ ও স্থানীয় কৃষকদের সাথে মতবিনিময়ের জন্য স্থাপিত নীল শেড।',
      tag: 'প্রাথমিক কাঠামো',
    },
    {
      src: imageConfig.land3,
      title: 'মাটি ভরাট ও অবকাঠামোগত ভিত্তি উন্নয়ন কাজ',
      subtitle: 'স্থায়ী মানবিক কমপ্লেক্স নির্মাণ পর্যায়',
      caption: 'পাকা ভবন ও সেবাকেন্দ্র নির্মাণের লক্ষ্যে ভিটা প্রস্তুত ও সার্বিক উন্নয়ন কার্যক্রম দ্রুতগতিতে এগিয়ে চলছে।',
      tag: 'উন্নয়ন কার্যক্রম চলমান',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-bangla">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-[#064E3B] text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-300 shadow-2xs font-sans">
            <Building className="w-3.5 h-3.5 text-[#064E3B]" />
            আমাদের স্থায়ী ঠিকানা ও নিজস্ব ভূমি
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading leading-snug sm:leading-normal">
          নেকী ফাউন্ডেশনের স্থায়ী কার্যালয় ও সেবা কমপ্লেক্স
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-3">
          যশোরের ঝিকরগাছা উপজেলার বালুড়ায় নেকী ফাউন্ডেশনের নিজস্ব অর্থায়নে জমি ক্রয় সম্পন্ন হয়েছে। এখানে গড়ে উঠছে স্থায়ী আইনী পরামর্শ কেন্দ্র, বৃক্ষরোপণ নার্সারি এবং সার্বক্ষণিক মানবিক সেবা হাব।
        </p>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center shrink-0 border border-emerald-200 font-bold">
            <MapPin className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">প্রতিষ্ঠানের স্থায়ী অবস্থান</p>
            <p className="text-xs text-slate-500 font-sans mt-0.5">বালুড়া, গদখালী, ঝিকরগাছা, যশোর</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B45309] flex items-center justify-center shrink-0 border border-amber-200 font-bold">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">সরকারি বৈধতা ও মালিকানা</p>
            <p className="text-xs text-slate-500 font-sans mt-0.5">রেজিস্টার্ড ট্রাস্টের অনুকূলে জমি রেজিস্ট্রি সম্পন্ন</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200 font-bold">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">চলমান নির্মাণ কাজ</p>
            <p className="text-xs text-slate-500 font-sans mt-0.5">মাটি ভরাট ও প্রাথমিক শেড স্থাপন সমাপ্ত</p>
          </div>
        </div>
      </div>

      {/* 3 Real Photographs Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {landPhotos.map((photo, idx) => (
          <div
            key={idx}
            className="group glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Zoom Overlay */}
            <div
              className="relative h-64 overflow-hidden cursor-pointer bg-slate-100"
              onClick={() => setActiveImage(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Status Tag */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#064E3B] text-amber-300 border border-emerald-500/50 shadow-md">
                  {photo.tag}
                </span>
              </div>

              {/* Zoom In Button */}
              <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3.5 left-3.5 right-14 text-white">
                <p className="text-xs font-semibold text-emerald-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {photo.subtitle}
                </p>
              </div>
            </div>

            {/* Photo Narrative Description */}
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-slate-900 font-heading leading-snug">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveImage(photo.src)}
                className="pt-2 text-xs font-bold text-[#064E3B] hover:text-[#D97706] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>বড় করে দেখুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Future Masterplan Card */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#011F1B] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-600/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest font-sans">
              ভবিষ্যৎ মহাপরিকল্পনা
            </span>
            <h3 className="text-2xl font-bold font-heading text-white">
              এই ভূমিতে যা যা বাস্তবায়িত হচ্ছে:
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
              নেকী ফাউন্ডেশন এই স্থায়ী ভূমিতে পর্যায়ক্রমে দুস্থ মানুষের আইনী সেল, ফ্রি রক্তদান সহায়তা কেন্দ্র এবং দেশব্যাপী বনায়নের জন্য একটি বিশাল ফলদ ও বনজ বৃক্ষের নার্সারি প্রতিষ্ঠা করছে।
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-2.5 text-xs font-bold font-sans">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>আইনী পরামর্শ ও মধ্যস্থতা বৈঠকখানা</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>কেন্দ্রীয় বৃক্ষরোপণ নার্সারি হাব</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>জরুরি মানবিক সহায়তা ডেস্ক ও ভল্ট</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Large Image View */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={activeImage}
              alt="নেকী ফাউন্ডেশনের জমি"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
