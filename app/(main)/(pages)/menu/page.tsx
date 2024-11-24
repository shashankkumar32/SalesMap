
// 'use client';

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { HoverEffect } from "@/app/components/menuItem_container";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import PlaceOrderButton from './inc/custom-button'
// // import { CarouselSpacing } from "@/app/components/categoryList";
// import SideCartList from "@/app/components/cartlist.tsx";
// import CarouselOrientation from "@/app/components/wrapper/vertical-carasol";
// import { Separator } from "@/components/ui/separator";
// import ZoomButton from "@/app/components/zoom";
// import CarouselSpacing from "@/app/components/categoryList";
// import { BackgroundBeamsWithCollision } from "@/app/components/bg-wrappper/background-beams-with-collision";
// import { useRouter} from "next/navigation";

// const Menu = () => {
//   const [categories, setCategories] = useState<any[]>([]); // Use appropriate type for categories
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [itemList, setItemList] = useState<any[]>([]); // Use appropriate type for items
//   const router=useRouter()
//   // Fetch categories
//   const fetchCategories = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories`, {
//         headers: {
//           'Authorization': `${token}`,
//         },
//       });
//       console.log(response.data)
//       setCategories(response.data);
//     } catch (error:any) {
//       setError('Failed to fetch categories');
//       if (error.response && error.response.status === 401) {
//         router.push('/auth');
//       }
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch items based on selected category
//   const fetchItems = async (categoryId: string) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items`, {
//         headers: {
//           'Authorization': `${token}`,
//         },
//       });
//       console.log(response.data)
//       setItemList(response.data); // Assuming response data is the array of items
//     } catch (err:any) {
//       setError('Failed to fetch items');
//       if (err.response && err.response.status === 401) {
//         router.push('/auth');
//       }
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     console.log(categoryId)
//     fetchItems(categoryId); // Fetch items associated with the selected category
//   };

//   return (
    
//     <div className="w-300px h-full px-2 pt:1  ">
//       <div className="flex flex-col md:flex-row h-full w-full">
//   {/* Left Panel - 70% on desktop, full width on mobile */}
//   <div className="flex-1 md:w-[70%] h-full">
//     <ResizablePanelGroup
//       direction="horizontal"
//       className="w-full mt-0 h-full rounded-lg md:min-w-[350px]"
//     >
//       <ResizablePanel defaultSize={65}>
//         <ResizablePanelGroup direction="vertical">
//           <ResizablePanel defaultSize={30}>
//             <CarouselSpacing
//               categories={categories}
//               onCategoryClick={handleCategoryClick}
//             />
//           </ResizablePanel>
//           <ResizableHandle />
//           <ResizablePanel defaultSize={70}>
//             <div className="overflow-y-scroll h-[600px]">
//               <HoverEffect items={itemList} />
//             </div>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   </div>

//   {/* Right Panel - 30% on desktop, full width on mobile */}
//   <div className="flex-1 md:w-[25%] h-full">
//     <CarouselOrientation />
//   </div>
// </div>

// ''
//       {/* <ResizablePanelGroup
//         direction="horizontal"
//         className="w-full mt-0 h-full rounded-lg  md:min-w-[350px]"
//       >
//         <ResizablePanel defaultSize={65}>
//           <ResizablePanelGroup direction="vertical">
//             <ResizablePanel defaultSize={30}>
//               <CarouselSpacing categories={categories} onCategoryClick={handleCategoryClick} />
//             </ResizablePanel>
//             <ResizableHandle />
//             <ResizablePanel defaultSize={70}>
//               <div className="overflow-y-scroll h-[600px]">
//                 <HoverEffect items={itemList} />
//               </div>
//             </ResizablePanel>
//           </ResizablePanelGroup>
//         </ResizablePanel>

//       </ResizablePanelGroup>
//       <CarouselOrientation  /> */}
//          {/* <PlaceOrderButton/> */}
//     </div>
//   );
// };

// export default Menu;
'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "@/app/components/menuItem_container";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PlaceOrderButton from './inc/custom-button';
import SideCartList from "@/app/components/cartlist.tsx";
import CarouselOrientation from "@/app/components/wrapper/vertical-carasol";
import { Separator } from "@/components/ui/separator";
import ZoomButton from "@/app/components/zoom";
import CarouselSpacing from "@/app/components/categoryList";
import { BackgroundBeamsWithCollision } from "@/app/components/bg-wrappper/background-beams-with-collision";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [categories, setCategories] = useState<any[]>([]); // Use appropriate type for categories
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemList, setItemList] = useState<any[]>([]); // Use appropriate type for items
  const router = useRouter();

  // Fetch categories
  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setCategories(response.data);
    } catch (error: any) {
      setError('Failed to fetch categories');
      if (error.response && error.response.status === 401) {
        router.push('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch items based on selected category
  const fetchItems = async (categoryId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories/${categoryId}/items`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setItemList(response.data); // Assuming response data is the array of items
    } catch (err: any) {
      setError('Failed to fetch items');
      if (err.response && err.response.status === 401) {
        router.push('/auth');
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchItems(categoryId);
  };

  return (
    <div className="w-300px h-full px-2 pt-1">
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left Panel */}
        <div className="flex-3 md:w-[70%] h-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full mt-0 h-full rounded-lg md:min-w-[350px]"
          >
            <ResizablePanel defaultSize={65}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={30}>
                  <CarouselSpacing
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70}>
                  {selectedCategory === null && (
                    <div className="flex items-center justify-center h-full border-white-2px ">
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
    <p className="text-gray-700 font-semibold text-center">
      Please select a category to view the items. Choose from the list on the left to get started!
    </p>
  </div>
                      {/* <p className="text-800  font-bold">Please select a category</p> */}
                    </div>
                  )}
                  {selectedCategory !== null && (
                    <div className="overflow-y-scroll h-[600px]">
                      <HoverEffect items={itemList} />
                    </div>
                  )}
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Right Panel */}
        <div className="flex-1 md:w-[25%] h-full">
        <div className="border  p-4 h-full rounded-lg">
          <CarouselOrientation />
          <PlaceOrderButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
