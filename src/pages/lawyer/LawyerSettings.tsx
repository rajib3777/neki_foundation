import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { 
  Settings, 
  Lock, 
  Bell, 
  Eye, 
  CheckCircle2, 
  Save, 
  ShieldCheck, 
  Smartphone
} from 'lucide-react';

export const LawyerSettings: React.FC = () => {
  const [isVisibleInDirectory, setIsVisibleInDirectory] = useState(true);
  const [isAcceptingNewCases, setIsAcceptingNewCases] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [hearingReminderDays, setHearingReminderDays] = useState('3');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('নতুন পাসওয়ার্ড মিলছে না!');
      return;
    }
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আইনজীবী অ্যাকাউন্ট ও নোটিফিকেশন সেটিংস</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            পাবলিক দৃশ্যমানতা, কেস অ্যালার্ট এবং নিরাপত্তা সেটিংস পরিচালনা করুন
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>অ্যাকাউন্ট স্ট্যাটাস: নিরাপদ ও সক্রিয়</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. VISIBILITY & WORKFLOW SETTINGS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Eye className="w-5 h-5 text-[#064E3B]" />
            <h3 className="text-base font-bold font-heading text-slate-900">প্ল্যাটফর্ম দৃশ্যমানতা ও কার্যপ্রবাহ</h3>
          </div>

          <form onSubmit={handleGeneralSave} className="space-y-5 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">৬৪ জেলার পাবলিক ডিরেক্টরিতে দৃশ্যমানতা</h4>
                  <p className="text-xs text-slate-500">চালু থাকলে দর্শনার্থী ও সেবাগ্রহীতারা আপনার প্রোফাইল দেখতে পাবেন</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVisibleInDirectory(!isVisibleInDirectory)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isVisibleInDirectory ? 'bg-[#064E3B]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isVisibleInDirectory ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="h-px bg-slate-200" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">নতুন আইনী সহায়তা আবেদন গ্রহণ</h4>
                  <p className="text-xs text-slate-500">ব্যস্ততার কারণে সাময়িক সময়ের জন্য নতুন ক্লায়েন্ট অনুরোধ বন্ধ রাখতে পারেন</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAcceptingNewCases(!isAcceptingNewCases)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isAcceptingNewCases ? 'bg-[#064E3B]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAcceptingNewCases ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-slate-900">স্বয়ংক্রিয় নোটিফিকেশন নিয়ন্ত্রণ</h4>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#064E3B]"
                  />
                  <span>নতুন ক্লায়েন্ট আবেদন আসলে তাৎক্ষণিক মোবাইল এসএমএস অ্যালার্ট পাঠান</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#064E3B]"
                  />
                  <span>সাপ্তাহিক কেস সামারি ও শুনানির তালিকা ইমেইলে পাঠান</span>
                </label>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {saveSuccess && (
                <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সেটিংস সংরক্ষিত হয়েছে!</span>
                </span>
              )}
              <Button type="submit" variant="primary" size="sm" className="gap-1.5 ml-auto">
                <Save className="w-3.5 h-3.5" />
                <span>সেটিংস সংরক্ষণ</span>
              </Button>
            </div>
          </form>
        </div>

        {/* 2. PASSWORD & SECURITY */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Lock className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold font-heading text-slate-900">পাসওয়ার্ড ও অ্যাকাউন্ট নিরাপত্তা</h3>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4 text-xs sm:text-sm">
            <Input
              label="বর্তমান পাসওয়ার্ড *"
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />

            <Input
              label="নতুন পাসওয়ার্ড (সর্বনিম্ন ৮ অক্ষর) *"
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />

            <Input
              label="নতুন পাসওয়ার্ড নিশ্চিত করুন *"
              type="password"
              required
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            />

            <div className="pt-2 flex items-center justify-between">
              {passwordSuccess && (
                <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</span>
                </span>
              )}
              <Button type="submit" variant="primary" size="sm" className="gap-1.5 ml-auto">
                <Lock className="w-3.5 h-3.5" />
                <span>পাসওয়ার্ড পরিবর্তন করুন</span>
              </Button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
