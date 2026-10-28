import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, Building2 } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="space-y-16 pb-24 font-bangla">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white border-b-2 border-emerald-600/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-24 relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest">
              সার্বক্ষণিক যোগাযোগ ও তথ্যকেন্দ্র
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block leading-tight sm:leading-snug">
            আমাদের সাথে{' '}
            <span className="text-gold-gradient font-heading">যোগাযোগ করুন</span>
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed pt-4">
            আইনী সহায়তা, বৃক্ষরোপণ অভিযান, রক্তদান বা সাধারণ জিজ্ঞাসার জন্য আমাদের কেন্দ্রীয় ও বিভাগীয় ডেস্কে সরাসরি যোগাযোগ করতে পারেন।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 space-y-6 border-t-4 border-t-[#064E3B] shadow-xl">
              <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
                সদর দপ্তর ও কেন্দ্রীয় ডেস্ক
              </h3>
              
              <div className="space-y-5 text-sm text-slate-700 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center shrink-0 border border-emerald-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 font-heading">প্রধান কার্যালয়ের ঠিকানা:</p>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{siteConfig.contact.addressBn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0 border border-amber-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 font-heading">২৪/৭ জরুরি হেল্পলাইন:</p>
                    <p className="mt-0.5 text-xs font-bold text-[#064E3B] font-mono">{siteConfig.contact.phoneBn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center shrink-0 border border-emerald-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 font-heading">অফিসিয়াল ইমেইল:</p>
                    <p className="mt-0.5 text-xs text-slate-600 font-mono">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 font-heading">কার্যসময়:</p>
                    <p className="mt-0.5 text-xs text-slate-600">{siteConfig.contact.workingHoursBn}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Callout */}
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-green-950">হোয়াটসঅ্যাপ সাপোর্ট</p>
                    <p className="text-[11px] text-green-700">তাৎক্ষণিক টেক্সট মেসেজ ও পরামর্শ</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/8801800000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  চ্যাট শুরু করুন
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 space-y-6 shadow-xl border border-slate-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  সরাসরি বার্তা পাঠান
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  আপনার মতামত বা প্রশ্ন লিখে পাঠান — আমাদের কমিউনিকেশন টিম দ্রুত উত্তর দেবে।
                </p>
              </div>

              {submitted ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-[#064E3B] rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-slate-900">আপনার বার্তাটি পৌঁছে গেছে!</h4>
                  <p className="text-xs text-slate-600 font-sans max-w-sm mx-auto leading-relaxed">
                    ধন্যবাদ। নেকী ফাউন্ডেশনের সমন্বয়ক টিম আগামী ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    আরেকটি বার্তা পাঠান
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="আপনার পূর্ণ নাম"
                      isRequired
                      placeholder="যেমন: মো. আরিফুল হক"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="মোবাইল নম্বর"
                      isRequired
                      placeholder="০১৭১১-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="ইমেইল ঠিকানা (ঐচ্ছিক)"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="বিষয়"
                      isRequired
                      placeholder="যেমন: জমিজমা সংক্রান্ত আইনী পরামর্শ"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="আপনার বিস্তারিত বার্তা"
                    isRequired
                    rows={5}
                    placeholder="আপনার প্রশ্ন বা প্রস্তাবের বিবরণ লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button type="submit" variant="gold" size="lg" isFullWidth isLoading={isLoading} className="font-bold">
                    <Send className="w-4 h-4 mr-2" />
                    বার্তা প্রেরণ করুন
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Divisional Offices Hub */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full uppercase tracking-wider">
              আঞ্চলিক সমন্বয় কেন্দ্র
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
              বিভাগীয় কার্যালয়সমূহ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { div: 'চট্টগ্রাম বিভাগ', address: 'কোর্ট হিল রোড, জজ কোর্ট চত্বর, চট্টগ্রাম', phone: '০১৭০০-২২৩৩৪৪' },
              { div: 'রাজশাহী বিভাগ', address: 'কোর্ট রোড, আইনজীবী ভবন, রাজশাহী', phone: '০১৭০০-৩৩৪৪৫৫' },
              { div: 'সিলেট বিভাগ', address: 'কোর্ট পয়েন্ট, বন্দরবাজার রোড, সিলেট', phone: '০১৭০০-৬৬৭৭৮৮' },
              { div: 'খুলনা বিভাগ', address: 'কেডিএ এভিনিউ, জজ কোর্ট মোড়, খুলনা', phone: '০১৭০০-৪৪৫৫৬৬' },
            ].map((office, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 space-y-2 border-t-2 border-t-[#064E3B]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B] font-heading">
                  <Building2 className="w-4 h-4" />
                  <span>{office.div}</span>
                </div>
                <p className="text-xs text-slate-600 font-sans">{office.address}</p>
                <p className="text-xs font-mono font-bold text-[#D97706] pt-1">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
