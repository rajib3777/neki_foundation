import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export const Transparency: React.FC = () => {
  const mockReports = [
    { title: 'বার্ষিক প্রতিবেদন ২০২৫ (ডেমো)', type: 'PDF', year: '২০২৫', status: 'প্রকাশিত' },
    { title: 'আর্থিক বিবরণী ২০২৫ (ডেমো)', type: 'PDF', year: '২০২৫', status: 'প্রকাশিত' },
    { title: 'আইনী সহায়তা কার্যক্রম রিপোর্ট Q4/২০২৫ (ডেমো)', type: 'PDF', year: '২০২৫', status: 'প্রকাশিত' },
  ];

  return (
    <div className="space-y-12 pb-20 font-bangla">
      {/* Header */}
      <section className="bg-[#0F172A] text-white border-b-2 border-amber-500/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-24 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 uppercase tracking-widest mb-5">
            স্বচ্ছতা ও জবাবদিহিতা
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block">
            প্রতিবেদন ও{' '}
            <span className="text-gold-gradient font-heading">গভর্ন্যান্স তথ্য</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed mt-5">
            নেকী ফাউন্ডেশন সম্পূর্ণ স্বচ্ছতার ভিত্তিতে পরিচালিত। আমাদের সকল আর্থিক প্রতিবেদন ও কার্যক্রম রিপোর্ট জনসম্মুখে উন্মুক্ত।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-amber-500/20">
            <h3 className="text-xl font-bold font-heading text-gray-900 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <FileText className="w-5 h-5 text-[#D97706]" />
              প্রতিবেদন ডাউনলোড করুন
            </h3>
            <div className="space-y-3 font-sans">
              {mockReports.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/70 border border-amber-500/15 hover:border-amber-400/40 transition-colors shadow-2xs">
                  <div>
                    <p className="text-sm font-bold text-gray-900 font-heading">{report.title}</p>
                    <p className="text-xs text-gray-500 font-sans">{report.type} • {report.year} • {report.status}</p>
                  </div>
                  <button className="p-2.5 text-[#D97706] hover:bg-amber-100/60 rounded-xl transition-colors" title="ডাউনলোড (ডেমো)">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-800 font-sans bg-amber-100/60 border border-amber-300 rounded-xl p-3">
              ⓘ এটি একটি ডেমো পরিবেশ। ফাইলগুলো প্রদর্শনীমূলক।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-amber-500/20">
            <h3 className="text-xl font-bold font-heading text-gray-900 flex items-center gap-2 border-b border-amber-500/20 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#D97706]" />
              সংস্থার নীতি ও কাঠামো
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-sans">
              {['গোপনীয়তা নীতি ও তথ্য সুরক্ষা', 'সেবাগ্রহীতার অধিকার নীতি', 'আইনজীবী নির্বাচন প্রক্রিয়া', 'বোর্ড গঠন ও জবাবদিহিতা কাঠামো', 'বার্ষিক অডিটর রিপোর্ট আর্কাইভ'].map((item) => (
                <li key={item} className="flex items-center gap-3 hover:text-[#D97706] cursor-pointer p-2.5 rounded-xl hover:bg-white/60 transition-colors">
                  <FileText className="w-4 h-4 text-[#D97706]" />
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
