
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import React from "react";

interface CarouselSpacingProps {
  categories: { categoryName: string; _id: string; items: { itemName: string; _id: string }[] }[];
  onCategoryClick: (categoryId: string) => void;
}

const CarouselSpacing: React.FC<CarouselSpacingProps> = ({ categories, onCategoryClick }) => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0, // No rotation
        stretch: 0, // No extra spacing
        depth: 150, // Adjust depth for 3D layering
        modifier: 1.5, // Enhances the zoom effect
        slideShadows: false, // No shadows for a cleaner look
      }}
      modules={[EffectCoverflow]}
      style={{ padding: "20px 0" }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id} style={{ width: "250px", height: "200px" }}  onClick={() => onCategoryClick(category._id)}>
          <div
            onClick={() => onCategoryClick(category._id)}
            className="card-container"
          >
            <h3 className="card-title">{category.categoryName}</h3>
          </div>
        </SwiperSlide>
      ))}
      <style jsx>{`
        .card-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
    
background: rgb(200,199,255);
background: linear-gradient(236deg, rgba(200,199,255,1) 8%, rgba(47,0,96,1) 79%);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
          transform: scale(0.8);
          transition: transform 0.5s ease-in-out, opacity 0.3s ease;
          opacity: 0.8; /* Slight fade for non-center cards */
        }

        .swiper-slide-active .card-container {
          transform: scale(1.2); /* Highlight center card */
          opacity: 1; /* Fully visible center card */
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25);
        }

        .swiper-slide-prev .card-container,
        .swiper-slide-next .card-container {
          transform: scale(1); /* Intermediate size for next/prev cards */
          opacity: 0.9;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
          text-align: center;
        }
      `}</style>
    </Swiper>
  );
};

export default CarouselSpacing;
