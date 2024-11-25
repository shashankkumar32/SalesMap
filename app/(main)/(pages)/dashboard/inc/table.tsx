
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // For navigation
import { Input } from '@/components/ui/input'; // Assuming you have the ShadCN Input component

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

const BillsStack: React.FC = () => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [filterIdValue, setFilterIdValue] = useState<string>('');
  const [filterDateValue, setFilterDateValue] = useState<string>('');
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
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
    <div className="flex h-800px ">
      {/* Left Section: Bills List */}
      <div className="w-1/3 border-r p-4 overflow-hidden">
        {/* Filter Section */}
        <div className="mb-4  min-w-[300px]">
          <Input
            placeholder="Filter by Bill ID..."
            value={filterIdValue}
            onChange={(e) => setFilterIdValue(e.target.value)}
            className="mb-2"
          />
          <Input
            type="date"
            value={filterDateValue}
            onChange={(e) => setFilterDateValue(e.target.value)}
          />
        </div>

        {/* Bills List with Scroll */}
        <div className="overflow-y-auto max-h-[500px]">
          {loading ? (
            <p className="text-gray-500 text-center">Loading orders...</p>
          ) : filteredBills.length ? (
            filteredBills.map((bill) => (
              <div
                key={bill._id}
                className={`p-4 mb-2 border rounded-md  w-[300px] cursor-pointer ${
                  selectedBill?._id === bill._id
                    ? 'bg-[#7540A9] text-white'
                    : 'hover:bg-[#7540A9] hover:text-white'
                }`}
                onClick={() => setSelectedBill(bill)}
              >
                <p className="font-semibold truncate">Bill ID: {bill._id}</p>
                <p className="text-sm text-gray-300">
                  Date: {new Date(bill.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No results found.</p>
          )}
        </div>
      </div>

      {/* Right Section: Selected Bill Details */}
      <div className="w-2/3 p-4 overflow-hidden  min-w-[500px]">
        {selectedBill ? (
          <>
            {/* Header */}
            <div
              className="p-4 rounded-md mb-4 flex items-center"
              style={{
                backgroundColor: '#BD8AFF',
                height: '100px',
                minWidth: '500px',
              }}
            >
              <h2 className="text-xl font-bold text-white whitespace-nowrap mr-4">
                Order ID:
              </h2>
              <span className="text-lg font-medium text-white break-words  overflow-x-auto min-w-[500px]">
                {selectedBill._id}
              </span>
            </div>

            {/* Items */}
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="space-y-2">
              {selectedBill.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.itemName}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">Rs {item.totalAmount.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </>
        ) : loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (<>
          <div
              className="p-4 rounded-md mb-4 flex items-center"
              style={{
                backgroundColor: '#BD8AFF',
                height: '100px',
                minWidth: '500px',
              }}
              >
              <h2 className="text-xl font-bold text-white whitespace-nowrap mr-4">
                Order ID:
              </h2>
              <span className="text-lg font-medium text-white break-words  overflow-x-auto min-w-[500px]">
                
              </span>
            </div>

          <div className="flex items-center justify-center h-full  min-w-[500px]">
            <p className="text-gray-500 text-center">
              Select an order to view its details.
            </p>
          </div>
              </>
        )}
      </div>
    </div>
  );
};

export default BillsStack;
