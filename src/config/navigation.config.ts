// Config-driven Navigation Configuration for Navbar & Footer

export interface NavItem {
  labelBn: string;
  labelEn: string;
  path: string;
  children?: NavItem[];
  isCta?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface FooterLinkGroup {
  label: string;
  links: { labelBn: string; path: string }[];
}

export const headerNavConfig: NavItem[] = [
  { labelBn: 'হোম', labelEn: 'Home', path: '/' },
  { labelBn: 'আমাদের কথা', labelEn: 'About Us', path: '/about' },
  {
    labelBn: 'কার্যক্রম ও সেবা',
    labelEn: 'Services',
    path: '/services',
    children: [
      { labelBn: 'আইনী সহায়তা', labelEn: 'Legal Assistance', path: '/services/legal-assistance' },
      { labelBn: 'বৃক্ষরোপণ কর্মসূচি', labelEn: 'Tree Plantation', path: '/services/tree-plantation' },
      { labelBn: 'রক্তদান উদ্যোগ', labelEn: 'Blood Donation', path: '/services/blood-donation' },
      { labelBn: 'সামাজিক সুরক্ষা', labelEn: 'Social Protection', path: '/services/social-protection' },
    ],
  },
  { labelBn: 'আইনজীবী ডিরেক্টরি', labelEn: 'Lawyers', path: '/lawyers' },
  { labelBn: 'স্বচ্ছতা ও রিপোর্ট', labelEn: 'Transparency', path: '/transparency' },
  { labelBn: 'সংবাদ ও আপডেট', labelEn: 'News', path: '/news' },
  { labelBn: 'যোগাযোগ', labelEn: 'Contact', path: '/contact' },
];

export const headerAuthActions: NavItem[] = [
  { labelBn: 'লগইন', labelEn: 'Login', path: '/auth/login', variant: 'outline' },
  { labelBn: 'আইনী সহায়তা নিন', labelEn: 'Get Legal Aid', path: '/legal-assistance/apply', isCta: true, variant: 'primary' },
];

// Flat array format used by Footer component
export const footerNavConfig: FooterLinkGroup[] = [
  {
    label: 'মূল সেবাসমূহ',
    links: [
      { labelBn: 'বিনামূল্যে আইনী সহায়তা', path: '/services/legal-assistance' },
      { labelBn: 'সবুজ পরিবেশ ও বৃক্ষরোপণ', path: '/services/tree-plantation' },
      { labelBn: 'জরুরী রক্তদান সহায়তা', path: '/services/blood-donation' },
      { labelBn: 'সামাজিক পুনর্বাসন ও সুরক্ষা', path: '/services/social-protection' },
    ],
  },
  {
    label: 'আইনজীবী ও প্যানেল',
    links: [
      { labelBn: 'জেলা-ভিত্তিক আইনজীবী অনুসন্ধান', path: '/lawyers' },
      { labelBn: 'আইনজীবী হিসেবে নিবন্ধন', path: '/auth/register/lawyer' },
      { labelBn: 'আবেদন প্রক্রিয়ার নিয়মাবলী', path: '/legal-assistance' },
      { labelBn: 'নথিপত্র যাচাইকরণ গাইড', path: '/legal-assistance/apply' },

    ],
  },
  {
    label: 'সংস্থা ও স্বচ্ছতা',
    links: [
      { labelBn: 'আমাদের লক্ষ্য ও উদ্দেশ্য', path: '/about' },
      { labelBn: 'বার্ষিক প্রতিবেদন ও হিসাব', path: '/transparency' },
      { labelBn: 'সংবাদ ও কার্যক্রম রিপোর্ট', path: '/news' },
      { labelBn: 'যোগাযোগ ও হেল্পডেস্ক', path: '/contact' },
    ],
  },
];
