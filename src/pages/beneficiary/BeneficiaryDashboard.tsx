import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { legalAidService } from '../../services/legalAid.service';
import type { LegalAidRequest, User } from '../../types';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { FileText, CreditCard, Search, LayoutDashboard } from 'lucide-react';

export const BeneficiaryDashboard: React.FC = () => {
  const { currentUser } = useOutletContext<{ currentUser: User }>();
  const [requests, setRequests] = useState<LegalAidRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    legalAidService.getRequests({ beneficiaryId: currentUser?.id }).then((data) => {
      setRequests(data);
      setIsLoading(false);
    });
  }, [currentUser]);

  const stats = [
    { label: 'সক্রিয় আবেদন', value: requests.filter((r) => !['COMPLETED', 'CANCELLED'].includes(r.status)).length, icon: FileText, color: 'bg-blue-50 text-blue-700' },
    { label: 'সম্পন্ন সহায়তা', value: requests.filter((r) => r.status === 'COMPLETED').length, icon: LayoutDashboard, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'পেমেন্ট সম্পন্ন', value: requests.filter((r) => r.isFeePaid).length, icon: CreditCard, color: 'bg-amber-50 text-amber-700' },
    { label: 'মোট আবেদন', value: requests.length, icon: Search, color: 'bg-gray-50 text-gray-700' },
  ];

  const columns: Column<LegalAidRequest>[] = [
    { header: 'ট্র্যাকিং নম্বর', cell: (r) => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.trackingNumber}</code> },
    { header: 'জেলা', accessorKey: 'district' },
    { header: 'বিষয়', accessorKey: 'legalCategory' },
    { header: 'স্ট্যাটাস', cell: (r) => <StatusBadge status={r.status} type="request" /> },
    { header: 'তারিখ', cell: (r) => new Date(r.createdAt).toLocaleDateString('bn-BD') },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-bangla">সেবাগ্রহীতা ড্যাশবোর্ড</h1>
        <p className="text-xs text-gray-500 font-bangla mt-1">
          স্বাগতম, {currentUser?.name || 'সেবাগ্রহীতা'}! আপনার আবেদনের অবস্থা এখানে দেখুন।
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className={`${stat.color} border-none`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs font-medium mt-0.5 font-bangla">{stat.label}</p>
              </div>
              <stat.icon className="w-8 h-8 opacity-30" />
            </div>
          </Card>
        ))}
      </div>

      {/* Request Timeline for latest request */}
      {requests.length > 0 && requests[0].timeline.length > 0 && (
        <Card>
          <h3 className="text-base font-bold text-gray-900 font-bangla border-b border-gray-100 pb-3 mb-4">
            সর্বশেষ আবেদনের অগ্রগতি — {requests[0].trackingNumber}
          </h3>
          <div className="space-y-4">
            {requests[0].timeline.map((event, idx) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${idx === 0 ? 'bg-[#1B4D3E] border-[#1B4D3E]' : 'bg-white border-gray-300'}`} />
                  {idx < requests[0].timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-bold text-gray-900 font-bangla">{event.title}</p>
                  <p className="text-xs text-gray-600 font-bangla mt-0.5">{event.description}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* All Requests Table */}
      <div>
        <h3 className="text-base font-bold text-gray-900 font-bangla mb-3">আমার সকল আবেদন</h3>
        <DataTable
          columns={columns}
          data={requests}
          keyExtractor={(r) => r.id}
          isLoading={isLoading}
          emptyMessage="আপনার এখনো কোনো আইনী সহায়তার আবেদন নেই।"
        />
      </div>
    </div>
  );
};
