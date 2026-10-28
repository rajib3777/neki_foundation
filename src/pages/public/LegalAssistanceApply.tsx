import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { legalAidService } from '../../services/legalAid.service';
import { lawyerService } from '../../services/lawyer.service';
import { paymentService } from '../../services/payment.service';
import { bangladeshDistricts } from '../../config/districts.config';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Copy, Printer, Scale, UserCheck } from 'lucide-react';
import type { PaymentMethod, Lawyer } from '../../types';

const steps = ['আবেদনের বিবরণ', 'নথিপত্র সংযুক্তি', 'ফি বা মওকুফ যাচাই', 'নিশ্চায়ন'];

const requestSchema = z.object({
  beneficiaryName: z.string().min(3, 'দয়া করে আপনার পূর্ণ নাম লিখুন'),
  beneficiaryMobile: z.string().min(11, 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন'),
  district: z.string().min(1, 'জেলা নির্বাচন করুন'),
  legalCategory: z.string().min(1, 'বিষয় নির্বাচন করুন'),
  caseSummary: z.string().min(30, 'সংক্ষিপ্ত বিবরণ সর্বনিম্ন ৩০ অক্ষরের হতে হবে'),
  urgencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']),
});
type RequestFormData = z.infer<typeof requestSchema>;

export const LegalAssistanceApply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('BKASH');
  const [payerMobile, setPayerMobile] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  const [searchParams] = useSearchParams();
  const lawyerId = searchParams.get('lawyerId') || undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (lawyerId) {
      lawyerService.getLawyerById(lawyerId).then((res) => {
        if (res) setSelectedLawyer(res);
      });
    }
  }, [lawyerId]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { urgencyLevel: 'MEDIUM' },
  });

  const handleStep1Submit = async (_data: RequestFormData) => {
    setCurrentStep(1);
  };

  const handleProceedToPayment = () => setCurrentStep(2);

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    try {
      const formValues = getValues();
      const request = await legalAidService.createRequest({
        ...formValues,
        lawyerId,
        documents: [],
      });

      await paymentService.processDemoPayment(request.id, 500, selectedPaymentMethod, payerMobile || '01700-000000');
      await legalAidService.updateRequestStatus(request.id, 'PAYMENT_CONFIRMED', 'পেমেন্ট গেটওয়ে');

      setTrackingNumber(request.trackingNumber);
      setCurrentStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTrackingNumber = () => {
    navigator.clipboard.writeText(trackingNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8 font-bangla">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#064E3B] to-[#0F172A] text-white p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl border border-emerald-600/30">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider font-sans">
          <Scale className="w-4 h-4" />
          <span>নেকী ফাউন্ডেশন আইনী সেল</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">বিনামূল্যে ও প্রাক-আইনী সহায়তা আবেদন ফর্ম</h1>
        <p className="text-emerald-200 text-xs font-sans">ধাপ {currentStep + 1} / {steps.length}: {steps[currentStep]}</p>
        <div className="flex gap-2 pt-2">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full transition-all duration-300 ${idx <= currentStep ? 'bg-amber-400' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      {/* Selected Lawyer notification if present */}
      {selectedLawyer && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-[#064E3B] font-sans">
          <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold font-heading text-sm text-slate-900">মনোনীত আইনজীবী: {selectedLawyer.fullName}</p>
            <p className="text-slate-600">{selectedLawyer.designation} • {selectedLawyer.district} জেলা</p>
          </div>
        </div>
      )}

      {/* Step 0: Request Details */}
      {currentStep === 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border-t-4 border-t-[#064E3B] shadow-xl">
          <form onSubmit={handleSubmit(handleStep1Submit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="আবেদনকারীর সম্পূর্ণ নাম" isRequired error={errors.beneficiaryName?.message} {...register('beneficiaryName')} placeholder="যেমন: মো. কামাল হোসেন" />
              <Input label="মোবাইল নম্বর" isRequired error={errors.beneficiaryMobile?.message} {...register('beneficiaryMobile')} placeholder="০১৭১১-XXXXXX" />
            </div>

            <Select
              label="আপনার জেলা নির্বাচন করুন (৬৪ জেলা)"
              isRequired error={errors.district?.message}
              options={[{ label: '— জেলা নির্বাচন করুন —', value: '' }, ...bangladeshDistricts.map((d) => ({ label: `${d.nameBn} (${d.divisionBn} বিভাগ)`, value: d.nameBn }))]}
              {...register('district')}
            />

            <Select
              label="আইনী বিষয় / বিরোধের ক্ষেত্র"
              isRequired error={errors.legalCategory?.message}
              options={[
                { label: '— বিষয় নির্বাচন করুন —', value: '' },
                { label: 'জমিজমা ও দেওয়ানী আইন', value: 'জমিজমা ও দেওয়ানী আইন' },
                { label: 'ফৌজদারী আইন ও জামিন', value: 'ফৌজদারী আইন ও জামিন' },
                { label: 'পারিবারিক ও ভরণপোষণ আইন', value: 'পারিবারিক ও ভরণপোষণ আইন' },
                { label: 'শ্রম অধিকার ও বকেয়া মজুরি', value: 'শ্রম অধিকার ও বকেয়া মজুরি' },
                { label: 'নারী ও শিশু নির্যাতন দমন', value: 'নারী ও শিশু নির্যাতন দমন' },
                { label: 'সাইবার অপরাধ ও হয়রানি', value: 'সাইবার অপরাধ ও হয়রানি' },
                { label: 'সাধারণ আইনী পরামর্শ', value: 'সাধারণ আইনী পরামর্শ' },
              ]}
              {...register('legalCategory')}
            />

            <Select
              label="জরুরীতার মাত্রা"
              options={[
                { label: 'সাধারণ — LOW (৭ দিনের মধ্যে পর্যালোচনা)', value: 'LOW' },
                { label: 'মধ্যম — MEDIUM (৩ দিনের মধ্যে পর্যালোচনা)', value: 'MEDIUM' },
                { label: 'জরুরি — HIGH (২৪ ঘণ্টার মধ্যে পর্যালোচনা)', value: 'HIGH' },
                { label: 'অতি জরুরি — EMERGENCY (তাত্ক্ষণিক হেল্পডেস্ক)', value: 'EMERGENCY' },
              ]}
              {...register('urgencyLevel')}
            />

            <Textarea
              label="মামলা বা আইনী সমস্যার সংক্ষিপ্ত বিবরণ"
              isRequired
              rows={5}
              error={errors.caseSummary?.message}
              placeholder="আপনার আইনী বিরোধের মূল কথা সংক্ষেপে লিখুন (কমপক্ষে ৩০ অক্ষর)... যাতে বিজ্ঞ আইনজীবী পর্যালোচনার প্রস্তুতি নিতে পারেন।"
              {...register('caseSummary')}
            />

            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>আপনার সব তথ্য ও বিবরণী সম্পূর্ণ গোপন থাকবে এবং কেবল দায়িত্বপ্রাপ্ত আইনজীবী পর্যালোচনা করবেন।</span>
            </div>

            <Button type="submit" isFullWidth variant="gold" size="lg" className="font-bold">
              পরবর্তী ধাপ: নথিপত্র সংযুক্তি
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      )}

      {/* Step 1: Documents */}
      {currentStep === 1 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border-t-4 border-t-[#064E3B] shadow-xl">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-xl font-bold font-heading text-slate-900">প্রয়োজনীয় নথিপত্র সংযুক্তি</h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">কাগজপত্র পরিষ্কারভাবে ছবি তুলে বা স্ক্যান করে আপলোড করুন (ঐচ্ছিক হলেও সহায়ক)।</p>
          </div>
          <FileUpload label="জাতীয় পরিচয়পত্র (NID) বা জন্মসনদ" />
          <FileUpload label="সচ্ছলতার সনদ / চেয়ারম্যানের প্রত্যয়নপত্র (ফি মওকুফের জন্য)" />
          <FileUpload label="মামলা সংক্রান্ত প্রাথমিক নথিপত্র / জমিজমার খতিয়ান / দলিলের কপি" />
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setCurrentStep(0)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী ধাপ
            </Button>
            <Button variant="gold" onClick={handleProceedToPayment} className="font-bold">
              পরবর্তী: ফি যাচাই ও নিষ্পত্তি <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Payment / Fee Waiver */}
      {currentStep === 2 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border-t-4 border-t-[#064E3B] shadow-xl">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-sans">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ফাউন্ডেশন ফি পলিসি ও ১০০% মওকুফ সুবিধা:
            </p>
            <p className="text-slate-600">
              দরিদ্র ও অসচ্ছল পরিবারের জন্য ১০০% ফি মওকুফ করা হয়। ডেমো সিস্টেমে সিমুলেশনের সুবিধার্থে নামমাত্র প্রসেসিং ফি দেখানো হচ্ছে — কোনো প্রকৃত টাকা কাটা হবে না।
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5 space-y-3 text-sm font-sans bg-white">
            <h3 className="font-bold text-slate-900 font-heading">ফি ও খরচের বিবরণী</h3>
            <div className="flex justify-between text-slate-700"><span>ফাউন্ডেশন প্রসেসিং ফি:</span><span>৫০০.০০ ৳</span></div>
            <div className="flex justify-between text-slate-500 text-xs"><span>ডিজিটাল সিস্টেম চার্জ:</span><span>১৫.০০ ৳</span></div>
            <div className="flex justify-between font-extrabold text-base text-slate-900 border-t border-slate-100 pt-2 font-heading"><span>মোট প্রদেয় (সিমুলেশন):</span><span className="text-[#064E3B]">৫১৫.০০ ৳</span></div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-700 font-sans uppercase tracking-wider">পেমেন্ট গেটওয়ে নির্বাচন করুন:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['BKASH', 'NAGAD', 'CARD', 'BANK_TRANSFER'] as const).map((method) => (
                <label key={method} className={`cursor-pointer border-2 rounded-2xl p-3 text-center text-xs font-extrabold transition-all ${selectedPaymentMethod === method ? 'border-[#064E3B] bg-emerald-50 text-[#064E3B] shadow-xs' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  <input type="radio" className="sr-only" value={method} checked={selectedPaymentMethod === method} onChange={() => setSelectedPaymentMethod(method)} />
                  {method === 'BKASH' ? '🟣 বিকাশ' : method === 'NAGAD' ? '🟠 নগদ' : method === 'CARD' ? '💳 কার্ড' : '🏦 ব্যাংক'}
                </label>
              ))}
            </div>
          </div>

          <Input
            label="বিকাশ / নগদ মোবাইল নম্বর"
            placeholder="০১৭১১-XXXXXX"
            value={payerMobile}
            onChange={(e) => setPayerMobile(e.target.value)}
          />

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী
            </Button>
            <Button variant="gold" isLoading={isLoading} onClick={handlePaymentSubmit} className="font-bold">
              আবেদন দাখিল করুন (সিমুলেশন)
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success Confirmation */}
      {currentStep === 3 && (
        <div className="glass-card rounded-3xl p-8 space-y-6 text-center border-t-4 border-t-[#064E3B] shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-[#064E3B] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে!</h2>
          <p className="text-xs text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
            আপনার আবেদনটি আমাদের প্যানেল আইনজীবী ও অ্যাডমিন টিমের কাছে পৌঁছে গেছে। দ্রুততম সময়ে আপনার প্যানেল আইনজীবী আপডেট ও কেস পরামর্শ দেওয়া হবে।
          </p>

          <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-300 inline-block text-center space-y-2 shadow-xs">
            <p className="text-xs font-bold text-slate-500 font-sans uppercase">আপনার ট্র্যাকিং নম্বর:</p>
            <p className="text-2xl font-black text-[#064E3B] font-mono tracking-wider">{trackingNumber}</p>
            <button
              onClick={handleCopyTrackingNumber}
              className="text-xs font-bold text-slate-600 hover:text-[#064E3B] flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              {isCopied ? 'কপি হয়েছে!' : 'নম্বর কপি করুন'}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> প্রিন্ট স্লিপ
            </Button>
            <Button variant="gold" onClick={() => navigate('/beneficiary/dashboard')}>
              ড্যাশবোর্ডে দেখুন
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
