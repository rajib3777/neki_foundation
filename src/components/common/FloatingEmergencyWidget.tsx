import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, X, Scale, Clock } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { QuickConsultationModal } from './QuickConsultationModal';

export const FloatingEmergencyWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 font-bangla">
        {/* Expanded Popup Menu */}
        {isOpen && (
          <div className="mb-3 w-72 bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-emerald-600/20 space-y-3 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 font-heading">জরুরি সেবা হেল্পডেস্ক</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {/* Call Hotline */}
              <a
                href="tel:+8801800000000"
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 text-[#064E3B] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">সরাসরি হটলাইন কল</p>
                  <p className="text-[11px] text-slate-500 font-mono font-bold">{siteConfig.contact.phoneBn}</p>
                </div>
              </a>

              {/* WhatsApp Support */}
              <a
                href="https://wa.me/8801800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-green-50 hover:bg-green-100/80 text-green-900 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">হোয়াটসঅ্যাপে চ্যাট করুন</p>
                  <p className="text-[11px] text-slate-500">তাৎক্ষণিক সহায়তা পান</p>
                </div>
              </a>

              {/* Book Free Consultation */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setConsultationOpen(true);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 transition-colors text-left cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#D97706] text-white flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">আইনজীবী অ্যাপয়েন্টমেন্ট</p>
                  <p className="text-[11px] text-slate-500">বিনামূল্যে বুক করুন</p>
                </div>
              </button>
            </div>

            <div className="pt-1 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              <span>২৪ ঘণ্টার মধ্যে রেসপন্স নিশ্চিত</span>
            </div>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#047857] hover:to-[#064E3B] text-white rounded-full shadow-2xl border-2 border-amber-400/60 hover:scale-105 transition-all duration-300 cursor-pointer group"
          aria-label="আইনী জরুরি সহায়তা"
        >
          <div className="relative">
            <Scale className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
          </div>
          <span className="text-xs font-bold font-bangla hidden sm:inline">
            জরুরি আইনী সাহায্য
          </span>
        </button>
      </div>

      {/* Consultation Modal */}
      <QuickConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
};
