import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  totalQuantity: number;
}

// Function to generate a random gradient
const generateRandomGradient = () => {
  const colors = [
    'from-pink-500 to-cyan-500',
    'from-blue-500 to-green-500',
    'from-green-500 to-lime-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [borderGradient, setBorderGradient] = useState<string>(generateRandomGradient());
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://pos-backend-jwt-auth.onrender.com/api/bill/bills/orderlist', {
        headers: { Authorization: `${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch recent orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {/* Top blank section */}
      <div className="h-12"></div>

      {/* Recent Orders Section */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-4">Most Sold</h2>

        {/* Scrollable container with gradient border */}
        <div
          className={`border-l-8 ${borderGradient} pl-4 pr-6 space-y-4 overflow-y-auto max-h-[400px]`}
          style={{ backgroundClip: 'padding-box' }}
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 rounded-lg"
              >
                <span className="text-sm font-medium">{order._id}</span>
                <span className="text-sm font-semibold">Quantity: {order.totalQuantity}</span>
              </div>
            ))
          ) : (
            <p>No recent orders available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
