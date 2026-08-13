import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'নেকী ফাউন্ডেশন থেকে কীভাবে বিনামূল্যে বা নামমাত্র ফিতে আইনী সহায়তা পাওয়া যায়?',
    answer: 'আপনার আবেদনের প্রেক্ষিতে ফাউন্ডেশন স্ক্যানিং টিম আপনার আয়ের তথ্য ও মামলার ধরণ পর্যালোচনা করবে। যোগ্যতা বিচারে ১০০% বিনামূল্যে অথবা নামমাত্র প্রসেসিং ফিতে বাংলাদেশ বার কাউন্সিলের নিবন্ধিত প্যানেল আইনজীবী নিয়োগ দেওয়া হয়।',
  },
  {
    question: 'আমার আবেদনটি কতদিনের মধ্যে প্যানেল আইনজীবী বরাদ্দ পাবে?',
    answer: 'জরুরি (Emergency) ক্যাটাগরির আবেদনসমূহ ১২ থেকে ২৪ ঘণ্টার মধ্যে পর্যালোচনা করা হয়। সাধারণ আবেদনসমূহ সাধারণত ৩ কার্যদিবসের মধ্যে প্যানেল আইনজীবীকে হস্তান্তর করা হয়।',
  },
  {
    question: '৬৪ জেলায় কি আপনারা সরাসরি আইনজীবী সেবা প্রদান করেন?',
    answer: 'হ্যাঁ, বাংলাদেশের ৬৪টি জেলা বার অ্যাসোসিয়েশনে আমাদের নিবন্ধিত প্যানেল আইনজীবী রয়েছে। সুবিধাভোগীর নিজ জেলাতেই মামলা পরিচালনা ও আইনী পরামর্শের ব্যবস্থা করা হয়।',
  },
  {
    question: 'আইনী সহায়তার জন্য কী কী নথিপত্র প্রয়োজন হয়?',
    answer: 'সাধারণত জাতীয় পরিচয়পত্র (NID) বা জন্ম সনদ, স্থানীয় জনপ্রতিনিধির অসচ্ছলতা সনদ (যদি থাকে) এবং মামলা বা বিরোধ সংক্রান্ত প্রাথমিক ডকুমেন্টস জমা দিতে হয়।',
  },
  {
    question: 'আবেদনপত্রের গোপনীয়তা কীভাবে রক্ষা করা হয়?',
    answer: 'ফাউন্ডেশন ডাটা সুরক্ষা আইন ও ক্লায়েন্ট-অ্যাটর্নি প্রিভিলেজ পূর্ণাঙ্গভাবে অনুসরণ করে। আপনার মামলার কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।',
  },
];

export const FaqAccordion: React.FC<{ items?: FaqItem[]; title?: string }> = ({
  items = defaultFaqs,
  title = 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-bangla">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-[#D97706] text-xs font-bold border border-amber-300">
          <HelpCircle className="w-4 h-4 text-[#D97706]" />
          <span>সচরাচর জিজ্ঞাসা</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 leading-normal">
          {title}
        </h2>
        <p className="text-sm text-gray-600 font-sans max-w-xl mx-auto">
          নেকী ফাউন্ডেশনের আইনী সেবা ও আবেদন প্রক্রিয়া সম্পর্কিত বহুল জিজ্ঞাসিত প্রশ্নের উত্তর
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden border ${
                isOpen ? 'border-[#D97706] shadow-lg bg-white/95' : 'border-amber-500/20 hover:border-amber-400/40'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-base font-bold font-heading text-gray-900 leading-snug">
                  {item.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#D97706] text-white rotate-180' : 'bg-amber-100 text-[#D97706]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-gray-600 font-sans leading-relaxed border-t border-amber-500/10">
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
