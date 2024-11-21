
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card'; // Assuming you have a Card component

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

const LastFiveBills: React.FC = () => {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);

  // Fetch the last 5 bills from the API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://pos-backend-jwt-auth.onrender.com/api/bill/bills?limit=5', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(response.data); // Assuming the backend supports the 'limit' query
      } catch (error: any) {
        console.error('Error fetching bills:', error);
        if (error.response && error.response.status === 401) {
          router.push('/auth');
        }
      }
    };

    fetchBills();
  }, [router]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Bills</h1>

      {/* Card Stack for the last 5 bills with scroll */}
      <div className="w-full max-w-md space-y-4 overflow-y-auto max-h-[400px]">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <Card key={bill._id} className="shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Bill ID: {bill._id}</h2>
              <div className="mb-2">
                <span className="font-bold">Date: </span>
                {new Date(bill.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-bold">Items:</span>
                <ul>
                  {bill.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.itemName} (Qty: {item.quantity}, Total: ${item.totalAmount})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-bold">
                Total Amount: $
                {bill.cartItems.reduce((sum, item) => sum + item.totalAmount, 0)}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center">No bills available.</div>
        )}
      </div>
    </div>
  );
};

export default LastFiveBills;
