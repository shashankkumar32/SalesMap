

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input'; // Assuming you have the ShadCN Input component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CartItem {
  itemName: string;
  quantity: number;
  totalAmount: number;
}

interface Bill {
  _id: string;
  cartItems: CartItem[];
  createdAt: string;
}

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: '_id',
    header: 'Bill ID',
    cell: ({ row }) => <div>{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <div> {new Date(row.getValue('createdAt')).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: 'cartItems',
    header: 'Items',
    cell: ({ row }) => (
      <div>
        {row.original.cartItems.map((item, index) => (
          <div key={index}>
            {item.itemName} (Qty: {item.quantity})
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => {
      const totalAmount = row.original.cartItems.reduce(
        (sum, item) => sum + item.totalAmount,
        0
      );
      return <div>${totalAmount}</div>;
    },
  },
];

const BillsTable: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [bills, setBills] = useState<Bill[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterIdValue, setFilterIdValue] = useState<string>('');
  const [filterDateValue, setFilterDateValue] = useState<string>('');

  // Fetch bills from the API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the JWT is stored in localStorage
        const response = await axios.get('https://pos-backend-jwt-auth.onrender.com/api/bill/bills', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(response.data);
      } catch (error:any) {
        
        console.error('Error fetching bills:', error);
        // Redirect to /auth if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          router.push('/auth');
        }
      }
    };

    fetchBills();
  }, [router]);

  // Initialize table with TanStack Table
  const table = useReactTable({
    data: bills,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Filter handler for 'Bill ID' column
  const handleFilterIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterIdValue(e.target.value);
    table.getColumn('_id')?.setFilterValue(e.target.value);
  };

  // Filter handler for 'Date' column
  const handleFilterDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDateValue(e.target.value);
    table.getColumn('createdAt')?.setFilterValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Bills</h1>

      {/* Filters */}
      <div className="w-full flex gap-4 mb-4">
        {/* Filter by Bill ID */}
        <Input
          placeholder="Filter by Bill ID..."
          value={filterIdValue}
          onChange={handleFilterIdChange}
          className="max-w-sm"
        />

        {/* Filter by Date */}
        <Input
          type="date"
          value={filterDateValue}
          onChange={handleFilterDateChange}
          className="max-w-sm"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BillsTable;
