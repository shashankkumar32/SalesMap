'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // For navigation
import { Input } from '@/components/ui/input'; // Assuming you have the ShadCN Input component
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // Modal components

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

const MobileBillsStack: React.FC = () => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [filterIdValue, setFilterIdValue] = useState<string>('');
  const [filterDateValue, setFilterDateValue] = useState<string>('');
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Fetch bills from the API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://pos-backend-jwt-auth.onrender.com/api/bill/bills',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBills(response.data);
        setFilteredBills(response.data); // Initially, show all bills
      } catch (error: any) {
        console.error('Error fetching bills:', error);
        if (error.response && error.response.status === 401) {
          router.push('/auth');
        }
      }
    };

    fetchBills();
  }, [router]);

  // Filter bills by Bill ID and Date
  useEffect(() => {
    const filtered = bills.filter((bill) => {
      const matchesId = filterIdValue
        ? bill._id.toLowerCase().includes(filterIdValue.toLowerCase())
        : true;
      const matchesDate = filterDateValue
        ? new Date(bill.createdAt).toLocaleDateString() === filterDateValue
        : true;
      return matchesId && matchesDate;
    });
    setFilteredBills(filtered);
  }, [filterIdValue, filterDateValue, bills]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Bills</h1>

      {/* Filters */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mb-4">
        {/* Filter by Bill ID */}
        <Input
          placeholder="Filter by Bill ID..."
          value={filterIdValue}
          onChange={(e) => setFilterIdValue(e.target.value)}
          className="sm:max-w-sm"
        />

        {/* Filter by Date */}
        <Input
          type="date"
          value={filterDateValue}
          onChange={(e) => setFilterDateValue(e.target.value)}
          className="sm:max-w-sm"
        />
      </div>

      {/* Bills Stack */}
      <div className="flex flex-col w-full gap-4">
        {filteredBills.length ? (
          filteredBills.map((bill) => (
            <div
              key={bill._id}
              className="p-4 border rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedBill(bill)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Bill ID: {bill._id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(bill.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  Rs
                  {bill.cartItems.reduce(
                    (sum, item) => sum + item.totalAmount,
                    0
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>

      {/* Modal to View Items */}
      {selectedBill && (
        <Dialog open={!!selectedBill} onOpenChange={() => setSelectedBill(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bill Details</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm">
                <strong>Bill ID:</strong> {selectedBill._id}
              </p>
              <p className="text-sm">
                <strong>Date:</strong>{' '}
                {new Date(selectedBill.createdAt).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="mt-2 space-y-2">
                {selectedBill.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 border rounded-md flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">{item.itemName}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${item.totalAmount.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MobileBillsStack;