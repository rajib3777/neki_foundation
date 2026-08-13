// Comprehensive Bangladesh Districts and Upazilas reference data

export interface DistrictData {
  id: string;
  nameBn: string;
  nameEn: string;
  divisionBn: string;
  divisionEn: string;
  upazilasBn: string[];
}

export const bangladeshDistricts: DistrictData[] = [
  // Dhaka Division
  { id: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['ধানমন্ডি', 'মিরপুর', 'উত্তরা', 'গুলশান', 'সাভার', 'কেরানীগঞ্জ', 'তেজগাঁও', 'ধামরাই'] },
  { id: 'gazipur', nameBn: 'গাজীপুর', nameEn: 'Gazipur', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['গাজীপুর সদর', 'কালীগঞ্জ', 'কাপাসিয়া', 'শ্রীপুর', 'কালিয়াকৈর'] },
  { id: 'narayanganj', nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['নারায়ণগঞ্জ সদর', 'সোনারগাঁও', 'আড়াইহাজার', 'রূপগঞ্জ', 'বন্দর'] },
  { id: 'tangail', nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['টাঙ্গাইল সদর', 'মির্জাপুর', 'ঘাটাইল', 'মধুপুর', 'কালিহাতী', 'সখিপুর'] },
  { id: 'faridpur', nameBn: 'ফরিদপুর', nameEn: 'Faridpur', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['ফরিদপুর সদর', 'ভাঙ্গা', 'বোয়ালমারী', 'নগরকান্দা', 'আলফাডাঙ্গা'] },
  { id: 'narsingdi', nameBn: 'নরসিংদী', nameEn: 'Narsingdi', divisionBn: 'ঢাকা', divisionEn: 'Dhaka', upazilasBn: ['নরসিংদী সদর', 'পলাশ', 'শিবপুর', 'রায়পুরা', 'মনোহরদী', 'বেলাবো'] },

  // Chattogram Division
  { id: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', divisionEn: 'Chattogram', upazilasBn: ['কোতোয়ালী', 'পাহাড়তলী', 'হাটহাজারী', 'পটিয়া', 'সীতাকুণ্ড', 'সন্দ্বীপ', 'বোয়ালখালী', 'রাউজান'] },
  { id: 'coxs-bazar', nameBn: 'কক্সবাজার', nameEn: "Cox's Bazar", divisionBn: 'চট্টগ্রাম', divisionEn: 'Chattogram', upazilasBn: ['কক্সবাজার সদর', 'উখিয়া', 'টেকনাফ', 'রামুর', 'চকোরিয়া', 'মহেশখালী'] },
  { id: 'comilla', nameBn: 'কুমিল্লা', nameEn: 'Cumilla', divisionBn: 'চট্টগ্রাম', divisionEn: 'Chattogram', upazilasBn: ['কুমিল্লা সদর', 'লাকসাম', 'দাউদকান্দি', 'চৌদ্দগ্রাম', 'দেবীদ্বার', 'বরুড়া'] },
  { id: 'noakhali', nameBn: 'নোয়াখালী', nameEn: 'Noakhali', divisionBn: 'চট্টগ্রাম', divisionEn: 'Chattogram', upazilasBn: ['নোয়াখালী সদর', 'বেগমগঞ্জ', 'সোনাইমুড়ী', 'কোম্পানীগঞ্জ', 'হাতিয়া'] },

  // Rajshahi Division
  { id: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi', divisionBn: 'রাজশাহী', divisionEn: 'Rajshahi', upazilasBn: ['বোয়ালিয়া', 'পবা', 'গোদাগাড়ী', 'তানোর', 'বাঘমারা', 'চারঘাট'] },
  { id: 'bogra', nameBn: 'বগুড়া', nameEn: 'Bogra', divisionBn: 'রাজshahi', divisionEn: 'Rajshahi', upazilasBn: ['বগুড়া সদর', 'শেরপুর', 'শিবগঞ্জ', 'ধুনট', 'গাবতলী', 'নন্দীগ্রাম'] },
  { id: 'pabna', nameBn: 'পাবনা', nameEn: 'Pabna', divisionBn: 'রাজশাহী', divisionEn: 'Rajshahi', upazilasBn: ['পাবনা সদর', 'ঈশ্বরদী', 'সাঁথিয়া', 'বেড়া', 'চাটমোহর'] },

  // Khulna Division
  { id: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna', divisionBn: 'খুলনা', divisionEn: 'Khulna', upazilasBn: ['খুলনা সদর', 'রূপসা', 'বটিয়াঘাটা', 'ডুমুরিয়া', 'পাইকগাছা', 'কয়রা'] },
  { id: 'jessore', nameBn: 'যশোর', nameEn: 'Jashore', divisionBn: 'খুলনা', divisionEn: 'Khulna', upazilasBn: ['যশোর সদর', 'ঝিকরগাছা', 'শার্শা', 'মনিরামপুর', 'কেশবপুর', 'বাঘারপাড়া'] },
  { id: 'kushtia', nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', divisionBn: 'খুলনা', divisionEn: 'Khulna', upazilasBn: ['কুষ্টিয়া সদর', 'কুমারখালী', 'ভেড়ামারা', 'মিরপুর', 'খোকসা', 'দৌলতপুর'] },

  // Sylhet Division
  { id: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet', divisionBn: 'সিলেট', divisionEn: 'Sylhet', upazilasBn: ['সিলেট সদর', 'গোলাপগঞ্জ', 'বীণাইবাজার', 'জৈন্তাপুর', 'কানাইঘাট', 'ফেঞ্চুগঞ্জ'] },
  { id: 'moulvibazar', nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', divisionBn: 'সিলেট', divisionEn: 'Sylhet', upazilasBn: ['মৌলভীবাজার সদর', 'শ্রীমঙ্গল', 'কমলগঞ্জ', 'কুলাউড়া', 'বড়লেখা'] },

  // Barishal Division
  { id: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal', divisionBn: 'বরিশাল', divisionEn: 'Barishal', upazilasBn: ['বরিশাল সদর', 'বাকেরগঞ্জ', 'বাবুগঞ্জ', 'গৌরনদী', 'মেহেন্দিগঞ্জ', 'মুলাদী'] },

  // Rangpur Division
  { id: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur', divisionBn: 'রংপুর', divisionEn: 'Rangpur', upazilasBn: ['রংপুর সদর', 'মিঠাপুকুর', 'পীরগঞ্জ', 'কৌনিয়া', 'গঙ্গাচড়া', 'বদরগঞ্জ'] },
  { id: 'dinajpur', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', divisionBn: 'রংপুর', divisionEn: 'Rangpur', upazilasBn: ['দিনাজপুর সদর', 'বিরামপুর', 'ফুলবাড়ী', 'পার্বতীপুর', 'বীরগঞ্জ'] },

  // Mymensingh Division
  { id: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ', divisionEn: 'Mymensingh', upazilasBn: ['ময়মনসিংহ সদর', 'মুক্তাগাছা', 'ত্রিশাল', 'ফুলবাড়িয়া', 'গফরগাঁও', 'ভালুকা'] },
  { id: 'jamalpur', nameBn: 'জামালপুর', nameEn: 'Jamalpur', divisionBn: 'ময়মনসিংহ', divisionEn: 'Mymensingh', upazilasBn: ['জামালপুর সদর', 'সরিষাবাড়ী', 'মেলান্দহ', 'ইসলামপুর', 'মাদারগঞ্জ'] },
];

export const allDivisionsBn = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];
