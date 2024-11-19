
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Item {
  _id: string;
  itemName: string;
}

interface Category {
  _id: string;
  categoryName: string;
  items: Item[];
}

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemNames, setNewItemNames] = useState<{ [key: string]: string }>({}); // State for each category's input

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      fetchCategories();
    } catch (err) {
      setError('Failed to delete category');
      console.log(err);
    }
  };

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `https://pos-backend-jwt-auth.onrender.com/api/categories`,
        { categoryName: newCategoryName },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setNewCategoryName('');
      fetchCategories();
    } catch (err) {
      setError('Failed to create category');
      console.log(err);
    }
  };

  const addItem = async (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items`,
        { itemName: newItemNames[categoryId] },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setNewItemNames((prev) => ({ ...prev, [categoryId]: '' })); // Clear the input for the specific category
      fetchCategories();
    } catch (err) {
      setError('Failed to add item');
      console.log(err);
    }
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items/${itemId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchCategories();
    } catch (err) {
      setError('Failed to delete item');
      console.log(err);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        <form
          onSubmit={createCategory}
          className="flex flex-col space-y-4 p-4 border rounded-lg lg:w-1/3 shadow-md"
        >
          <h3 className="text-lg font-medium">Create New Category</h3>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Category
          </button>
        </form>

        <ScrollArea className="h-72 w-full lg:w-2/3 border rounded-lg p-4 shadow-md">
          <div className="p-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <React.Fragment key={category._id}>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold">{category.categoryName}</div>
                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => addItem(e, category._id)}
                    className="flex space-x-2 mt-2"
                  >
                    <input
                      type="text"
                      value={newItemNames[category._id] || ''} // Bind value to the specific category
                      onChange={(e) =>
                        setNewItemNames((prev) => ({
                          ...prev,
                          [category._id]: e.target.value,
                        }))
                      }
                      placeholder="New Item Name"
                      className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Add Item
                    </button>
                  </form>

                  {category.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center pl-4"
                    >
                      <div className="text-sm text-gray-600">{item.itemName}</div>
                      <button
                        onClick={() => deleteItem(category._id, item._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <Separator className="my-2" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-sm text-gray-500">No categories available</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoriesList;
