'use client';

import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/components/store';

import { useModal } from '@/provider/model-provider';
import { clearCart } from '@/app/components/store/cartslice';

const BillsTable: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { setClose } = useModal();

  const formattedCartItems = cartItems.map((item) => ({
    itemName: item.name,
    quantity: item.quantity,
    totalAmount: item.price * item.quantity,
  }));

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCreateBill = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const billData = { cartItems: formattedCartItems };

      await axios.post('https://pos-backend-jwt-auth.onrender.com/api/bill/bills', billData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(clearCart()); // Clear the cart after successful bill creation
      setClose();
      alert('Bill created successfully!');
    } catch (error) {
      console.error('Error creating bill:', error);
      alert('Error creating bill.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Bills</h1>
      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleCreateBill}
      >
        Create Bill
      </button>
      <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Bill</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 text-left">Item</th>
              <th className="py-2 text-right">Quantity</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="py-2">{item.name}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="font-bold text-right">Total Amount</td>
              <td className="font-bold text-right">${totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillsTable;
