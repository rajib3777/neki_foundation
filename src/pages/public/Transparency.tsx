import React from 'react';
import { FileText, Download, ShieldCheck, TrendingUp, Scale } from 'lucide-react';

export const Transparency: React.FC = () => {
  const reports = [
    { title: 'বার্ষিক নিরীক্ষিত আর্থিক হিসাব বিবরণী ২০২৫', type: 'PDF • ৫.৪ MB', year: '২০২৫-২৬', status: 'নিরীক্ষিত ও অনুমোদিত', auditor: 'মেসার্স আহমেদ খান অ্যান্ড কোং চার্টার্ড একাউন্টেন্টস' },
    { title: 'আইনী সহায়তা প্রাপ্ত পরিবারসমূহের বাস্তব ফলাফল রিপোর্ট ২০২৫', type: 'PDF • ৩.২ MB', year: '২০২৫', status: 'সর্বসাধারণের জন্য উন্মুক্ত', auditor: 'নেকী ফাউন্ডেশন মূল্যায়ন সেল' },
    { title: '৬৪ জেলা প্যানেল আইনজীবী কার্যক্রম ও গভর্নেন্স নির্দেশিকা', type: 'PDF • ২.১ MB', year: '২০২৬', status: 'হালনাগাদকৃত', auditor: 'আইনী উপদেষ্টা পরিষদ' },
    { title: 'পরিবেশ ও বৃক্ষরোপণ তহবিল ব্যয় নিরীক্ষা প্রতিবেদন', type: 'PDF • ১.৮ MB', year: '২০২৫', status: 'প্রকাশিত', auditor: 'সোশ্যাল অডিট কমিটি' },
  ];

  return (
    <div className="space-y-16 pb-24 font-bangla">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white border-b-2 border-emerald-600/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-24 relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest">
              স্বচ্ছতা, সুশাসন ও জবাবদিহিতা
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block leading-tight sm:leading-snug">
            প্রতিবেদন ও{' '}
            <span className="text-gold-gradient font-heading">গভর্ন্যান্স তথ্য</span>
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed pt-4">
            নেকী ফাউন্ডেশন শতভাগ আর্থিক ও কাঠামোগত স্বচ্ছতায় বিশ্বাসী। আমাদের প্রতিটি তহবিলের আয়-ব্যয় হিসাব জনসম্মুখে উন্মুক্ত রাখা হয়।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Core Principles & Breakdown Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-[#064E3B] shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] uppercase tracking-wider font-sans">
              <Scale className="w-4 h-4 text-[#D97706]" />
              তহবিল ব্যবহারের ৮২%
            </div>
            <p className="text-xl font-bold text-slate-900 font-heading">সরাসরি মামলা ও আইনী লড়াই</p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              আইনজীবীর ফি, কোর্ট ফি, সার্টিফায়েড নথিপত্র উত্তোলন ও অসচ্ছল পরিবারের যাতায়াত সহায়তা।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-emerald-600 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider font-sans">
              <TrendingUp className="w-4 h-4 text-[#D97706]" />
              তহবিল ব্যবহারের ১০%
            </div>
            <p className="text-xl font-bold text-slate-900 font-heading">ত্রাণ ও বৃক্ষরোপণ অভিযান</p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              বন্যা ও শীতে জরুরি ত্রাণসামগ্রী এবং উপকূলীয় জেলাগুলোতে চারা রোপণ ও পরিবেশ সংরক্ষণ।
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-2 border-t-4 border-t-amber-600 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider font-sans">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              তহবিল ব্যবহারের ৮%
            </div>
            <p className="text-xl font-bold text-slate-900 font-heading">হেল্পডেস্ক ও প্রশাসন</p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              সার্বক্ষণিক ডিজিটাল প্ল্যাটফর্ম পরিচালনা, ভেরিফিকেশন টিম ও অডিট চার্জ।
            </p>
          </div>
        </div>

        {/* Reports & Governance Policy Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Downloadable Reports */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#064E3B]" />
                অডিট ও কার্যবিবরণী ডাউনলোড
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                পাবলিক ডোমেইন
              </span>
            </div>

            <div className="space-y-3 font-sans">
              {reports.map((report, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-emerald-500/40 hover:bg-white transition-all shadow-xs space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-heading leading-tight">{report.title}</p>
                      <p className="text-xs text-slate-500 font-sans mt-0.5">{report.type} • অর্থবছর: {report.year}</p>
                    </div>
                    <button
                      onClick={() => alert(`"${report.title}" ডাউনলোড শুরু হয়েছে (ডেমো নমুনা)`)}
                      className="p-2 text-[#064E3B] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer shrink-0 border border-emerald-200"
                      title="ডাউনলোড করুন"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60 text-slate-500">
                    <span>নিরীক্ষক: <strong className="text-slate-700">{report.auditor}</strong></span>
                    <span className="text-emerald-700 font-bold">{report.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Policies */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
              সংস্থার নীতি ও গঠনতন্ত্র
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 font-sans">
              {[
                { title: 'তথ্য সুরক্ষা ও ক্লায়েন্ট গোপনীয়তা নীতি', desc: 'আইনজীবী-মক্কেল কথোপকথন ১০০% গোপনীয়' },
                { title: 'সেবাগ্রহীতার অধিকার সনদ', desc: 'ন্যায্য সেবা ও ফি মওকুফের নিশ্চয়তা' },
                { title: 'প্যানেল আইনজীবী নিয়োগের নৈতিক মানদণ্ড', desc: 'বাংলাদেশ বার কাউন্সিলের বিধিমালার সাথে সামঞ্জস্যপূর্ণ' },
                { title: 'পরিচালনা পরিষদ ও অভ্যন্তরীণ জবাবদিহিতা', desc: 'স্বাধীন উপদেষ্টা পরিষদের নিরপেক্ষ মূল্যায়ন' },
                { title: 'অর্থনৈতিক স্বচ্ছতা ও চার্টার্ড একাউন্টেন্টস অডিট', desc: 'আইনসম্মত বার্ষিক নিরীক্ষা প্রকাশনা' },
              ].map((item, idx) => (
                <li key={idx} className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/60 transition-colors">
                  <p className="font-bold text-slate-900 text-xs font-heading">{item.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
