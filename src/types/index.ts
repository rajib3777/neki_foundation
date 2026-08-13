// Global Domain Types for Neki Foundation (নেকী ফাউন্ডেশন)

export type UserRole = 'PUBLIC' | 'BENEFICIARY' | 'LAWYER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  district: string;
  upazila?: string;
  avatarUrl?: string;
  createdAt: string;
}

export type LawyerStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface Lawyer {
  id: string;
  userId: string;
  fullName: string;
  isDemo: true; // Hard rule: always true for mock profiles
  designation: string;
  barAssociation: string;
  enrollmentNumber: string;
  enrollmentYear: number;
  district: string;
  upazila: string;
  chamberAddress: string;
  yearsOfExperience: number;
  practiceAreas: string[];
  bio: string;
  languages: string[];
  status: LawyerStatus;
  isVerified: boolean;
  rejectionReason?: string;
  createdAt: string;
  profileCompletionPercentage: number;
}

export type LegalAidRequestStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'ASSIGNED'
  | 'IN_REVIEW'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface LegalAidRequest {
  id: string;
  trackingNumber: string;
  beneficiaryId: string;
  beneficiaryName: string;
  beneficiaryMobile: string;
  district: string;
  legalCategory: string;
  lawyerId?: string;
  lawyerName?: string;
  caseSummary: string;
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  status: LegalAidRequestStatus;
  feeAmount: number;
  isFeePaid: boolean;
  documents: RequestDocument[];
  timeline: RequestTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface RequestDocument {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  url?: string;
}

export interface RequestTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  status: LegalAidRequestStatus;
}

export type PaymentMethod = 'BKASH' | 'NAGAD' | 'CARD' | 'BANK_TRANSFER';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  transactionId: string;
  requestId: string;
  amount: number;
  processingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  payerName: string;
  payerMobile: string;
  createdAt: string;
  isDemo: true;
}

export interface HumanitarianService {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  shortDescriptionBn: string;
  shortDescriptionEn: string;
  category: 'LEGAL' | 'ENVIRONMENT' | 'HEALTH' | 'SOCIAL_PROTECTION' | 'COMMUNITY';
  isActive: boolean;
  iconName: string;
  impactMetrics: { label: string; value: string }[];
  ctaTextBn: string;
}

export interface District {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  upazilas: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  titleBn: string;
  excerptBn: string;
  contentBn: string;
  categoryBn: string;
  publishedAt: string;
  readTime: string;
  isFeatured?: boolean;
}

export interface AuditLog {
  id: string;
  actor: string;
  role: UserRole;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}

export interface ImpactActivity {
  id: string;
  titleBn: string;
  categoryBn: string;
  locationBn: string;
  dateBn: string;
  descriptionBn: string;
  impactMetricBn: string;
  statusBn: string;
}
