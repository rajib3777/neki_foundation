// Role-based Access Control and Dashboard Navigation Configuration

import type { UserRole } from '../types';

export interface RoleDashboardNav {
  labelBn: string;
  path: string;
  icon: string;
  badge?: string;
}

export const roleConfig: Record<UserRole, { nameBn: string; descriptionBn: string; defaultRoute: string }> = {
  PUBLIC: {
    nameBn: 'সাধারণ দর্শনার্থী',
    descriptionBn: 'পাবলিক ওয়েবসাইট ও সেবা তথ্যে প্রবেশাধিকার',
    defaultRoute: '/',
  },
  BENEFICIARY: {
    nameBn: 'সেবাগ্রহীতা / আবেদনকারী',
    descriptionBn: 'আইনী সহায়তার আবেদন, স্ট্যাটাস ট্র্যাকিং ও পেমেন্ট হিস্টোরি',
    defaultRoute: '/beneficiary/dashboard',
  },
  LAWYER: {
    nameBn: 'নিবন্ধিত আইনজীবী',
    descriptionBn: 'আবেদন রিভিউ, অ্যাসাইনড কেইস ও প্রোফাইল আপডেট',
    defaultRoute: '/lawyer/dashboard',
  },
  ADMIN: {
    nameBn: 'ফাউন্ডেশন এডমিন',
    descriptionBn: 'আবেদন যাচাইকরণ, আইনজীবী অনুমোদন, ব্যবহারকারী ও সিস্টেম অডিট',
    defaultRoute: '/admin/dashboard',
  },
};

export const beneficiaryNavConfig: RoleDashboardNav[] = [
  { labelBn: 'ওভারভিউ', path: '/beneficiary/dashboard', icon: 'LayoutDashboard' },
  { labelBn: 'আমার আবেদনসমূহ', path: '/beneficiary/requests', icon: 'FileText' },
  { labelBn: 'আইনজীবী খুঁজুন', path: '/beneficiary/lawyers', icon: 'Search' },
  { labelBn: 'নথিপত্র ভল্ট', path: '/beneficiary/documents', icon: 'FolderLock' },
  { labelBn: 'পেমেন্ট ও রিসিপ্ট', path: '/beneficiary/payments', icon: 'CreditCard' },
  { labelBn: 'প্রোফাইল সেটিংস', path: '/beneficiary/profile', icon: 'User' },
];

export const lawyerNavConfig: RoleDashboardNav[] = [
  { labelBn: 'ওভারভিউ', path: '/lawyer/dashboard', icon: 'LayoutDashboard' },
  { labelBn: 'আমার প্রোফাইল', path: '/lawyer/profile', icon: 'UserCheck' },
  { labelBn: 'কাজের অনুরোধ ও মামলা', path: '/lawyer/requests', icon: 'Briefcase' },
  { labelBn: 'আমার সার্টিফিকেট ও নথি', path: '/lawyer/documents', icon: 'FileCheck' },
  { labelBn: 'সময়সূচী ও সমন', path: '/lawyer/availability', icon: 'Calendar' },
  { labelBn: 'সেটিংস', path: '/lawyer/settings', icon: 'Settings' },
];

export const adminNavConfig: RoleDashboardNav[] = [
  { labelBn: 'এডমিন ড্যাশবোর্ড', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { labelBn: 'আইনজীবী আবেদন যাচাই', path: '/admin/lawyers', icon: 'UserPlus', badge: 'নতুন' },
  { labelBn: 'অনুমোদিত আইনজীবী', path: '/admin/approved-lawyers', icon: 'ShieldCheck' },
  { labelBn: 'সেবাগ্রহীতা তালিকা', path: '/admin/beneficiaries', icon: 'Users' },
  { labelBn: 'আইনী সহায়তা অনুরোধ', path: '/admin/requests', icon: 'FileSpreadsheet' },
  { labelBn: 'পেমেন্ট মনিটরিং', path: '/admin/payments', icon: 'DollarSign' },
  { labelBn: 'সেবা ও কনটেন্ট', path: '/admin/services', icon: 'Sliders' },
  { labelBn: 'সিস্টেম অডিট লগ', path: '/admin/audit-logs', icon: 'History' },
  { labelBn: 'সেটিংস', path: '/admin/settings', icon: 'Settings' },
];
