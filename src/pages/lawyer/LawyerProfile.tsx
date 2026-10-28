import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '../../types';
import { lawyerService } from '../../services/lawyer.service';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { bangladeshDistricts } from '../../config/districts.config';
import { imageConfig } from '../../config/image.config';
import { 
  UserCheck, 
  Award, 
  MapPin, 
  Briefcase, 
  Save, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Languages,
  DollarSign
} from 'lucide-react';

export const LawyerProfile: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
    designation: 'সিনিয়র আইনজীবী (হাইকোর্ট ও জেলা বার)',
    barAssociation: 'যশোর জেলা ও দায়রা জজ আদালত বার এসোসিয়েশন',
    enrollmentNumber: '১৫৮২/২০০৮',
    enrollmentYear: 2008,
    yearsOfExperience: 18,
    district: 'যশোর',
    upazila: 'ঝিকরগাছা',
    chamberAddress: 'চেম্বার: আইনজীবী ভবন, কোর্ট রোড, যশোর সদর, যশোর',
    languages: 'বাংলা, ইংরেজি',
    consultationHours: 'বিকাল ৪:০০ টা - রাত ৮:০০ টা (রবি - বৃহস্পতি)',
    consultationFee: '৫০০ ৳ (অসহায়দের জন্য ফাউন্ডেশন ফ্রি ভাউচার প্রযোজ্য)',
    bio: '২০০৮ সাল থেকে বাংলাদেশ বার কাউন্সিলের সনদপ্রাপ্ত হয়ে দেওয়ানী, ফৌজদারী ও পারিবারিক বিষয়ে সুনামের সাথে আইন পেশা পরিচালনা করে আসছি। প্রান্তিক ও অধিকারবঞ্চিত মানুষের ন্যায়বিচার প্রতিষ্ঠায় নেকী ফাউন্ডেশনের সাথে নিবেদিত।',
    practiceAreas: [
      'দেওয়ানি আইন',
      'ফৌজদারি মামলা ও জামিন',
      'পারিবারিক ও ভরণপোষণ আইন',
      'জমিজমা ও দলিল রেজিস্ট্রি',
    ],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const allPracticeAreas = [
    'দেওয়ানি আইন',
    'ফৌজদারি মামলা ও জামিন',
    'পারিবারিক ও ভরণপোষণ আইন',
    'জমিজমা ও দলিল রেজিস্ট্রি',
    'শ্রম ও কর্মসংস্থান আইন',
    'নারী ও শিশু নির্যাতন দমন',
    'সাইবার নিরাপত্তা ও আইসিটি',
    'কর, ভ্যাট ও কোম্পানি আইন',
  ];

  const togglePracticeArea = (area: string) => {
    if (formData.practiceAreas.includes(area)) {
      setFormData({
        ...formData,
        practiceAreas: formData.practiceAreas.filter((a) => a !== area),
      });
    } else {
      setFormData({
        ...formData,
        practiceAreas: [...formData.practiceAreas, area],
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await lawyerService.updateLawyerProfile('lawyer-demo-01', {
        fullName: formData.fullName,
        designation: formData.designation,
        barAssociation: formData.barAssociation,
        district: formData.district,
        chamberAddress: formData.chamberAddress,
        yearsOfExperience: Number(formData.yearsOfExperience),
        bio: formData.bio,
        practiceAreas: formData.practiceAreas,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আইনজীবী প্রোফাইল ও চেম্বার তথ্য</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার পেশাগত পরিচিতি, অভিজ্ঞতার বিবরণ ও চেম্বার যোগাযোগের তথ্য আপডেট রাখুন
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>প্যানেল প্রোফাইল সক্রিয় ও যাচাইকৃত</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Profile Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* 1. Bar Credentials Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold font-heading text-slate-900">বার কাউন্সিল ও পেশাগত সনদ</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <Input
                  label="আইনজীবীর পুরো নাম *"
                  isRequired
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />

                <Input
                  label="পেশাগত পদবী *"
                  isRequired
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />

                <Input
                  label="বার এসোসিয়েশনের নাম *"
                  isRequired
                  value={formData.barAssociation}
                  onChange={(e) => setFormData({ ...formData, barAssociation: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="বার সনদ নম্বর *"
                    isRequired
                    value={formData.enrollmentNumber}
                    onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                  />
                  <Input
                    label="সনদ লাভের বছর"
                    type="number"
                    value={String(formData.enrollmentYear)}
                    onChange={(e) => setFormData({ ...formData, enrollmentYear: Number(e.target.value) })}
                  />
                </div>

                <Input
                  label="মোট প্র্যাকটিস অভিজ্ঞতা (বছর)"
                  type="number"
                  value={String(formData.yearsOfExperience)}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                />

                <Select
                  label="প্রধান কর্মস্থল জেলা *"
                  isRequired
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  options={bangladeshDistricts.map((d) => ({ label: d.nameBn, value: d.nameBn }))}
                />
              </div>
            </div>

            {/* 2. Practice Areas Checklist Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase className="w-5 h-5 text-[#064E3B]" />
                <h3 className="text-base font-bold font-heading text-slate-900">বিশেষজ্ঞতার ক্ষেত্র (Practice Areas)</h3>
              </div>

              <p className="text-xs text-slate-500">যেসব আইনী বিষয়ে আপনি ক্লায়েন্টদের পরামর্শ ও আদালতে প্রতিনিধিত্ব করেন:</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {allPracticeAreas.map((area) => {
                  const isChecked = formData.practiceAreas.includes(area);
                  return (
                    <button
                      type="button"
                      key={area}
                      onClick={() => togglePracticeArea(area)}
                      className={`p-3 rounded-2xl text-xs font-bold text-left border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 border-[#064E3B] text-[#064E3B] shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{area}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Chamber & Bio Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold font-heading text-slate-900">চেম্বার ঠিকানা ও পরামর্শের সময়</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <Input
                  label="চেম্বার / অফিস ঠিকানা *"
                  isRequired
                  value={formData.chamberAddress}
                  onChange={(e) => setFormData({ ...formData, chamberAddress: e.target.value })}
                />

                <Input
                  label="পরামর্শের সময়সূচী"
                  value={formData.consultationHours}
                  onChange={(e) => setFormData({ ...formData, consultationHours: e.target.value })}
                />

                <Input
                  label="ভাষাগত দক্ষতা"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                />

                <Input
                  label="পরামর্শ ফি কাঠামো"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                />
              </div>

              <Textarea
                label="আইনজীবীর সংক্ষিপ্ত জীবনবৃত্তান্ত ও নীতিবোধ (Bio)"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
              <div>
                {saveSuccess && (
                  <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>প্রোফাইল সফলভাবে আপডেট করা হয়েছে!</span>
                  </span>
                )}
              </div>
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

          </form>
        </div>

        {/* RIGHT: Live Public Card Preview */}
        <div className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-3">
              পাবলিক ডিরেক্টরিতে আপনার প্রোফাইল প্রিভিউ:
            </span>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <img
                  src={imageConfig.getAvatarSvg(formData.fullName)}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl shadow-xs object-cover border border-slate-200"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    যাচাইকৃত আইনজীবী
                  </span>
                  <h3 className="text-base font-bold font-heading text-slate-900 truncate mt-1">
                    {formData.fullName}
                  </h3>
                  <p className="text-xs text-[#064E3B] font-semibold truncate">
                    {formData.designation}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {formData.bio}
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{formData.barAssociation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{formData.chamberAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>অভিজ্ঞতা: {formData.yearsOfExperience} বছর</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {formData.practiceAreas.map((area) => (
                  <span key={area} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                    {area}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <span className="block text-center text-xs text-emerald-800 font-bold bg-emerald-50 py-2 rounded-xl">
                  {formData.consultationFee}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
