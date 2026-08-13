import React from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'কোনো তথ্য পাওয়া যায়নি।',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center bg-white rounded-lg border border-gray-200">
        <div className="inline-block w-6 h-6 border-2 border-[#1B4D3E] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-sm text-gray-500">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white rounded-lg border border-gray-200 text-gray-500">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-2xs">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50 text-gray-600 border-b border-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-4 py-3 font-semibold ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-gray-50/50 transition-colors">
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-3 ${col.className || ''}`}>
                  {col.cell
                    ? col.cell(item)
                    : col.accessorKey
                    ? String(item[col.accessorKey] ?? '')
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
