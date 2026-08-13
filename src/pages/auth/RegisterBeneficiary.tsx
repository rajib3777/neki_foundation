import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/auth.service';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { bangladeshDistricts } from '../../config/districts.config';
import { ShieldAlert } from 'lucide-react';

const beneficiarySchema = z.object({
  fullName: z.string().min(3, 'সম্পূর্ণ নাম সর্বনিম্ন ৩ অক্ষরের হতে হবে'),
  email: z.string().email('সঠিক ইমেইল ঠিকানা লিখুন'),
  mobile: z.string().min(11, 'সঠিক মোবাইল নম্বর লিখুন'),
  password: z.string().min(8, 'পাসওয়ার্ড সর্বনিম্ন ৮ অক্ষরের হতে হবে'),
  confirmPassword: z.string(),
  district: z.string().min(1, 'জেলা নির্বাচন করুন'),
  consent: z.boolean().refine((v) => v === true, 'ব্যবহারের শর্তাবলীতে সম্মতি প্রদান বাধ্যতামূলক'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'পাসওয়ার্ড মিলছে না',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof beneficiarySchema>;

export const RegisterBeneficiary: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(beneficiarySchema),
  });

  const onSubmit = async (_data: FormData) => {
    await authService.switchRole('BENEFICIARY');
    navigate('/beneficiary/dashboard');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-bangla">সেবাগ্রহীতা নিবন্ধন</h2>
        <p className="mt-1 text-xs text-gray-500 font-bangla">আইনী সহায়তার জন্য অ্যাকাউন্ট তৈরি করুন</p>
      </div>

      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-bangla">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
        <p>ডেমো সিস্টেম — কোনো বাস্তব তথ্য জমা হচ্ছে না।</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="সম্পূর্ণ নাম" isRequired placeholder="আপনার পুরো নাম" error={errors.fullName?.message} {...register('fullName')} />
          <Input label="মোবাইল নম্বর" isRequired placeholder="01700-000000" error={errors.mobile?.message} {...register('mobile')} />
        </div>

        <Input label="ইমেইল" type="email" isRequired placeholder="you@example.com" error={errors.email?.message} {...register('email')} />

        <Select
          label="আপনার জেলা"
          isRequired
          error={errors.district?.message}
          options={[{ label: '— জেলা নির্বাচন করুন —', value: '' }, ...bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))]}
          {...register('district')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="পাসওয়ার্ড" type="password" isRequired placeholder="সর্বনিম্ন ৮ অক্ষর" error={errors.password?.message} {...register('password')} />
          <Input label="পাসওয়ার্ড নিশ্চিত করুন" type="password" isRequired placeholder="পুনরায় পাসওয়ার্ড লিখুন" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-700 font-bangla cursor-pointer">
          <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-[#1B4D3E]" {...register('consent')} />
          <span>আমি নেকী ফাউন্ডেশনের <Link to="/terms" className="text-[#1B4D3E] underline">ব্যবহারের শর্তাবলী</Link> ও <Link to="/privacy" className="text-[#1B4D3E] underline">গোপনীয়তা নীতি</Link> পড়েছি এবং সম্মত আছি।</span>
        </label>
        {errors.consent && <p className="text-xs text-red-600 font-bangla">{errors.consent.message}</p>}

        <Button type="submit" isFullWidth variant="primary" size="lg" isLoading={isSubmitting}>
          অ্যাকাউন্ট তৈরি করুন
        </Button>
      </form>

      <p className="text-center text-xs text-gray-500 font-bangla">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
        <Link to="/auth/login" className="font-bold text-[#1B4D3E] hover:underline">লগইন করুন</Link>
      </p>
    </div>
  );
};
