
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import { ScrollArea } from '@/components/ui/scroll-area';
import 'reactflow/dist/style.css';
import { Separator } from '@/components/ui/separator';
import { Circles } from 'react-loader-spinner';
import { useRouter } from "next/navigation";
interface Item {
  _id: string;
  itemName: string;
}

interface Category {
  _id: string;
  categoryName: string;
  items: Item[];
}

const Content = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItemNames, setNewItemNames] = useState<{ [key: string]: string }>({}); // State for each category's input
  const router = useRouter();
  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories`, {
        headers: { Authorization: `${token}` },
      });
      setCategories(response.data);
      constructFlow(response.data); // Create React Flow nodes and edges
    } catch (error: any) {
      setError('Failed to fetch categories');
      if (error.response && error.response.status === 401) {
        router.push('/auth');
      }
    }  finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const constructFlow = (data: Category[]) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let categoryX = 200; // Starting X position for category nodes
    let categoryY = 50;  // Starting Y position for category nodes

    data.forEach((category) => {
      // Create category node
      newNodes.push({
        id: category._id,
        data: {
          label: (
            <div className="p-2 bg-blue-500 text-white rounded-md">
              <strong>{category.categoryName}</strong>
              <form
                onSubmit={(e) => addItem(e, category._id)}
                className="flex space-x-2 mt-2"
              >
                <input
                  type="text"
                  value={newItemNames[category._id] || ''} // Bind value to the specific category's input
                  onChange={(e) => handleItemNameChange(e, category._id)} // Handle change correctly
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
              <button
                onClick={() => deleteCategory(category._id)}
                className="text-sm text-red-200 hover:text-red-400 ml-2"
              >
                Delete
              </button>
            </div>
          ),
        },
        position: { x: categoryX, y: categoryY },
        style: { width: 200, height: 50 },
      });

      // Create item nodes and edges
      let itemX = categoryX + 250; // Starting X for item nodes (to the right of the category)
      let itemY = categoryY + 100; // Y position for item nodes, aligning them below the category

      category.items.forEach((item, itemIndex) => {
        const itemId = `${category._id}-${item._id}`;

        newNodes.push({
          id: itemId,
          data: {
            label: (
              <div className="p-2 bg-gray-300 rounded-md">
                <span>{item.itemName}</span>
                <button
                  onClick={() => deleteItem(category._id, item._id)}
                  className="text-sm text-red-600 hover:text-red-800 ml-2"
                >
                  Delete
                </button>
              </div>
            ),
          },
          position: { x: itemX + itemIndex * 250, y: itemY }, // Horizontally adjust based on index
          style: { width: 200, height: 50 },
        });

        newEdges.push({
          id: `${category._id}-${item._id}-edge`,
          source: category._id,
          target: itemId,
          animated: true,
        });
      });

      categoryY += 200; // Adjust the Y position for the next category to add vertical space
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    setNewItemNames((prev) => ({
      ...prev,
      [categoryId]: e.target.value, // Update the input value for this specific category
    }));
  };

  const addItem = async (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items`,
        { itemName: newItemNames[categoryId] },
        {
          headers: { Authorization: `${token}` },
        }
      );
      setNewItemNames((prev) => ({ ...prev, [categoryId]: '' })); // Clear the input for the specific category
      fetchCategories();
    } catch (err) {
      setError('Failed to add item');
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
        { headers: { Authorization: `${token}` } }
      );
      setNewCategoryName('');
      fetchCategories();
    } catch {
      setError('Failed to create category');
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}`, {
        headers: { Authorization: `${token}` },
      });
      fetchCategories();
    } catch {
      setError('Failed to delete category');
    }
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items/${itemId}`,
        { headers: { Authorization: `${token}` } }
      );
      fetchCategories();
    } catch {
      setError('Failed to delete item');
    }
  };

  
if (loading||error) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999
    }}>
      <Circles
        height="80"
        width="80"
        color="#BD8AFF"
        ariaLabel="loading"
      />
    </div>
  );
}
  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Section */}
      <div className="flex items-center space-x-4 border p-4 rounded-md shadow-md bg-gray-50">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={createCategory}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Category
        </button>
        <p className="text-sm text-gray-500">
          Add categories and manage items visually below.
        </p>
      </div>

      {/* Bottom Section: React Flow */}
      <div className="h-[500px] w-full border rounded-lg shadow-md">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background gap={20} />
          <Controls />
        </ReactFlow>
        <ScrollArea className="h-full w-full border rounded-lg p-4 shadow-md">
  <div className="p-4 h-700px">
    {categories.length > 0 ? (
      categories.map((category) => (
        <React.Fragment key={category._id}>
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold">{category.categoryName}</div>
            <button
              onClick={() => deleteCategory(category._id)}
              className="text-red-500 hover:text-red-700 text-sm font-semibold border-2 border-red-500 px-4 py-2 rounded-md shadow-md hover:bg-red-100"
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
              className="px-4 py-2 bg-[#BD8AFF] text-white rounded-md hover:bg-purple-500 border-2 border-[#BD8AFF] font-semibold shadow-md"
            >
              Add Item
            </button>
          </form>

          {category.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center pl-4 border-b-2 border-l-2 border-gray-300 py-2"
            >
              <div className="text-sm text-gray-600">{item.itemName}</div>
              <button
                onClick={() => deleteItem(category._id, item._id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold border-2 border-red-500 px-4 py-2 rounded-md shadow-md hover:bg-red-100"
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

export default Content;

