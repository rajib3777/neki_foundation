import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'নেকী ফাউন্ডেশন থেকে কীভাবে সম্পূর্ণ বিনামূল্যে বা স্বল্পমূল্যে আইনী সহায়তা পাওয়া যায়?',
    answer: 'আপনার আবেদনের প্রেক্ষিতে আমাদের কেন্দ্রীয় যাচাই সেল আপনার আয়ের তথ্য ও বিরোধের ধরন পর্যালোচনা করবে। অসচ্ছল ও দুস্থ পরিবারকে ১০০% বিনামূল্যে এবং নিম্ন-মধ্যবিত্ত পরিবারকে নামমাত্র প্রশাসনিক খরচে বাংলাদেশ বার কাউন্সিলের নিবন্ধিত প্যানেল আইনজীবী নিয়োগ দেওয়া হয়।',
  },
  {
    question: 'আমার আবেদনটি কতদিনের মধ্যে প্যানেল আইনজীবী বরাদ্দ পাবে?',
    answer: 'জরুরি (Emergency) ক্যাটাগরির আবেদনসমূহ ১২ থেকে ২৪ ঘণ্টার মধ্যে পর্যালোচনা করা হয়। সাধারণ আবেদনসমূহ সাধারণত ২-৩ কার্যদিবসের মধ্যে মনোনীত প্যানেল আইনজীবীকে হস্তান্তর করে সেবাগ্রহীতার সাথে যোগাযোগ করিয়ে দেওয়া হয়।',
  },
  {
    question: '৬৪ জেলায় কি আপনারা সরাসরি আইনজীবী সেবা প্রদান করেন?',
    answer: 'হ্যাঁ, বাংলাদেশের ৬৪টি জেলা বার অ্যাসোসিয়েশনে আমাদের নিবন্ধিত প্যানেল আইনজীবী রয়েছেন। সেবাগ্রহীতার নিজ জেলাতেই সংশ্লিষ্ট বিজ্ঞ আইনজীবীর চেম্বারে বা আদালতে মামলা পরিচালনা ও আইনী পরামর্শের ব্যবস্থা করা হয়।',
  },
  {
    question: 'আইনী সহায়তার জন্য কী কী নথিপত্র প্রয়োজন হয়?',
    answer: 'সাধারণত জাতীয় পরিচয়পত্র (NID) বা জন্ম সনদ, স্থানীয় জনপ্রতিনিধির প্রত্যয়ন বা অসচ্ছলতা সনদ (ফি মওকুফের জন্য) এবং বিরোধ সংক্রান্ত প্রাথমিক ডকুমেন্টস (যেমন: দলিলের কপি, খতিয়ান, বা কোর্ট নোটিশ) জমা দিতে হয়।',
  },
  {
    question: 'আমার পারিবারিক ও আইনী তথ্যের গোপনীয়তা কীভাবে নিশ্চিত করা হয়?',
    answer: 'নেকী ফাউন্ডেশন তথ্য সুরক্ষা নীতিমালা ও ক্লায়েন্ট-অ্যাটর্নি প্রিভিলেজ কঠোরভাবে অনুসরণ করে। আপনার দেওয়া মামলার বিবরণ ও নথি সম্পূর্ণ গোপন থাকে এবং কেবল দায়িত্বপ্রাপ্ত প্যানেল আইনজীবী ছাড়া অন্য কারও সাথে শেয়ার করা হয় না।',
  },
  {
    question: 'মামলার বাইরে আপোষ-মীমাংসার কি কোনো সুযোগ আছে?',
    answer: 'হ্যাঁ, আমাদের প্যানেল আইনজীবীরা পারিবারীক ও দেওয়ানী বিরোধের ক্ষেত্রে উভয় পক্ষের সম্মান রক্ষা করে সামাজিক আপোষ ও লিগ্যাল মেডিকেশনের মাধ্যমে দীর্ঘমেয়াদী বিরোধের দ্রুত ও শান্তিপূর্ণ সমাধান প্রদানে উৎসাহ দেন।',
  },
];

export const FaqAccordion: React.FC<{ items?: FaqItem[]; title?: string }> = ({
  items = defaultFaqs,
  title = 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-bangla">
      <div className="text-center flex flex-col items-center">
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300">
            <HelpCircle className="w-4 h-4 text-[#064E3B]" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 leading-snug sm:leading-normal">
          {title}
        </h2>
        <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto pt-2">
          নেকী ফাউন্ডেশনের আইনী সহায়তা ও সেবা গ্রহণ সম্পর্কিত সাধারণ প্রশ্নের উত্তর
        </p>
      </div>

      <div className="space-y-3.5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden border ${
                isOpen ? 'border-emerald-600/40 shadow-md bg-white' : 'border-slate-200 hover:border-emerald-400/50'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-base font-bold font-heading text-slate-900 leading-snug">
                  {item.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#064E3B] text-amber-300 rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
