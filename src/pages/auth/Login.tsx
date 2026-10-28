import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/auth.service';
import type { UserRole } from '../../types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';

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
      setSubmitError('লগইন সম্পন্ন হয়নি। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-heading">আপনার অ্যাকাউন্টে লগইন করুন</h2>
        <p className="mt-1.5 text-sm text-slate-600 font-bangla">নেকী ফাউন্ডেশন আইনী সেবা ও কল্যাণ পোর্টালে স্বাগতম</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Role Selector */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-800 font-bangla tracking-wide">
            অ্যাকাউন্টের ধরন নির্বাচন করুন
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(['BENEFICIARY', 'LAWYER', 'ADMIN'] as const).map((role) => (
              <label key={role} className="relative cursor-pointer">
                <input type="radio" value={role} {...register('role')} className="sr-only peer" />
                <div className="py-2.5 px-2 border-2 rounded-xl text-center text-xs sm:text-sm font-bold font-bangla transition-all 
                  peer-checked:border-[#064E3B] peer-checked:bg-emerald-50/90 peer-checked:text-[#064E3B] peer-checked:shadow-sm
                  border-slate-200 text-slate-700 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300">
                  {role === 'BENEFICIARY' ? 'সেবাগ্রহীতা' : role === 'LAWYER' ? 'আইনজীবী' : 'এডমিন'}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <Input
          label="ইমেইল বা মোবাইল নম্বর"
          type="text"
          isRequired
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          placeholder="email@example.com অথবা 01700-000000"
          error={errors.emailOrMobile?.message}
          {...register('emailOrMobile')}
        />

        <Input
          label="পাসওয়ার্ড"
          type="password"
          isRequired
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          placeholder="আপনার গোপন পাসওয়ার্ড লিখুন"
          error={errors.password?.message}
          {...register('password')}
        />

        {submitError && (
          <p className="text-xs text-red-700 font-bangla font-semibold bg-red-50 p-3 rounded-xl border border-red-200 flex items-center gap-1.5">
            <span>⚠</span> {submitError}
          </p>
        )}

        <Button 
          type="submit" 
          isFullWidth 
          variant="primary" 
          size="lg" 
          isLoading={isSubmitting}
          className="shadow-md hover:shadow-emerald-900/20"
        >
          <LogIn className="w-4 h-4 mr-2" />
          লগইন করুন
        </Button>
      </form>

      {/* Registration & Assistance Links */}
      <div className="text-center text-xs sm:text-sm text-slate-600 font-bangla space-y-2 pt-3 border-t border-slate-100">
        <p>
          নতুন ব্যবহারকারী?{' '}
          <Link to="/auth/register/beneficiary" className="font-bold text-[#064E3B] hover:text-[#047857] hover:underline ml-1">
            সেবাগ্রহীতা হিসেবে নিবন্ধন করুন
          </Link>
        </p>
        <p>
          বিজ্ঞ আইনজীবী?{' '}
          <Link to="/auth/register/lawyer" className="font-bold text-[#D97706] hover:text-[#B45309] hover:underline ml-1">
            আইনজীবী প্যানেলে যোগ দিন
          </Link>
        </p>
      </div>
    </div>
  );
};
