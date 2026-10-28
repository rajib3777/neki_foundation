// Mock Admin Audit Logs Data

import type { AuditLog } from '../../types';

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-101',
    actor: 'তানভীর আহমেদ (এডমিন)',
    role: 'ADMIN',
    action: 'আইনজীবী আবেদন অনুমোদন',
    resource: 'Lawyer #lawyer-demo-01 (এডভোকেট সৈয়দ রেজওয়ান হোসেন)',
    details: 'বার সনদপত্র যাচাইপূর্বক প্রোফাইল অনুমোদিত ও পাবলিক ডিরেক্টরিতে দৃশ্যমান করা হয়েছে।',
    timestamp: '২০২৬-০৩-০৪ ১১:২০:১৫',
    status: 'SUCCESS',
  },
  {
    id: 'audit-102',
    actor: 'তানভীর আহমেদ (এডমিন)',
    role: 'ADMIN',
    action: 'আইনী সহায়তা অ্যাসাইনমেন্ট',
    resource: 'Request #NF-LEG-2026-001',
    details: 'সেবাগ্রহীতা মোঃ রহিম উল্লাহর আবেদনে এডভোকেট সৈয়দ রেজওয়ান হোসেনকে মনোনীত করা হয়েছে।',
    timestamp: '২০২৬-০৩-০২ ১১:৩০:০০',
    status: 'SUCCESS',
  },
  {
    id: 'audit-103',
    actor: 'পেমেন্ট গেটওয়ে অটোমেশন',
    role: 'PUBLIC',
    action: 'পেমেন্ট কনফার্মেশন',
    resource: 'Payment #TXN-NF-9921448',
    details: 'bKash মাধ্যমে ৫০০ টাকা প্রসেসিং ফি প্রাপ্তি নিশ্চায়ন।',
    timestamp: '২০২৬-০৩-০১ ১০:০৫:০০',
    status: 'SUCCESS',
  },
];
