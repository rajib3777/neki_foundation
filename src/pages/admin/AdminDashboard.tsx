import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { lawyerService } from '../../services/lawyer.service';
import { legalAidService } from '../../services/legalAid.service';
import type { Lawyer, LegalAidRequest, AuditLog } from '../../types';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { AvatarPlaceholder } from '../../components/ui/AvatarPlaceholder';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { Users, FileText, CheckCircle2, History } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [pendingLawyers, setPendingLawyers] = useState<Lawyer[]>([]);
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    Promise.all([
      lawyerService.getLawyers({ status: 'UNDER_REVIEW' }),
      legalAidService.getRequests(),
      adminService.getAuditLogs(),
      adminService.getDashboardStats(),
    ]).then(([lawyers, reqs, logs, s]) => {
      setPendingLawyers(lawyers);
      setRequests(reqs);
      setAuditLogs(logs);
      setStats(s as Record<string, number>);
      setIsLoading(false);
    });
  }, []);

  const handleApprove = async (lawyer: Lawyer) => {
    await lawyerService.updateLawyerStatus(lawyer.id, 'APPROVED');
    await adminService.logAction('আইনজীবী আবেদন অনুমোদন', `Lawyer #${lawyer.id}`, `${lawyer.fullName}-এর আবেদন অনুমোদিত হয়েছে।`);
    setPendingLawyers((prev) => prev.filter((l) => l.id !== lawyer.id));
  };

  const handleRejectSubmit = async () => {
    if (!selectedLawyer || !rejectReason.trim()) return;
    await lawyerService.updateLawyerStatus(selectedLawyer.id, 'REJECTED', rejectReason);
    await adminService.logAction('আইনজীবী আবেদন প্রত্যাখ্যান', `Lawyer #${selectedLawyer.id}`, rejectReason);
    setPendingLawyers((prev) => prev.filter((l) => l.id !== selectedLawyer.id));
    setRejectModalOpen(false);
    setRejectReason('');
    setSelectedLawyer(null);
  };

  const statsCards = [
    { label: 'অপেক্ষমাণ আবেদন', value: stats.pendingLawyersCount ?? 0, icon: FileText, color: 'bg-amber-50 text-amber-700' },
    { label: 'অনুমোদিত আইনজীবী', value: stats.approvedLawyersCount ?? 0, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'মোট সেবাগ্রহীতা', value: stats.totalBeneficiariesCount ?? 0, icon: Users, color: 'bg-blue-50 text-blue-700' },
    { label: 'সক্রিয় অনুরোধ', value: stats.activeRequestsCount ?? 0, icon: FileText, color: 'bg-red-50 text-red-700' },
  ];

  const requestColumns: Column<LegalAidRequest>[] = [
    { header: 'ট্র্যাকিং', cell: (r) => <code className="text-xs bg-gray-100 px-1 rounded">{r.trackingNumber}</code> },
    { header: 'সেবাগ্রহীতা', accessorKey: 'beneficiaryName' },
    { header: 'জেলা', accessorKey: 'district' },
    { header: 'আইনজীবী', cell: (r) => r.lawyerName || '(অনির্ধারিত)' },
    { header: 'স্ট্যাটাস', cell: (r) => <StatusBadge status={r.status} type="request" /> },
  ];

  const auditColumns: Column<AuditLog>[] = [
    { header: 'অ্যাক্টর', accessorKey: 'actor' },
    { header: 'কার্যক্রম', accessorKey: 'action' },
    { header: 'রিসোর্স', accessorKey: 'resource' },
    { header: 'সময়', accessorKey: 'timestamp' },
    { header: 'স্ট্যাটাস', cell: (l) => (
      <span className={`text-xs font-semibold ${l.status === 'SUCCESS' ? 'text-emerald-700' : 'text-red-600'}`}>
        {l.status === 'SUCCESS' ? '✓ সফল' : '✗ ব্যর্থ'}
      </span>
    )},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-bangla">এডমিন কন্ট্রোল প্যানেল</h1>
        <p className="text-xs text-gray-500 font-bangla mt-1">নেকী ফাউন্ডেশন সিস্টেম ম্যানেজমেন্ট ড্যাশবোর্ড (ডেমো)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((s, idx) => (
          <Card key={idx} className={`${s.color} border-none`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs font-medium mt-0.5 font-bangla">{s.label}</p>
              </div>
              <s.icon className="w-8 h-8 opacity-30" />
            </div>
          </Card>
        ))}
      </div>

      {/* Pending Lawyer Applications Review */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-bangla flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-600" />
          আইনজীবী আবেদন পর্যালোচনা ({pendingLawyers.length} অপেক্ষমাণ)
        </h3>

        {pendingLawyers.length === 0 && !isLoading && (
          <Card className="text-center py-8">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-bangla">সকল আবেদন প্রক্রিয়াকৃত হয়েছে।</p>
          </Card>
        )}

        {pendingLawyers.map((lawyer) => (
          <Card key={lawyer.id} className="border-l-4 border-l-amber-400">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <AvatarPlaceholder name={lawyer.fullName} isDemo={lawyer.isDemo} size="md" />
                <div>
                  <h4 className="text-base font-bold text-gray-900 font-bangla">{lawyer.fullName}</h4>
                  <p className="text-xs text-gray-600">{lawyer.designation} — {lawyer.barAssociation}</p>
                  <p className="text-xs text-gray-500 font-bangla">জেলা: {lawyer.district} • অভিজ্ঞতা: {lawyer.yearsOfExperience} বছর</p>
                  <p className="text-xs text-gray-500">নথি: {lawyer.enrollmentNumber}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="primary" onClick={() => handleApprove(lawyer)}>
                  <CheckCircle2 className="w-4 h-4 mr-1" /> অনুমোদন করুন
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setSelectedLawyer(lawyer);
                    setRejectModalOpen(true);
                  }}
                >
                  প্রত্যাখ্যান করুন
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Legal Aid Requests */}
      <div>
        <h3 className="text-base font-bold text-gray-900 font-bangla mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#1B4D3E]" />
          আইনী সহায়তা অনুরোধ মনিটরিং
        </h3>
        <DataTable
          columns={requestColumns}
          data={requests}
          keyExtractor={(r) => r.id}
          isLoading={isLoading}
          emptyMessage="কোনো আইনী সহায়তার অনুরোধ নেই।"
        />
      </div>

      {/* Audit Logs */}
      <div>
        <h3 className="text-base font-bold text-gray-900 font-bangla mb-3 flex items-center gap-2">
          <History className="w-5 h-5 text-gray-600" />
          সিস্টেম অডিট লগ
        </h3>
        <DataTable
          columns={auditColumns}
          data={auditLogs}
          keyExtractor={(l) => l.id}
          isLoading={isLoading}
          emptyMessage="কোনো অডিট লগ নেই।"
        />
      </div>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => { setRejectModalOpen(false); setRejectReason(''); setSelectedLawyer(null); }}
        title="আইনজীবী আবেদন প্রত্যাখ্যান করুন"
        footer={
          <>
            <Button variant="outline" onClick={() => { setRejectModalOpen(false); setRejectReason(''); }}>বাতিল করুন</Button>
            <Button variant="danger" onClick={handleRejectSubmit} isLoading={!rejectReason.trim()}>প্রত্যাখ্যান নিশ্চিত করুন</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700 font-bangla">
            <strong>{selectedLawyer?.fullName}</strong>-এর আবেদন প্রত্যাখ্যানের কারণ লিখুন। আবেদনকারীকে এটি জানানো হবে।
          </p>
          <Textarea
            label="প্রত্যাখ্যানের কারণ"
            isRequired
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
            placeholder="প্রত্যাখ্যানের সুনির্দিষ্ট কারণ লিখুন..."
          />
        </div>
      </Modal>
    </div>
  );
};
