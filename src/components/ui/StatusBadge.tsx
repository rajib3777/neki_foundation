import React from 'react';
import { Badge } from './Badge';
import type { LawyerStatus, LegalAidRequestStatus } from '../../types';

export interface StatusBadgeProps {
  status: LawyerStatus | LegalAidRequestStatus;
  type?: 'lawyer' | 'request';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'request' }) => {
  if (type === 'lawyer') {
    const lawyerConfig: Record<LawyerStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
      DRAFT: { label: 'ড্রাফট', variant: 'neutral' },
      SUBMITTED: { label: 'আবেদন জমা হয়েছে', variant: 'info' },
      UNDER_REVIEW: { label: 'যাচাইধীন', variant: 'warning' },
      APPROVED: { label: 'অনুমোদিত আইনজীবী', variant: 'success' },
      REJECTED: { label: 'আবেদন প্রত্যাখ্যাত', variant: 'danger' },
      SUSPENDED: { label: 'স্থগিতকৃত', variant: 'danger' },
    };
    const conf = lawyerConfig[status as LawyerStatus] || { label: status, variant: 'neutral' };
    return <Badge variant={conf.variant}>{conf.label}</Badge>;
  }

  const requestConfig: Record<LegalAidRequestStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
    DRAFT: { label: 'খসড়া', variant: 'neutral' },
    SUBMITTED: { label: 'আবেদন জমাকৃত', variant: 'info' },
    PAYMENT_PENDING: { label: 'পেমেন্ট অপেক্ষমাণ', variant: 'warning' },
    PAYMENT_CONFIRMED: { label: 'পেমেন্ট নিশ্চিত', variant: 'success' },
    ASSIGNED: { label: 'আইনজীবী মনোনীত', variant: 'info' },
    IN_REVIEW: { label: 'প্রাথমিক পর্যালোচনা', variant: 'warning' },
    IN_PROGRESS: { label: 'আইনী কার্যক্রম চলমান', variant: 'warning' },
    COMPLETED: { label: 'সহায়তা সম্পন্ন', variant: 'success' },
    CANCELLED: { label: 'বাতিলকৃত', variant: 'danger' },
  };

  const conf = requestConfig[status as LegalAidRequestStatus] || { label: status, variant: 'neutral' };
  return <Badge variant={conf.variant}>{conf.label}</Badge>;
};
