import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { imageConfig } from '../../config/image.config';
import { siteConfig } from '../../config/site.config';
import { 
  CreditCard, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Receipt, 
  X, 
  Calendar, 
  ArrowUpRight,
  BadgeCheck
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  trxId: string;
  trackingNumber: string;
  purpose: string;
  amount: number;
  grantAmount: number;
  method: string;
  date: string;
  status: 'SUCCESS' | 'WAIVED' | 'PENDING';
}

export const BeneficiaryPayments: React.FC = () => {
  const [payments] = useState<PaymentRecord[]>([
    {
      id: 'pay-001',
      trxId: 'TRX-NF-9921448',
      trackingNumber: 'NF-LEG-2026-001',
      purpose: 'পারিবারিক আদালত আইনী সহায়তা ও নথি নিরীক্ষা',
      amount: 500,
      grantAmount: 25000,
      method: 'বিকাশ অনলাইন (ফাউন্ডেশন ভাউচার)',
      date: '০১ মার্চ ২০২৬, ১০:০৫ AM',
      status: 'SUCCESS',
    },
    {
      id: 'pay-002',
      trxId: 'TRX-NF-8812390',
      trackingNumber: 'NF-LEG-2026-002',
      purpose: 'জমিজমা সংক্রান্ত দেওয়ানী মোকদ্দমা প্রস্তুতি গ্রান্ট',
      amount: 500,
      grantAmount: 30000,
      method: 'নগদ ডিজিটাল (ফাউন্ডেশন স্পনসরড)',
      date: '০৫ মার্চ ২০২৬, ০৩:২০ PM',
      status: 'SUCCESS',
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">পেমেন্ট, অনুদান ও মানি রিসিপ্ট</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ফাউন্ডেশন কর্তৃক প্রদত্ত আইনী সহায়তা অনুদান এবং অফিসিয়াল মানি রিসিপ্ট সংগ্রহ করুন
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>১০০% স্বচ্ছ ও অডিটকৃত হিসাব</span>
        </div>
      </div>

      {/* Financial Aid Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white shadow-md space-y-2 border border-emerald-900/30">
          <span className="text-xs font-bold text-emerald-300 block">মোট অনুমোদিত আইনী অনুদান</span>
          <p className="text-3xl font-extrabold tracking-tight">৫৫,০০০ ৳</p>
          <p className="text-[11px] text-emerald-200">নেকী ফাউন্ডেশন সহায়তা ফান্ড থেকে সরাসরি আইনজীবী ও কোর্ট ফি বহন</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 block">প্রসেসিং ফি মওকুফ ও জমা</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">১,০০০ ৳</p>
          <p className="text-[11px] text-emerald-700 font-bold">✓ ২ টি আবেদনেরই প্রসেসিং সম্পন্ন</p>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-amber-800 block">সেবাগ্রহীতার অবশিষ্ট বকেয়া</span>
          <p className="text-3xl font-extrabold text-amber-900 tracking-tight">০ ৳</p>
          <p className="text-[11px] text-amber-800">অসহায় ও সুবিধাবঞ্চিতদের সম্পূর্ণ বিনামূল্যে সেবা প্রদান করা হয়</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
        <div>
          <h3 className="text-lg font-bold font-heading text-slate-900">লেনদেন ও সহায়তা হিস্টোরি</h3>
          <p className="text-xs text-slate-500">আপনার আবেদনের প্রেক্ষিতে নিষ্পত্তিকৃত আর্থিক লেনদেনের তালিকা</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ট্রানজেকশন আইডি</th>
                <th className="py-3 px-4">আইনী আবেদনের বিষয়</th>
                <th className="py-3 px-4">কেস আইডি</th>
                <th className="py-3 px-4">পেমেন্ট মাধ্যম</th>
                <th className="py-3 px-4">ফাউন্ডেশন অনুদান</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">মানি রিসিপ্ট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <span className="bg-slate-100 px-2 py-0.5 rounded">{p.trxId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{p.purpose}</span>
                    <span className="text-[11px] text-slate-400 font-sans">{p.date}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {p.trackingNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{p.method}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 font-sans">
                    +{p.grantAmount.toLocaleString('bn-BD')} ৳
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-[#064E3B] border border-emerald-200">
                      ✓ পরিশোধিত ও কার্যকর
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(p)}
                      className="gap-1.5 text-xs"
                    >
                      <Receipt className="w-3.5 h-3.5 text-amber-500" />
                      <span>রিসিপ্ট দেখুন</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OFFICIAL MONEY RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Modal Close */}
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Receipt Paper */}
            <div id="printable-receipt" className="p-6 rounded-2xl border-2 border-emerald-800/30 bg-[#FFFDF9] space-y-5">
              
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b border-emerald-800/20 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={imageConfig.logo}
                    alt="Logo"
                    className="w-12 h-12 rounded-full object-cover border border-emerald-700/40 bg-white"
                  />
                  <div>
                    <h3 className="text-lg font-extrabold font-heading text-slate-900 leading-tight">
                      {siteConfig.nameBn}
                    </h3>
                    <p className="text-[10px] text-emerald-800 font-semibold tracking-wider uppercase font-sans">
                      {siteConfig.nameEn}
                    </p>
                    <p className="text-[9px] text-slate-500 font-sans">
                      আরজেএসসি রেজি: NF-BD-2026/0491 • বালুড়া, যশোর
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200 block">
                    অফিসিয়াল রিসিপ্ট
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    রিসিপ্ট নং: #{selectedReceipt.trxId.slice(-6)}
                  </span>
                </div>
              </div>

              {/* Receipt Body Info */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">সেবাগ্রহীতার নাম:</span>
                    <span className="font-bold text-slate-900">মোঃ রহিম উল্লাহ</span>
                    <span className="text-[10px] text-slate-500 block">আইডি: NF-BEN-2026/8842</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">তারিখ ও সময়:</span>
                    <span className="font-bold text-slate-800 font-sans">{selectedReceipt.date}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block text-[11px]">আইনী সহায়তা রেফারেন্স:</span>
                  <p className="font-bold text-slate-900">{selectedReceipt.purpose}</p>
                  <p className="text-[11px] font-mono text-emerald-800">ট্র্যাকিং নম্বর: {selectedReceipt.trackingNumber}</p>
                </div>

                {/* Amount Ledger Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">ফাউন্ডেশন বরাদ্দকৃত আইনী অনুদান:</span>
                    <span className="font-bold text-emerald-800 font-sans">+{selectedReceipt.grantAmount.toLocaleString('bn-BD')} ৳</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">আবেদন প্রসেসিং ফি (পরিশোধিত):</span>
                    <span className="font-bold text-slate-900 font-sans">{selectedReceipt.amount} ৳</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>সেবাগ্রহীতার প্রদেয় অবশিষ্ট:</span>
                    <span className="text-[#064E3B] font-sans">০.০০ ৳ (পরিশোধিত)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>পেমেন্ট মাধ্যম: {selectedReceipt.method}</span>
                  <span className="font-mono font-bold text-slate-700">{selectedReceipt.trxId}</span>
                </div>
              </div>

              {/* Authorized Seal */}
              <div className="pt-4 border-t border-emerald-800/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-bold">
                  <BadgeCheck className="w-4 h-4 text-emerald-700" />
                  <span>ডিজিটালি ভেরিফাইড ও সিলমোহরকৃত</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-800 font-heading">হিসাব ও অডিট বিভাগ</p>
                  <p className="text-[9px] text-slate-400 font-sans">নেকী ফাউন্ডেশন বাংলাদেশ</p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট করুন</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert('মানি রিসিপ্ট PDF ডাউনলোড শুরু হয়েছে!');
                  setSelectedReceipt(null);
                }}
                className="gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>রিসিপ্ট ডাউনলোড</span>
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
