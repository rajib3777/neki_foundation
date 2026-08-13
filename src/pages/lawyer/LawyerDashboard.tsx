import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { lawyerService } from '../../services/lawyer.service';
import { legalAidService } from '../../services/legalAid.service';
import type { Lawyer, LegalAidRequest, User } from '../../types';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { AvatarPlaceholder } from '../../components/ui/AvatarPlaceholder';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';

export const LawyerDashboard: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();
  const [lawyerProfile, setLawyerProfile] = useState<Lawyer | null>(null);
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      lawyerService.getLawyerById('lawyer-demo-01'),
      legalAidService.getRequests({ lawyerId: 'lawyer-demo-01' }),
    ]).then(([profile, reqs]) => {
      setLawyerProfile(profile);
      setRequests(reqs);
      setIsLoading(false);
    });
  }, []);

  const columns: Column<LegalAidRequest>[] = [
    { header: 'ট্র্যাকিং', cell: (r) => <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{r.trackingNumber}</code> },
    { header: 'সেবাগ্রহীতা', accessorKey: 'beneficiaryName' },
    { header: 'জেলা', accessorKey: 'district' },
    { header: 'বিষয়', accessorKey: 'legalCategory' },
    { header: 'স্ট্যাটাস', cell: (r) => <StatusBadge status={r.status} type="request" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-bangla">আইনজীবী ড্যাশবোর্ড</h1>
        <p className="text-xs text-gray-500 font-bangla mt-1">স্বাগতম, {currentUser?.name || 'আইনজীবী'}!</p>
      </div>

      {/* Application Status Banner */}
      {lawyerProfile && (
        <Card className={`border-l-4 ${lawyerProfile.status === 'APPROVED' ? 'border-l-emerald-500 bg-emerald-50' : lawyerProfile.status === 'UNDER_REVIEW' ? 'border-l-amber-500 bg-amber-50' : 'border-l-red-500 bg-red-50'}`}>
          <div className="flex items-center gap-4">
            <AvatarPlaceholder name={lawyerProfile.fullName} isDemo={lawyerProfile.isDemo} size="lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {lawyerProfile.status === 'APPROVED' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <h2 className="text-base font-bold text-gray-900 font-bangla">
                  {lawyerProfile.status === 'APPROVED'
                    ? 'আপনার প্রোফাইল অনুমোদিত হয়েছে — আপনি পাবলিক ডিরেক্টরিতে দৃশ্যমান'
                    : lawyerProfile.status === 'UNDER_REVIEW'
                    ? 'আপনার আবেদন বর্তমানে যাচাইধীন রয়েছে'
                    : 'আবেদন প্রত্যাখ্যাত — পুনরায় জমা দিন'}
                </h2>
              </div>
              <StatusBadge status={lawyerProfile.status} type="lawyer" />
            </div>
          </div>
        </Card>
      )}

      {/* Profile Completion */}
      {lawyerProfile && (
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 font-bangla">প্রোফাইল পূর্ণতা</h3>
            <span className="text-sm font-bold text-[#1B4D3E]">{lawyerProfile.profileCompletionPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B4D3E] rounded-full transition-all"
              style={{ width: `${lawyerProfile.profileCompletionPercentage}%` }}
            />
          </div>
        </Card>
      )}

      {/* Assigned Cases Table */}
      <div>
        <h3 className="text-base font-bold text-gray-900 font-bangla mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#1B4D3E]" />
          অ্যাসাইনড মামলা ও অনুরোধ
        </h3>
        <DataTable
          columns={columns}
          data={requests}
          keyExtractor={(r) => r.id}
          isLoading={isLoading}
          emptyMessage="এখনো কোনো মামলা বরাদ্দ করা হয়নি।"
        />
      </div>
    </div>
  );
};
