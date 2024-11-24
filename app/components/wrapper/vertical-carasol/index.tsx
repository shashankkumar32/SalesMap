
// 'use client';
// import * as React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { RootState } from "../../store";
// import { addItem, updateQuantity } from "../../store/cartslice";
// import { motion } from "framer-motion";

// const CarouselOrientation = () => {
//   const dispatch = useDispatch();

//   // Select cart items from the Redux store
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   // Handler to increase quantity
//   const handleIncrease = (id: string, quantity: number) => {
//     dispatch(updateQuantity({ id, quantity: quantity + 1 }));
//   };

//   // Handler to decrease quantity
//   const handleDecrease = (id: string, quantity: number) => {
//     if (quantity > 0) {
//       dispatch(updateQuantity({ id, quantity: quantity - 1 }));
//     }
//   };

//   return (


//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       orientation="vertical"
//       className="w-full "
//     >
//       <CarouselContent className="mt-6 mb-0 h-[300px] w-full px-2">
//         {cartItems.map((item) => (
//           <motion.div
//             key={item._id}
//             initial={{ x: -100 }}
//             animate={{ x: 0 }}
//             exit={{ x: -100 }}
//           >
//             <CarouselItem
//               key={item._id}
//               className="w-full my-2 pt-1 md:basis-1/6  rounded-lg  shadow-md"
//               style={{
//                 background: "linear-gradient(236deg, rgba(200,199,255,1) 8%, rgba(47,0,96,1) 79%)",
//               }}
//             >
//               <div className="flex items-center justify-between mx-1 py-2 px-3 rounded-md w-full">
//                 <div className="text-xl font-semibold text-800">
//                   {item.name}
//                 </div>
//                 <div className="text-sm px-1 flex items-center">
//                   <Button
//                     variant="outline"
//                     className="bg-gray-200 h-8 w-8 text-black"
//                     onClick={() => handleIncrease(item._id, item.quantity)}
//                   >
//                     +
//                   </Button>
//                   <div className="px-2 bg-gray-100 rounded-full mx-2 text-gray-800">
//                     {item.quantity}
//                   </div>
//                   <Button
//                     variant="outline"
//                     className="bg-gray-200 h-8 w-8 text-black"
//                     onClick={() => handleDecrease(item._id, item.quantity)}
//                   >
//                     -
//                   </Button>
//                 </div>
//               </div>
//             </CarouselItem>
//           </motion.div>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
 
//   );
// };

// export default CarouselOrientation;
'use client';
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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
import { AiOutlineShoppingCart } from "react-icons/ai"; // Import cart icon

const CarouselOrientation = () => {
  const dispatch = useDispatch();

  // Select cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Handler to increase quantity
  const handleIncrease = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  // Handler to decrease quantity
  const handleDecrease = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="w-full">
      {/* Cart Icon and Item Count */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-t-lg border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <AiOutlineShoppingCart className="text-2xl text-gray-700" />
          <span className="text-gray-800 font-semibold text-lg">
            Cart ({cartItems.length})
          </span>
        </div>
      </div>

      {/* Display Empty Cart Message or Carousel */}
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-b-lg border-t border-gray-300">
          <p className="text-gray-600 font-medium">
            Your cart is empty. Add items to start shopping!
          </p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="mt-6 mb-0 h-[300px] w-full px-2 ">
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
              >
                <CarouselItem
                  key={item._id}
                  className="w-full my-2 pt-1 md:basis-1/6 rounded-lg shadow-md border"
                  // style={{
                  //   background:
                  //     "linear-gradient(236deg, rgba(200,199,255,1) 8%, rgba(47,0,96,1) 79%)",
                  // }}
                >
                  <div className="flex items-center justify-between mx-1 py-2 px-3 rounded-md w-full">
                    <div className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-sm px-1 flex items-center">
                      <Button
                        variant="outline"
                        className="bg-gray-200 h-8 w-8 text-black"
                        onClick={() => handleIncrease(item._id, item.quantity)}
                      >
                        +
                      </Button>
                      <div className="px-2 bg-gray-100 rounded-full mx-2 text-gray-800">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        className="bg-gray-200 h-8 w-8 text-black"
                        onClick={() => handleDecrease(item._id, item.quantity)}
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
      )}
    </div>
  );
};

export default CarouselOrientation;
