import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { bangladeshDistricts } from '../../config/districts.config';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Save, 
  Bell, 
  Lock
} from 'lucide-react';

export const BeneficiaryProfile: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'মোঃ রহিম উল্লাহ',
    fatherSpouseName: 'মোঃ আব্দুল খালেক',
    motherName: 'মোসাম্মৎ রহিমা খাতুন',
    nid: '1984471239000042',
    mobile: currentUser?.mobile || '01712-345678',
    email: currentUser?.email || 'rahim.ullah@neki.org',
    district: currentUser?.district || 'যশোর',
    upazila: currentUser?.upazila || 'ঝিকরগাছা',
    postOffice: 'গদখালী',
    village: 'বালুড়া',
    emergencyContactName: 'মোঃ ফারুক হোসেন',
    emergencyContactRelation: 'সহোদর ভাই',
    emergencyContactPhone: '01811-998877',
    smsNotifications: true,
    whatsappUpdates: true,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }, 600);
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">প্রোফাইল ও অ্যাকাউন্ট সেটিংস</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার ব্যক্তিগত তথ্য, বর্তমান যোগাযোগের ঠিকানা ও জরুরী যোগাযোগের নম্বর আপডেট রাখুন
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>যাচাইকৃত সেবাগ্রহীতা প্রোফাইল</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <UserIcon className="w-5 h-5 text-[#064E3B]" />
            <h3 className="text-base font-bold font-heading text-slate-900">ব্যক্তিগত পরিচয় ও তথ্যাবলী</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="সম্পূর্ণ নাম"
              isRequired
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="পিতা / স্বামীর নাম"
              value={formData.fatherSpouseName}
              onChange={(e) => setFormData({ ...formData, fatherSpouseName: e.target.value })}
            />

            <Input
              label="মাতার নাম"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
            />

            <Input
              label="জাতীয় পরিচয়পত্র (NID) নম্বর"
              isRequired
              value={formData.nid}
              onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
            />

            <Input
              label="মোবাইল নম্বর (যাচাইকৃত)"
              isRequired
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />

            <Input
              label="ইমেইল ঠিকানা"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Address Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-[#064E3B]" />
            <h3 className="text-base font-bold font-heading text-slate-900">ঠিকানা ও ভৌগোলিক তথ্য</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="জেলা"
              isRequired
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              options={bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))}
            />

            <Input
              label="উপজেলা / থানা"
              isRequired
              value={formData.upazila}
              onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
            />

            <Input
              label="ডাকঘর"
              value={formData.postOffice}
              onChange={(e) => setFormData({ ...formData, postOffice: e.target.value })}
            />

            <Input
              label="গ্রাম / এলাকা / বাড়ি নং"
              isRequired
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Phone className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold font-heading text-slate-900">জরুরি যোগাযোগের তথ্য (Emergency Contact)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="জরুরি ব্যক্তির নাম"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
            />

            <Input
              label="সম্পর্ক"
              value={formData.emergencyContactRelation}
              onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
            />

            <Input
              label="জরুরি মোবাইল নম্বর"
              value={formData.emergencyContactPhone}
              onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
            />
          </div>
        </div>

        {/* Notifications & Save Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.smsNotifications}
                onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                className="w-4 h-4 rounded text-[#064E3B] focus:ring-[#064E3B]"
              />
              <span>এসএমএস নোটিফিকেশন চালু রাখুন</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.whatsappUpdates}
                onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
                className="w-4 h-4 rounded text-[#064E3B] focus:ring-[#064E3B]"
              />
              <span>হোয়াটসঅ্যাপ আপডেট পাঠান</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>সফলভাবে সংরক্ষিত হয়েছে!</span>
              </span>
            )}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
              className="gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
};
