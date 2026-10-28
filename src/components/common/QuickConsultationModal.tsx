import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, Clock, ShieldCheck, Scale, Send } from 'lucide-react';
import { bangladeshDistricts } from '../../config/districts.config';
import { Button } from '../ui/Button';

interface QuickConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDistrict?: string;
  defaultCategory?: string;
}

export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultDistrict = '',
  defaultCategory = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(defaultDistrict || 'ঢাকা');
  const [category, setCategory] = useState(defaultCategory || 'জমিজমা ও দেওয়ানী আইন');
  const [preferredMode, setPreferredMode] = useState<'PHONE' | 'CHAMBER' | 'ONLINE'>('PHONE');
  const [briefSummary, setBriefSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setBookingRef(`NF-CONS-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setBriefSummary('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto font-bangla relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#064E3B] to-[#0F172A] p-6 text-white rounded-t-3xl relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold border border-amber-400/30 w-fit mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>প্রাক-আইনী পরামর্শ অ্যাপয়েন্টমেন্ট</span>
          </div>
          <h2 id="consultation-modal-title" className="text-xl font-bold font-heading text-white">
            আইনজীবীর সাথে পরামর্শের সময় নির্ধারণ
          </h2>
          <p className="text-xs text-emerald-100 font-sans mt-1">
            আপনার বিবরণ পূরণ করুন — আমাদের প্যানেল সমন্বয়ক ২ ঘণ্টার মধ্যে যোগাযোগ করবেন।
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  পরামর্শের অনুরোধ সফলভাবে গৃহীত হয়েছে!
                </h3>
                <p className="text-xs text-slate-600 font-sans max-w-sm mx-auto leading-relaxed">
                  ধন্যবাদ {name}। আপনার অনুরোধটি রেজিস্টার করা হয়েছে। আমাদের আইনী ডেস্ক থেকে শীঘ্রই ফোন করা হবে।
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs font-mono space-y-1 max-w-xs mx-auto">
                <p className="text-slate-500 font-sans font-bold">আপনার বুকিং রেফারেন্স আইডি:</p>
                <p className="text-base font-black text-amber-800">{bookingRef}</p>
              </div>

              <div className="pt-2">
                <Button variant="gold" onClick={handleReset}>
                  সম্পন্ন করুন
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মো. কামরুল ইসলাম"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১৭১১-XXXXXX"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white font-mono"
                  />
                </div>
              </div>

              {/* District & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আপনার জেলা</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    {bangladeshDistricts.map((d) => (
                      <option key={d.id} value={d.nameBn}>{d.nameBn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আইনী বিষয়ের ধরন</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="জমিজমা ও দেওয়ানী আইন">জমিজমা ও দেওয়ানী আইন</option>
                    <option value="ফৌজদারী মামলা">ফৌজদারী মামলা</option>
                    <option value="পারিবারিক ও খোরপোষ আইন">পারিবারিক ও খোরপোষ</option>
                    <option value="শ্রম ও মজুরি অধিকার">শ্রম ও মজুরি বিরোধ</option>
                    <option value="নারী ও শিশু নির্যাতন দমন">নারী ও শিশু নির্যাতন দমন</option>
                    <option value="সাইবার অপরাধ ও হয়রানি">সাইবার হয়রানি</option>
                  </select>
                </div>
              </div>

              {/* Preferred Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  পরামর্শ গ্রহণের পছন্দসই মাধ্যম:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'PHONE' as const, label: 'ফোন কলে', icon: Phone },
                    { id: 'CHAMBER' as const, label: 'সরাসরি চেম্বারে', icon: Calendar },
                    { id: 'ONLINE' as const, label: 'ভিডিও কলে', icon: Clock },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPreferredMode(id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        preferredMode === id
                          ? 'bg-emerald-50 border-emerald-600 text-[#064E3B] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brief Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার আইনী সমস্যার বিবরণ (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={briefSummary}
                  onChange={(e) => setBriefSummary(e.target.value)}
                  placeholder="সংক্ষেপে সমস্যার মূল কথা লিখুন যাতে আইনজীবী প্রস্তুতি নিতে পারেন..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                />
              </div>

              {/* Security & Confidentiality Notice */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আপনার তথ্য ১০০% গোপন রাখা হবে এবং কেবল মনোনীত আইনজীবী পর্যবেক্ষণ করবেন।</span>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="gold" isFullWidth isLoading={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  পরামর্শ অ্যাপয়েন্টমেন্ট নিশ্চিত করুন
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
