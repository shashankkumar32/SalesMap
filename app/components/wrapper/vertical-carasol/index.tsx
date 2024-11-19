// import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import { Button } from "@/components/ui/button"


    
// const CarouselOrientation=(props:any)=> {
//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       orientation="vertical"
//       className="w-full  "
//     >
//       <CarouselContent className="mt-6 h-[400px] w-full px-2">
//         {props.array.map((d: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
//           <CarouselItem key={index} className="w-full  pt-1  md:basis-1/6">
         
//               <div key={index} className="flex  items-center justify-between mx-1 py-1 px-3 border rounded-md w-full">
//             <div className="text-xl font-semibold">{d.name}</div>
//             <div className="text-sm px-1 flex">
//            <Button
//                 variant="outline"
//                 className="bg-pink-300 h-8 w-8 text-black"
//               >
//                 +
//               </Button>
//         <div className="px-2"> {d.name} </div>
//           <Button
//                 variant="outline"
//                 className="bg-pink-300 h-8 w-8 text-black"
//               >
//                 -
//               </Button>
//         </div>
//           </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }
// export default CarouselOrientation
'use client'
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
// Import the actions


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RootState } from "../../store";
import { addItem, updateQuantity } from "../../store/cartslice";
import { motion } from "framer-motion";

const CarouselOrientation = () => {
  const dispatch = useDispatch();

  // Select cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Handler to increase quantity
  const handleIncrease = (id: string,quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  // Handler to decrease quantity
  const handleDecrease = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="mt-6 mb-0 h-[300px] w-full px-2">
        {cartItems.map((item,i) => (
          <motion.div  key={item._id} initial={{ x: -100 }} animate={{ x: 0 }} exit={{ x: -100 }}>
          <CarouselItem key={item._id} className="w-full pt-1 md:basis-1/6">
            <div className="flex items-center justify-between mx-1 py-1 px-3 border rounded-md w-full">
              <div className="text-xl font-semibold">{item.name}</div>
              <div className="text-sm px-1 flex items-center">
                <Button
                  variant="outline"
                  className="bg-pink-300 h-8 w-8 text-black"
                  onClick={() => handleIncrease(item._id, item.quantity)} // Increase quantity
                >
                  +
                </Button>
                <div className="px-2">{item.quantity}</div>
                <Button
                  variant="outline"
                  className="bg-pink-300 h-8 w-8 text-black"
                  onClick={() => handleDecrease(item._id, item.quantity)} // Decrease quantity
                >
                  -
                </Button>
              </div>
            </div>
          </CarouselItem>
          </motion.div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselOrientation;
