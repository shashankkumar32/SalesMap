import * as React from "react";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { CardSpotlight } from "../wowCard/card-spotlight";
interface Category {
  _id: string;
  categoryName: string; // Assuming the category has a name field
}

interface CarouselSpacingProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

// const d = [
//   { title: "shashank", description: "hey this is me", link: "/shasha" },
//   { title: "shashank", description: "hey this is me", link: "/shasha" },
//   { title: "shashank", description: "hey this is me", link: "/shasha" },
//   { title: "shashank", description: "hey this is me", link: "/shasha" },
//   { title: "shashank", description: "hey this is me", link: "/shasha" },
//   { title: "shashank", description: "hey this is me", link: "/shasha" },{title:"shashank",description:"hey this is me",link:"/shasha"},{title:"shashank",description:"hey this is me",link:"/shasha"},{title:"shashank",description:"hey this is me",link:"/shasha"},{title:"shashank",description:"hey this is me",link:"/shasha"}
//   ,{title:"shashank",description:"hey this is me",link:"/shasha"},{title:"shashank",description:"hey this is me",link:"/shasha"}
// ];

const  CarouselSpacing=({ categories, onCategoryClick }: CarouselSpacingProps)=> {
  // Split the data into pairs of two items each for vertical stacking
  const pairedData = [];
  for (let i = 0; i < categories?.length; i += 2) {
    if(i+1==categories.length){
      pairedData?.push([categories[i]]);
    }
    pairedData?.push([categories[i], categories[i + 1]]);
  }

  return (
    <Carousel className="w-full ">
      <CarouselContent className="my-1">
        {pairedData.map((pair, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 px-3">
              {/* <Card> */}
                {/* <CardContent className="flex flex-col space-y-4"> */}
                  {/* Render the two items vertically */}
                  {pair?.map((item, i) => (
                      <CardSpotlight onClick={() => onCategoryClick(item._id)}>
                    <div key={i} onClick={() => onCategoryClick(item._id)} className="flex flex-col items-center justify-center my-0 p-4 border rounded-md ml-0">
                      <div className="text-xl font-semibold" >{item?.categoryName}</div>
                      <div className="text-sm">{item?._id}</div>
                    </div>
                    </CardSpotlight>
                  ))}
                {/* </CardContent> */}
              {/* </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarouselSpacing
// import * as React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";

// interface Category {
//   _id: string;
//   name: string; // Assuming the category has a name field
// }

// interface CarouselSpacingProps {
//   categories: Category[];
//   onCategoryClick: (categoryId: string) => void;
// }

// export function CarouselSpacing({ categories, onCategoryClick }: CarouselSpacingProps) {
//   return (
//     <Carousel className="w-full ">
//       <CarouselContent className="-ml-1">
//         {categories.map((category) => (
//           <CarouselItem key={category._id} className="pl-1 md:basis-1/2 lg:basis-1/3">
//             <div className="p-1">
//               <div
//                 className="flex flex-col items-center justify-center my-2 p-4 border rounded-md cursor-pointer"
//                 onClick={() => onCategoryClick(category._id)}
//               >
//                 <div className="text-xl font-semibold">{category.name}</div>
//               </div>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
