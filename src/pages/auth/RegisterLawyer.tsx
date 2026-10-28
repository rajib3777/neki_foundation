import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { lawyerService } from '../../services/lawyer.service';
import { authService } from '../../services/auth.service';
import { bangladeshDistricts } from '../../config/districts.config';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { Check } from 'lucide-react';

const steps = ['ব্যক্তিগত তথ্য', 'পেশাগত তথ্য', 'বার তথ্য', 'জেলা ও কর্মস্থল', 'নথিপত্র', 'রিভিউ ও জমা'];

const personalSchema = z.object({
  fullName: z.string().min(3, 'সম্পূর্ণ নাম লিখুন'),
  email: z.string().email('সঠিক ইমেইল লিখুন'),
  mobile: z.string().min(11, 'সঠিক মোবাইল নম্বর লিখুন'),
  password: z.string().min(8, 'পাসওয়ার্ড সর্বনিম্ন ৮ অক্ষর'),
});
type PersonalData = z.infer<typeof personalSchema>;

export const RegisterLawyer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const personalForm = useForm<PersonalData>({ resolver: zodResolver(personalSchema) });

  // Simple text field state for subsequent steps
  const [step2, setStep2] = useState({ designation: '', yearsOfExperience: '', practiceAreas: '', bio: '' });
  const [step3, setStep3] = useState({ barAssociation: '', enrollmentNumber: '', enrollmentYear: '' });
  const [step4, setStep4] = useState({ district: '', upazila: '', chamberAddress: '' });

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await personalForm.trigger();
      if (!valid) return;
      setFormData((prev) => ({ ...prev, ...personalForm.getValues() }));
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        ...formData,
        ...step2,
        ...step3,
        ...step4,
        yearsOfExperience: Number(step2.yearsOfExperience) || 1,
        enrollmentYear: Number(step3.enrollmentYear) || 2020,
        practiceAreas: step2.practiceAreas.split('،').map((s) => s.trim()).filter(Boolean) || ['আইনী পরামর্শ'],
      };
      await lawyerService.registerLawyerApplication(applicationData);
      await authService.switchRole('LAWYER');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 font-bangla">আবেদন সফলভাবে জমা হয়েছে!</h2>
          <p className="text-sm text-gray-600 font-bangla">
            আপনার আইনজীবী নিবন্ধনের আবেদন ফাউন্ডেশনের পর্যালোচনা কমিটির কাছে পাঠানো হয়েছে। যাচাইকরণের পর আপনাকে অবহিত করা হবে।
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/lawyer/dashboard')}>আমার ড্যাশবোর্ডে যান</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-bangla">আইনজীবী প্যানেল নিবন্ধন</h2>
        <p className="text-xs text-gray-500 font-bangla mt-1">ধাপ {currentStep + 1} / {steps.length}: {steps[currentStep]}</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex gap-1">
        {steps.map((_, idx) => (
          <div key={idx} className={`h-1.5 flex-1 rounded-full transition-all ${idx <= currentStep ? 'bg-[#1B4D3E]' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* Step Contents */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <Input label="সম্পূর্ণ নাম" isRequired placeholder="আপনার পুরো আইনি নাম" error={personalForm.formState.errors.fullName?.message} {...personalForm.register('fullName')} />
          <Input label="ইমেইল" type="email" isRequired placeholder="you@example.com" error={personalForm.formState.errors.email?.message} {...personalForm.register('email')} />
          <Input label="মোবাইল" isRequired placeholder="01700-000000" error={personalForm.formState.errors.mobile?.message} {...personalForm.register('mobile')} />
          <Input label="পাসওয়ার্ড" type="password" isRequired placeholder="সর্বনিম্ন ৮ অক্ষর" error={personalForm.formState.errors.password?.message} {...personalForm.register('password')} />
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          <Input label="পেশাগত পদবী" isRequired value={step2.designation} onChange={(e) => setStep2((p) => ({ ...p, designation: e.target.value }))} placeholder="এডভোকেট / সিনিয়র এডভোকেট" />
          <Input label="অভিজ্ঞতার বছর" type="number" isRequired value={step2.yearsOfExperience} onChange={(e) => setStep2((p) => ({ ...p, yearsOfExperience: e.target.value }))} placeholder="যেমন: ৫" />
          <Textarea label="বিশেষজ্ঞতার ক্ষেত্র (কমা দিয়ে আলাদা করুন)" isRequired value={step2.practiceAreas} onChange={(e) => setStep2((p) => ({ ...p, practiceAreas: e.target.value }))} placeholder="যেমন: ফৌজদারী আইন، পারিবারিক আইন" rows={3} />
          <Textarea label="সংক্ষিপ্ত পেশাগত পরিচিতি" value={step2.bio} onChange={(e) => setStep2((p) => ({ ...p, bio: e.target.value }))} rows={4} />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <Input label="বার অ্যাসোসিয়েশন" isRequired value={step3.barAssociation} onChange={(e) => setStep3((p) => ({ ...p, barAssociation: e.target.value }))} placeholder="যেমন: ঢাকা জেলা বার অ্যাসোসিয়েশন" />
          <Input label="এনরোলমেন্ট নম্বর" isRequired value={step3.enrollmentNumber} onChange={(e) => setStep3((p) => ({ ...p, enrollmentNumber: e.target.value }))} placeholder="যেমন: DBA/2016/XXXX" />
          <Input label="এনরোলমেন্টের বছর" type="number" isRequired value={step3.enrollmentYear} onChange={(e) => setStep3((p) => ({ ...p, enrollmentYear: e.target.value }))} placeholder="যেমন: ২০১৬" />
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <Select
            label="জেলা" isRequired
            value={step4.district}
            onChange={(e) => setStep4((p) => ({ ...p, district: e.target.value }))}
            options={[{ label: '— জেলা নির্বাচন করুন —', value: '' }, ...bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))]}
          />
          <Input label="উপজেলা" value={step4.upazila} onChange={(e) => setStep4((p) => ({ ...p, upazila: e.target.value }))} placeholder="উপজেলার নাম লিখুন" />
          <Textarea label="চেম্বার / কর্মস্থলের ঠিকানা" value={step4.chamberAddress} onChange={(e) => setStep4((p) => ({ ...p, chamberAddress: e.target.value }))} rows={3} />
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <FileUpload label="বার সনদপত্র আপলোড করুন" helperText="PDF বা JPG (সর্বোচ্চ ১০ MB)" />
          <FileUpload label="জাতীয় পরিচয়পত্র (উভয় পাশ)" helperText="JPG বা PNG (সর্বোচ্চ ৫ MB)" />
          <FileUpload label="সহায়ক নথিপত্র (ঐচ্ছিক)" helperText="PDF বা ছবি, সর্বোচ্চ ১০ MB" />
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="bg-[#E6F2EE] border border-emerald-200 rounded-lg p-4 space-y-3 text-sm font-bangla">
            <h3 className="font-bold text-gray-900">আবেদনের সারসংক্ষেপ পর্যালোচনা করুন</h3>
            <p className="text-gray-700">নাম: <strong>{personalForm.getValues('fullName') || '(খালি)'}</strong></p>
            <p className="text-gray-700">পদবী: <strong>{step2.designation || '(খালি)'}</strong></p>
            <p className="text-gray-700">বার: <strong>{step3.barAssociation || '(খালি)'}</strong></p>
            <p className="text-gray-700">জেলা: <strong>{step4.district || '(খালি)'}</strong></p>
          </div>
          <p className="text-xs text-gray-500 font-bangla">আবেদন জমা দেওয়ার পর ফাউন্ডেশনের যাচাই কমিটি সকল নথি পর্যালোচনা করবে। অনুমোদন ২-৫ কার্যদিবসের মধ্যে সম্পন্ন হয়।</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-100">
        {currentStep > 0 ? (
          <Button variant="outline" onClick={handleBack}>পূর্ববর্তী ধাপ</Button>
        ) : (
          <Link to="/auth/login" className="text-xs text-gray-500 hover:text-gray-700 flex items-center">ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন</Link>
        )}

        {currentStep < steps.length - 1 ? (
          <Button variant="primary" onClick={handleNext}>পরবর্তী ধাপ →</Button>
        ) : (
          <Button variant="primary" isLoading={isSubmitting} onClick={handleFinalSubmit}>
            আবেদন চূড়ান্তভাবে জমা দিন
          </Button>
        )}
      </div>
    </div>
  );
};
