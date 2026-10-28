import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { LegalAssistanceLanding } from '../pages/public/LegalAssistanceLanding';
import { LegalAssistanceApply } from '../pages/public/LegalAssistanceApply';
import { LawyersDirectory } from '../pages/public/LawyersDirectory';
import { LawyerDetail } from '../pages/public/LawyerDetail';
import { Contact } from '../pages/public/Contact';
import { News } from '../pages/public/News';
import { Transparency } from '../pages/public/Transparency';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { RegisterBeneficiary } from '../pages/auth/RegisterBeneficiary';
import { RegisterLawyer } from '../pages/auth/RegisterLawyer';

// Dashboard Pages
import { BeneficiaryDashboard } from '../pages/beneficiary/BeneficiaryDashboard';
import { BeneficiaryRequests } from '../pages/beneficiary/BeneficiaryRequests';
import { BeneficiaryLawyers } from '../pages/beneficiary/BeneficiaryLawyers';
import { BeneficiaryDocuments } from '../pages/beneficiary/BeneficiaryDocuments';
import { BeneficiaryPayments } from '../pages/beneficiary/BeneficiaryPayments';
import { BeneficiaryProfile } from '../pages/beneficiary/BeneficiaryProfile';
import { LawyerDashboard } from '../pages/lawyer/LawyerDashboard';
import { LawyerProfile } from '../pages/lawyer/LawyerProfile';
import { LawyerRequests } from '../pages/lawyer/LawyerRequests';
import { LawyerAvailability } from '../pages/lawyer/LawyerAvailability';
import { LawyerDocuments } from '../pages/lawyer/LawyerDocuments';
import { LawyerSettings } from '../pages/lawyer/LawyerSettings';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminLawyers } from '../pages/admin/AdminLawyers';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminRequests } from '../pages/admin/AdminRequests';
import { AdminCMS } from '../pages/admin/AdminCMS';
import { AdminReports } from '../pages/admin/AdminReports';
import { AdminAuditLogs } from '../pages/admin/AdminAuditLogs';
import { AdminSettings } from '../pages/admin/AdminSettings';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F3EF] text-center px-4">
    <div className="space-y-4">
      <h1 className="text-6xl font-bold text-[#1B4D3E]">৪০৪</h1>
      <p className="text-lg font-bangla text-gray-700">পাতাটি পাওয়া যায়নি</p>
      <a href="/" className="inline-block text-sm font-bold text-[#1B4D3E] underline font-bangla">হোম পাতায় ফিরে যান</a>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Site Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<Services />} />
      <Route path="/legal-assistance" element={<LegalAssistanceLanding />} />
      <Route path="/legal-assistance/apply" element={<LegalAssistanceApply />} />
      <Route path="/lawyers" element={<LawyersDirectory />} />
      <Route path="/lawyers/:id" element={<LawyerDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:slug" element={<News />} />
      <Route path="/transparency" element={<Transparency />} />
    </Route>

    {/* Auth Routes */}
    <Route element={<AuthLayout />}>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register/beneficiary" element={<RegisterBeneficiary />} />
      <Route path="/auth/register/lawyer" element={<RegisterLawyer />} />
      <Route path="/auth/register" element={<Navigate to="/auth/register/beneficiary" replace />} />
    </Route>

    {/* Beneficiary Dashboard Routes */}
    <Route element={<DashboardLayout />}>
      <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
      <Route path="/beneficiary/requests" element={<BeneficiaryRequests />} />
      <Route path="/beneficiary/lawyers" element={<BeneficiaryLawyers />} />
      <Route path="/beneficiary/documents" element={<BeneficiaryDocuments />} />
      <Route path="/beneficiary/payments" element={<BeneficiaryPayments />} />
      <Route path="/beneficiary/profile" element={<BeneficiaryProfile />} />
    </Route>

    {/* Lawyer Dashboard Routes */}
    <Route element={<DashboardLayout />}>
      <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
      <Route path="/lawyer/profile" element={<LawyerProfile />} />
      <Route path="/lawyer/requests" element={<LawyerRequests />} />
      <Route path="/lawyer/availability" element={<LawyerAvailability />} />
      <Route path="/lawyer/documents" element={<LawyerDocuments />} />
      <Route path="/lawyer/settings" element={<LawyerSettings />} />
    </Route>

    {/* Admin Dashboard Routes */}
    <Route element={<DashboardLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/lawyers" element={<AdminLawyers />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/requests" element={<AdminRequests />} />
      <Route path="/admin/cms" element={<AdminCMS />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Route>

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
