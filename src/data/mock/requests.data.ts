// Mock Legal Aid Request Data

import type { LegalAidRequest } from '../../types';

export const mockLegalAidRequests: LegalAidRequest[] = [
  {
    id: 'req-demo-001',
    trackingNumber: 'NF-LEG-2026-001',
    beneficiaryId: 'user-beneficiary-01',
    beneficiaryName: 'মোঃ রহিম উল্লাহ',
    beneficiaryMobile: '01712-345678',
    district: 'যশোর',
    legalCategory: 'পারিবারিক ও ভরণপোষণ আইন',
    lawyerId: 'lawyer-demo-01',
    lawyerName: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
    caseSummary: 'পারিবারিক খোরপোশ ও নাবালকের অভিভাবকত্ব প্রাপ্তির বিষয়ে আইনী পরামর্শ ও প্রতিনিধিত্ব প্রয়োজন।',
    urgencyLevel: 'HIGH',
    status: 'IN_PROGRESS',
    feeAmount: 500,
    isFeePaid: true,
    documents: [
      { id: 'doc-1', fileName: 'family_complaint_draft.pdf', fileType: 'PDF', fileSize: '1.2 MB', uploadDate: '2026-03-01', status: 'VERIFIED' },
      { id: 'doc-2', fileName: 'nid_copy.jpg', fileType: 'IMAGE', fileSize: '850 KB', uploadDate: '2026-03-01', status: 'VERIFIED' },
      { id: 'doc-3', fileName: 'ward_councillor_certificate.pdf', fileType: 'PDF', fileSize: '920 KB', uploadDate: '2026-03-02', status: 'VERIFIED' },
    ],
    timeline: [
      { id: 'tl-1', title: 'সহায়তা আবেদন জমা দেওয়া হয়েছে', description: 'অনলাইন পোর্টালের মাধ্যমে সেবাগ্রহীতা প্রাথমিক আবেদন সম্পন্ন করেছেন।', timestamp: '২০২৬-০৩-০১ ১০:০০ AM', actor: 'মোঃ রহিম উল্লাহ', status: 'SUBMITTED' },
      { id: 'tl-2', title: 'আবেদন অনুমোদন ও নথি যাচাই', description: 'নেকী ফাউন্ডেশন পর্যালোচনা কমিটি কর্তৃক কেসটি প্রাথমিক যাচাই সম্পন্ন হয়েছে।', timestamp: '২০২৬-০৩-০১ ১০:০৫ AM', actor: 'ফাউন্ডেশন ডেস্ক', status: 'PAYMENT_CONFIRMED' },
      { id: 'tl-3', title: 'প্যানেল আইনজীবী নিয়োগ সম্পন্ন', description: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন কেসটি পরিচালনার দায়িত্ব গ্রহণ করেছেন।', timestamp: '২০২৬-০৩-০২ ১১:৩০ AM', actor: 'এডমিন কমিটি', status: 'ASSIGNED' },
      { id: 'tl-4', title: 'বিজ্ঞ পারিবারিক আদালতে শুনানি ও কার্যক্রম চলমান', description: 'পারিবারিক আদালত, যশোরে মামলা দায়ের ও সমন জারির নোটিশ দাখিল করা হয়েছে।', timestamp: '২০২৬-০৩-০৪ ০২:০০ PM', actor: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন', status: 'IN_PROGRESS' },
    ],
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-04T14:00:00Z',
  },
  {
    id: 'req-demo-002',
    trackingNumber: 'NF-LEG-2026-002',
    beneficiaryId: 'user-beneficiary-01',
    beneficiaryName: 'মোঃ রহিম উল্লাহ',
    beneficiaryMobile: '01712-345678',
    district: 'যশোর',
    legalCategory: 'জমিজমা ও দেওয়ানী আইন',
    lawyerId: 'lawyer-demo-02',
    lawyerName: 'এডভোকেট ফাহমিদা সুলতানা',
    caseSummary: 'পৈতৃক ভিটেমাটি অবৈধ দখলদারিত্বের বিরুদ্ধে নিষেধাজ্ঞা সংক্রান্ত মামলার আইনী সহায়তা চাওয়া হচ্ছে।',
    urgencyLevel: 'MEDIUM',
    status: 'ASSIGNED',
    feeAmount: 500,
    isFeePaid: true,
    documents: [
      { id: 'doc-4', fileName: 'land_khatian_record.pdf', fileType: 'PDF', fileSize: '3.4 MB', uploadDate: '2026-03-05', status: 'VERIFIED' },
      { id: 'doc-5', fileName: 'mutation_porcha_copy.pdf', fileType: 'PDF', fileSize: '2.1 MB', uploadDate: '2026-03-05', status: 'PENDING' },
    ],
    timeline: [
      { id: 'tl-10', title: 'সহায়তা আবেদন জমা দেওয়া হয়েছে', description: 'অনলাইন পোর্টালের মাধ্যমে সেবাগ্রহীতা আবেদন জমা করেছেন।', timestamp: '২০২৬-০৩-০৫ ০৩:১৫ PM', actor: 'মোঃ রহিম উল্লাহ', status: 'SUBMITTED' },
      { id: 'tl-11', title: 'প্রাথমিক যাচাই সম্পন্ন', description: 'ফাউন্ডেশন লিগ্যাল ডেস্ক আবেদনটি পরীক্ষা করে গ্রহণ করেছে।', timestamp: '২০২৬-০৩-০৫ ০৩:২০ PM', actor: 'লিগ্যাল টিম', status: 'PAYMENT_CONFIRMED' },
      { id: 'tl-12', title: 'প্যানেল আইনজীবী নিয়োগ', description: 'এডভোকেট ফাহমিদা সুলতানাকে কেসটি পরিচালনার দায়িত্ব দেওয়া হয়েছে।', timestamp: '২০২৬-০৩-০৬ ১১:০০ AM', actor: 'লিগ্যাল টিম', status: 'ASSIGNED' },
    ],
    createdAt: '2026-03-05T15:15:00Z',
    updatedAt: '2026-03-06T11:00:00Z',
  },
];
