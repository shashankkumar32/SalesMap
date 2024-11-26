import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  totalQuantity: number;
}

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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
      {/* Padded "Sold Items" Section */}
      <div
        className="text-center py-2 px-4 font-bold text-xl rounded-lg shadow-md mb-4"
        style={{
          // backgroundColor: 'black', // Default light mode background
          color: 'white', // Default light mode text color
        }}
      >
        <p className="dark:bg-grey  rounded-lg px-6  shadow-lg inline-block">
          Sold Items
        </p>
      </div>

      {/* Recent Orders Section */}
      <div className="flex flex-col">
        

        {/* Scrollable container with consistent gradient border */}
        <div
          className="p-4 space-y-4 overflow-y-auto max-h-[400px] rounded-lg shadow-md"
          style={{
            border: '4px solid',
            borderRadius: '8px',
            borderImage: 'linear-gradient(90deg, #BD8AFF, #7540A9, #C8C7FF) 1',
            // backgroundColor: 'white',
          }}
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {order._id}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Quantity: {order.totalQuantity}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No recent orders available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
