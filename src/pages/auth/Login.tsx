import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/auth.service';
import type { UserRole } from '../../types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ShieldAlert } from 'lucide-react';

const loginSchema = z.object({
  emailOrMobile: z.string().min(1, 'ইমেইল বা মোবাইল নম্বর লিখুন'),
  password: z.string().min(1, 'পাসওয়ার্ড লিখুন'),
  role: z.enum(['BENEFICIARY', 'LAWYER', 'ADMIN']),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: 'BENEFICIARY' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError('');
      await authService.login(data.emailOrMobile, data.password, data.role as UserRole);
      if (data.role === 'BENEFICIARY') navigate('/beneficiary/dashboard');
      else if (data.role === 'LAWYER') navigate('/lawyer/dashboard');
      else if (data.role === 'ADMIN') navigate('/admin/dashboard');
    } catch {
      setSubmitError('লগইন সম্পন্ন হয়নি। পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 font-bangla">আপনার অ্যাকাউন্টে লগইন করুন</h2>
        <p className="mt-1 text-xs text-gray-500 font-bangla">নেকী ফাউন্ডেশন পোর্টালে স্বাগতম</p>
      </div>

      {/* Demo Notice */}
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-bangla">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
        <p>ডেমো পরিবেশ: যেকোনো ইমেইল ও পাসওয়ার্ড দিয়ে নির্বাচিত ভূমিকায় লগইন করা যাবে।</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Role Selector */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 font-bangla">অ্যাকাউন্টের ধরন নির্বাচন করুন</label>
          <div className="grid grid-cols-3 gap-2">
            {(['BENEFICIARY', 'LAWYER', 'ADMIN'] as const).map((role) => (
              <label key={role} className="relative cursor-pointer">
                <input type="radio" value={role} {...register('role')} className="sr-only peer" />
                <div className="p-2.5 border-2 rounded-lg text-center text-xs font-semibold font-bangla transition-all peer-checked:border-[#1B4D3E] peer-checked:bg-[#E6F2EE] peer-checked:text-[#1B4D3E] border-gray-200 text-gray-600 hover:border-gray-300">
                  {role === 'BENEFICIARY' ? 'সেবাগ্রহীতা' : role === 'LAWYER' ? 'আইনজীবী' : 'এডমিন'}
                </div>
              </label>
            ))}
          </div>
        </div>

        <Input
          label="ইমেইল বা মোবাইল নম্বর"
          type="text"
          isRequired
          placeholder="email@example.com অথবা 01700-000000"
          error={errors.emailOrMobile?.message}
          {...register('emailOrMobile')}
        />

        <Input
          label="পাসওয়ার্ড"
          type="password"
          isRequired
          placeholder="আপনার পাসওয়ার্ড লিখুন"
          error={errors.password?.message}
          {...register('password')}
        />

        {submitError && (
          <p className="text-xs text-red-600 font-bangla font-medium bg-red-50 p-2 rounded border border-red-200">
            {submitError}
          </p>
        )}

        <Button type="submit" isFullWidth variant="primary" size="lg" isLoading={isSubmitting}>
          লগইন করুন
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500 space-y-2">
        <p className="font-bangla">
          অ্যাকাউন্ট নেই?{' '}
          <Link to="/auth/register/beneficiary" className="font-bold text-[#1B4D3E] hover:underline">
            সেবাগ্রহীতা হিসেবে নিবন্ধন করুন
          </Link>
        </p>
        <p className="font-bangla">
          আইনজীবী?{' '}
          <Link to="/auth/register/lawyer" className="font-bold text-[#D97706] hover:underline">
            আইনজীবী প্যানেলে যোগ দিন
          </Link>
        </p>
      </div>
    </div>
  );
};
