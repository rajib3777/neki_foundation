import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { legalAidService } from '../../services/legalAid.service';
import { paymentService } from '../../services/payment.service';
import { bangladeshDistricts } from '../../config/districts.config';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { ShieldAlert, CheckCircle2, ArrowRight, ArrowLeft, Copy, Printer } from 'lucide-react';
import type { PaymentMethod } from '../../types';

const steps = ['আবেদনের বিবরণ', 'নথিপত্র সংযুক্তি', 'ফি পরিশোধ (ডেমো)', 'নিশ্চায়ন'];

const requestSchema = z.object({
  beneficiaryName: z.string().min(3, 'নাম লিখুন'),
  beneficiaryMobile: z.string().min(11, 'মোবাইল নম্বর লিখুন'),
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

  const [searchParams] = useSearchParams();
  const lawyerId = searchParams.get('lawyerId') || undefined;
  const navigate = useNavigate();

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8 font-bangla">
      
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl border border-amber-500/40">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">আইনী সহায়তার আবেদন ফর্ম</h1>
        <p className="text-amber-300 text-xs font-sans">ধাপ {currentStep + 1} / {steps.length}: {steps[currentStep]}</p>
        <div className="flex gap-1.5 pt-2">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full transition-all duration-300 ${idx <= currentStep ? 'bg-[#D97706]' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-4 bg-amber-100/70 border border-amber-300 rounded-2xl text-xs text-amber-900 font-sans shadow-2xs">
        <ShieldAlert className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
        <p>ডেমো পরিবেশ — এটি একটি নমুনা প্রসেসিং ফর্ম। কোনো প্রকৃত অর্থ কাটা হচ্ছে না।</p>
      </div>

      {/* Step 0: Request Details */}
      {currentStep === 0 && (
        <div className="glass-card rounded-3xl p-8 space-y-6 border-t-4 border-t-[#D97706] shadow-xl">
          <form onSubmit={handleSubmit(handleStep1Submit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="আবেদনকারীর সম্পূর্ণ নাম" isRequired error={errors.beneficiaryName?.message} {...register('beneficiaryName')} placeholder="আপনার পুরো নাম" />
              <Input label="মোবাইল নম্বর" isRequired error={errors.beneficiaryMobile?.message} {...register('beneficiaryMobile')} placeholder="01700-000000" />
            </div>

            <Select
              label="আপনার জেলা নির্বাচন করুন (৬৪ জেলা)"
              isRequired error={errors.district?.message}
              options={[{ label: '— জেলা নির্বাচন করুন —', value: '' }, ...bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))]}
              {...register('district')}
            />

            <Select
              label="আইনী বিষয়/ক্যাটাগরি"
              isRequired error={errors.legalCategory?.message}
              options={[
                { label: '— বিষয় নির্বাচন করুন —', value: '' },
                { label: 'পারিবারিক ও ভরণপোষণ আইন', value: 'পারিবারিক ও ভরণপোষণ আইন' },
                { label: 'জমিজমা ও দেওয়ানী আইন', value: 'জমিজমা ও দেওয়ানী আইন' },
                { label: 'ফৌজদারী আইন ও জামিন', value: 'ফৌজদারী আইন ও জামিন' },
                { label: 'শ্রম অধিকার ও চুক্তি', value: 'শ্রম অধিকার ও চুক্তি' },
                { label: 'নারী ও শিশু নির্যাতন দমন', value: 'নারী ও শিশু নির্যাতন দমন' },
                { label: 'সাধারণ আইনী পরামর্শ', value: 'সাধারণ আইনী পরামর্শ' },
              ]}
              {...register('legalCategory')}
            />

            <Select
              label="জরুরীতার মাত্রা"
              options={[
                { label: 'সাধারণ — LOW', value: 'LOW' },
                { label: 'মধ্যম — MEDIUM', value: 'MEDIUM' },
                { label: 'জরুরি — HIGH', value: 'HIGH' },
                { label: 'অতি জরুরি — EMERGENCY', value: 'EMERGENCY' },
              ]}
              {...register('urgencyLevel')}
            />

            <Textarea
              label="মামলার সংক্ষিপ্ত বিবরণ"
              isRequired
              rows={5}
              error={errors.caseSummary?.message}
              placeholder="আপনার সমস্যার সংক্ষিপ্ত বিবরণ দিন (সর্বনিম্ন ৩০ অক্ষর)..."
              {...register('caseSummary')}
            />

            <Button type="submit" isFullWidth variant="gold" size="lg">
              পরবর্তী ধাপ: নথিপত্র সংযুক্তি
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      )}

      {/* Step 1: Documents */}
      {currentStep === 1 && (
        <div className="glass-card rounded-3xl p-8 space-y-6 border-t-4 border-t-[#D97706] shadow-xl">
          <h3 className="text-xl font-bold font-heading text-gray-900 border-b border-amber-500/20 pb-3">প্রয়োজনীয় নথিপত্র সংযুক্তি</h3>
          <FileUpload label="জাতীয় পরিচয়পত্র (NID) বা জন্মসনদ" />
          <FileUpload label="সচ্ছলতার সনদ (ইউনিয়ন পরিষদ / পৌরসভা)" />
          <FileUpload label="মামলা সংক্রান্ত প্রাথমিক কাগজপত্র (ঐচ্ছিক)" />
          <div className="flex justify-between pt-4 border-t border-amber-500/20">
            <Button variant="outline" onClick={() => setCurrentStep(0)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী ধাপ
            </Button>
            <Button variant="gold" onClick={handleProceedToPayment}>
              পরবর্তী: ফি পরিশোধ <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && (
        <div className="glass-card rounded-3xl p-8 space-y-6 border-t-4 border-t-[#D97706] shadow-xl">
          <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-2xl text-center">
            <p className="text-xs font-bold text-amber-900 font-sans">
              ⚠️ ডেমো চেকআউট — প্রকৃত কোনো অর্থ কাটা হবে না।
            </p>
          </div>

          <div className="border border-amber-500/20 rounded-2xl p-5 space-y-3 text-sm font-sans bg-white/70">
            <h3 className="font-bold text-gray-900 font-heading">ফি ও খরচের বিবরণী</h3>
            <div className="flex justify-between text-gray-700"><span>ফাউন্ডেশন প্রসেসিং ফি:</span><span>৫০০.০০ ৳</span></div>
            <div className="flex justify-between text-gray-500 text-xs"><span>ডিজিটাল গেটওয়ে চার্জ:</span><span>১৫.০০ ৳</span></div>
            <div className="flex justify-between font-extrabold text-base text-gray-900 border-t border-amber-500/20 pt-2 font-heading"><span>মোট পরিশোধযোগ্য:</span><span className="text-[#D97706]">৫১৫.০০ ৳</span></div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">পেমেন্ট পদ্ধতি নির্বাচন করুন:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['BKASH', 'NAGAD', 'CARD', 'BANK_TRANSFER'] as const).map((method) => (
                <label key={method} className={`cursor-pointer border-2 rounded-2xl p-3 text-center text-xs font-extrabold transition-all ${selectedPaymentMethod === method ? 'border-[#D97706] bg-amber-100/60 text-[#D97706] shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <input type="radio" className="sr-only" value={method} checked={selectedPaymentMethod === method} onChange={() => setSelectedPaymentMethod(method)} />
                  {method === 'BKASH' ? '🟣 bKash' : method === 'NAGAD' ? '🟠 Nagad' : method === 'CARD' ? '💳 Card' : '🏦 Bank'}
                </label>
              ))}
            </div>
          </div>

          <Input
            label="পেমেন্টকৃত মোবাইল নম্বর"
            placeholder="01700-000000"
            value={payerMobile}
            onChange={(e) => setPayerMobile(e.target.value)}
          />

          <div className="flex justify-between pt-4 border-t border-amber-500/20">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী
            </Button>
            <Button variant="gold" isLoading={isLoading} onClick={handlePaymentSubmit}>
              পেমেন্ট নিশ্চিত করুন (ডেমো)
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success Confirmation */}
      {currentStep === 3 && (
        <div className="glass-card rounded-3xl p-8 space-y-6 text-center border-t-4 border-t-[#D97706] shadow-xl">
          <div className="w-16 h-16 bg-amber-100 text-[#D97706] rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-gray-900">আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে!</h2>
          <p className="text-xs text-gray-600 font-sans max-w-md mx-auto">
            আপনার আবেদনটি আমাদের প্যানেল আইনজীবী ও অ্যাডমিন টিমের কাছে পৌঁছে গেছে। দ্রুততম সময়ে আপনার প্যানেল আইনজীবী আপডেট দেওয়া হবে।
          </p>

          <div className="p-5 bg-white rounded-2xl border border-amber-400/40 inline-block text-center space-y-2 shadow-sm">
            <p className="text-xs font-bold text-gray-500 font-sans uppercase">আপনার ট্র্যাকিং নম্বর:</p>
            <p className="text-2xl font-black text-[#D97706] font-mono tracking-wider">{trackingNumber}</p>
            <button
              onClick={handleCopyTrackingNumber}
              className="text-xs font-bold text-gray-600 hover:text-[#D97706] flex items-center justify-center gap-1 mx-auto"
            >
              <Copy className="w-3.5 h-3.5" />
              {isCopied ? 'কপি হয়েছে!' : 'কপি করুন'}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-amber-500/20">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> প্রিন্ট করুন
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
