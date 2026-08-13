// Mock Legal Aid Request Data

import type { LegalAidRequest } from '../../types';

export const mockLegalAidRequests: LegalAidRequest[] = [
  {
    id: 'req-demo-001',
    trackingNumber: 'NF-LEG-2026-001',
    beneficiaryId: 'user-beneficiary-01',
    beneficiaryName: 'রহিম উল্লাহ (ডেমো সেবাগ্রহীতা)',
    beneficiaryMobile: '01700-000001',
    district: 'ঢাকা',
    legalCategory: 'পারিবারিক ও ভরণপোষণ আইন',
    lawyerId: 'lawyer-demo-01',
    lawyerName: 'Demo Lawyer 01 (আইনজীবী ডেমো ০১)',
    caseSummary: 'পারিবারিক খোরপোশ ও নাবালকের অভিভাবকত্ব প্রাপ্তির বিষয়ে আইনী পরামর্শ ও প্রতিনিধিত্ব প্রয়োজন।',
    urgencyLevel: 'HIGH',
    status: 'IN_PROGRESS',
    feeAmount: 500,
    isFeePaid: true,
    documents: [
      { id: 'doc-1', fileName: 'family_complaint_draft.pdf', fileType: 'PDF', fileSize: '1.2 MB', uploadDate: '2026-03-01', status: 'VERIFIED' },
      { id: 'doc-2', fileName: 'nid_copy.jpg', fileType: 'IMAGE', fileSize: '850 KB', uploadDate: '2026-03-01', status: 'VERIFIED' },
    ],
    timeline: [
      { id: 'tl-1', title: 'সহায়তা আবেদন জমা দেওয়া হয়েছে', description: 'অনলাইন পোর্টালের মাধ্যমে সেবাগ্রহীতা আবেদন সম্পন্ন করেছেন।', timestamp: '২০২৬-০৩-০১ ১০:০০ AM', actor: 'রহিম উল্লাহ', status: 'SUBMITTED' },
      { id: 'tl-2', title: 'প্রসেসিং ফি পেমেন্ট সফল (ডেমো)', description: 'bKash (ডেমো) মাধ্যমে ৫০০ টাকা ফাউণ্ডেশন ফি পরিশোধিত।', timestamp: '২০২৬-০৩-০১ ১০:০৫ AM', actor: 'পেমেন্ট গেটওয়ে', status: 'PAYMENT_CONFIRMED' },
      { id: 'tl-3', title: 'আইনজীবী নিয়োগ সম্পন্ন', description: 'Demo Lawyer 01 মামলাটি গ্রহণের সম্মতি প্রদান করেছেন।', timestamp: '২০২৬-০৩-০২ ১১:৩০ AM', actor: 'এডমিন / ফাউন্ডেশন', status: 'ASSIGNED' },
      { id: 'tl-4', title: 'আইনী কার্যক্রম চলমান', description: 'সংশ্লিষ্ট বিজ্ঞ জেলা আদালতে মামলা চালুর প্রস্তুতি গ্রহন করা হচ্ছে।', timestamp: '২০২৬-০৩-০৪ ০২:০০ PM', actor: 'Demo Lawyer 01', status: 'IN_PROGRESS' },
    ],
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-04T14:00:00Z',
  },
  {
    id: 'req-demo-002',
    trackingNumber: 'NF-LEG-2026-002',
    beneficiaryId: 'user-beneficiary-02',
    beneficiaryName: 'সাদিয়া আক্তার (ডেমো সেবাগ্রহীতা)',
    beneficiaryMobile: '01800-000002',
    district: 'চট্টগ্রাম',
    legalCategory: 'জমিজমা ও দেওয়ানী আইন',
    lawyerId: 'lawyer-demo-02',
    lawyerName: 'Demo Lawyer 02 (আইনজীবী ডেমো ০২)',
    caseSummary: 'পৈতৃক ভিটেমাটি অবৈধ দখলদারিত্বের বিরুদ্ধে নিষেধাজ্ঞা সংক্রান্ত মামলার আইনী সহায়তা চাওয়া হচ্ছে।',
    urgencyLevel: 'MEDIUM',
    status: 'PAYMENT_CONFIRMED',
    feeAmount: 500,
    isFeePaid: true,
    documents: [
      { id: 'doc-3', fileName: 'land_khatian_record.pdf', fileType: 'PDF', fileSize: '3.4 MB', uploadDate: '2026-03-05', status: 'PENDING' },
    ],
    timeline: [
      { id: 'tl-10', title: 'সহায়তা আবেদন জমা দেওয়া হয়েছে', description: 'অনলাইন পোর্টালের মাধ্যমে সেবাগ্রহীতা আবেদন জমা করেছেন।', timestamp: '২০২৬-০৩-০৫ ০৩:১৫ PM', actor: 'সাদিয়া আক্তার', status: 'SUBMITTED' },
      { id: 'tl-11', title: 'ফি পরিশোধ সম্পন্ন', description: 'Nagad (ডেমো) পেমেন্ট নিশ্চায়ন করা হয়েছে।', timestamp: '২০২৬-০৩-০৫ ০৩:২০ PM', actor: 'পেমেন্ট গেটওয়ে', status: 'PAYMENT_CONFIRMED' },
    ],
    createdAt: '2026-03-05T15:15:00Z',
    updatedAt: '2026-03-05T15:20:00Z',
  },
];
