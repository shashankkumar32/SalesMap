
'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "@/app/components/menuItem_container";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PlaceOrderButton from './inc/custom-button'
// import { CarouselSpacing } from "@/app/components/categoryList";
import SideCartList from "@/app/components/cartlist.tsx";
import CarouselOrientation from "@/app/components/wrapper/vertical-carasol";
import { Separator } from "@/components/ui/separator";
import ZoomButton from "@/app/components/zoom";
import CarouselSpacing from "@/app/components/categoryList";
import { BackgroundBeamsWithCollision } from "@/app/components/bg-wrappper/background-beams-with-collision";
import { useRouter} from "next/navigation";

const Menu = () => {
  const [categories, setCategories] = useState<any[]>([]); // Use appropriate type for categories
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemList, setItemList] = useState<any[]>([]); // Use appropriate type for items
  const router=useRouter()
  // Fetch categories
  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://pos-backend-jwt-auth.onrender.com/api/categories`, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      console.log(response.data)
      setCategories(response.data);
    } catch (error:any) {
      setError('Failed to fetch categories');
      if (error.response && error.response.status === 401) {
        router.push('/auth');
      }
      console.log(error);
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
      console.log(response.data)
      setItemList(response.data); // Assuming response data is the array of items
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log(categoryId)
    fetchItems(categoryId); // Fetch items associated with the selected category
  };

  return (
    
    <div className="w-300px h-full px-2 pt:1">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full mt-0 h-full rounded-lg  md:min-w-[350px]"
      >
        <ResizablePanel defaultSize={65}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={30}>
              <CarouselSpacing categories={categories} onCategoryClick={handleCategoryClick} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <div className="overflow-y-scroll h-[600px]">
                <HoverEffect items={itemList} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        {/* <ResizableHandle /> */}
        <ResizablePanel defaultSize={25}>
        {/* <BackgroundBeamsWithCollision> */}
          <div className=" h-[500px] items-center w-full justify-center p-0  border">
          <div className="flex flex-col gap-4 relative">
    <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
      Dashboard
    </h1>
  </div>
            <CarouselOrientation  />
          {/* <Separator /> */}
          </div>
    {/* </BackgroundBeamsWithCollision> */}
    <div className='mt-8'>

    </div>
         <PlaceOrderButton/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Menu;
