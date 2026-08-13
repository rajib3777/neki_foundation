import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="space-y-12 pb-20 font-bangla">
      
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white border-b-2 border-amber-500/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-24 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 uppercase tracking-widest mb-5">
            যোগাযোগ ও হেল্পডেস্ক
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block">
            আমাদের সাথে{' '}
            <span className="text-gold-gradient font-heading">যোগাযোগ করুন</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed mt-5">
            নেকী ফাউন্ডেশনের যে কোনো সেবা, আইনী পরামর্শ বা সহায়তা সম্পর্কিত তথ্যের জন্য সরাসরি মেসেজ পাঠাতে পারেন।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 space-y-6 border-t-4 border-t-[#D97706] shadow-xl">
              <h3 className="text-xl font-bold font-heading text-gray-900 border-b border-amber-500/20 pb-3">
                সদর দপ্তর ও হেল্পডেস্ক তথ্য
              </h3>
              
              <div className="space-y-5 text-sm text-gray-700 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 font-heading">প্রধান কার্যালয় ঠিকানা:</p>
                    <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">{siteConfig.contact.addressBn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 font-heading">হটলাইন / হেল্পলাইন:</p>
                    <p className="mt-0.5 text-xs font-bold text-[#D97706] font-mono">{siteConfig.contact.phoneBn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 font-heading">অফিসিয়াল ইমেইল:</p>
                    <p className="mt-0.5 text-xs text-gray-600 font-mono">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 font-heading">কার্যসময়:</p>
                    <p className="mt-0.5 text-xs text-gray-600">{siteConfig.contact.workingHoursBn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-amber-500/20">
              <h3 className="text-xl font-bold font-heading text-gray-900 border-b border-amber-500/20 pb-3">
                সরাসরি মেসেজ পাঠান
              </h3>

              {submitted ? (
                <div className="p-8 bg-amber-50 border border-amber-300 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#D97706] mx-auto" />
                  <h4 className="text-lg font-bold text-gray-900 font-heading">আপনার বার্তা সফলভাবে গৃহীত হয়েছে!</h4>
                  <p className="text-xs text-gray-600 font-sans">আমাদের টিম অতি শীঘ্রই আপনার মোবাইল নম্বরে অথবা ইমেইলে যোগাযোগ করবে।</p>
                  <Button size="sm" variant="gold" className="mt-2" onClick={() => setSubmitted(false)}>
                    আরেকটি বার্তা পাঠান
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="আপনার পূর্ণ নাম" isRequired placeholder="যেমন: মোঃ জহিরুল ইসলাম" />
                    <Input label="মোবাইল নম্বর" isRequired placeholder="01700-000000" />
                  </div>
                  <Input label="ইমেইল (ঐচ্ছিক)" type="email" placeholder="example@domain.com" />
                  <Textarea label="আপনার বার্তা / সহায়তার ধরন" isRequired placeholder="আপনার বিষয় বা প্রশ্ন সংক্ষেপে বর্ণনা করুন..." />
                  <Button type="submit" variant="gold" isLoading={isLoading} isFullWidth size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    মেসেজ পাঠান
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
