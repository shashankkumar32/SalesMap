'use client'
import Image from "next/image";
import Navbar from "./components/global/navbar";
import { ContainerScroll } from "./components/global/custom-scroll-animation";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "./components/global/3d-cards";
import { CheckIcon } from "lucide-react";
import { LampComponent } from "./components/global/lamp";
import { InfiniteMovingCards } from "./components/global/infinite-moving-cards";
import { HeroParallax } from "./components/global/HeroParallax";
import { clients, products } from "@/lib/constants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Manage Orders",
      description: "Track and manage customer orders in real-time.",
      secondaryDescription: "Get a detailed view of every table and its orders.",
      imageUrl: "/1.png",  // Updated image link for slide 1
    },
    {
      id: 2,
      title: "Inventory Management",
      description: "Efficiently track your inventory.",
      secondaryDescription: "Ensure stock levels are optimized and always up-to-date.",
      imageUrl: "/2.png",  // Updated image link for slide 2
    },
    {
      id: 3,
      title: "Customer Feedback",
      description: "Capture customer feedback and reviews.",
      secondaryDescription: "Improve your services based on customer insights.",
      imageUrl: "/3.png",  // Updated image link for slide 3
    },
    {
      id: 4,
      title: "Staff Management",
      description: "Manage staff schedules and assign roles.",
      secondaryDescription: "Track hours worked and assign tasks to employees.",
      imageUrl: "/4.png",  // Updated image link for slide 4
    },
    {
      id: 5,
      title: "Billing & Payments",
      description: "Generate bills and accept payments digitally.",
      secondaryDescription: "Streamline the checkout process with easy payment options.",
      imageUrl: "/5.png",  // Updated image link for slide 5
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Get detailed analytics on sales and operations.",
      secondaryDescription: "Use insights to improve business performance.",
      imageUrl: "/6.png",  // Updated image link for slide 6
    },
  ];

  const handleNext = () => {

  };

  const handlePrev = () => {

  };

  const setSlide = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const setDiameter = () => {
      const slider = document.querySelector(".slider");
      const widthSlider = slider?.clientWidth ?? 0;
      const heightSlider = slider?.clientHeight ?? 0;
      const diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
      document.documentElement.style.setProperty("--diameter", `${diameter}px`);
    };
    setDiameter();
    window.addEventListener("resize", setDiameter);
    return () => window.removeEventListener("resize", setDiameter);
  }, []);

  return (
    <main className="min-h-screen bg-darkslategray text-white">
       <Navbar/>
      <header className="relative z-10 flex items-center justify-between w-full max-w-screen-xl p-6 mx-auto">
        <figure className="logo">
          <Image src="/image/logo.png" alt="Logo" width={50} height={50} />
        </figure>
        <nav>
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 7h14M5 12h14M5 17h10" />
          </svg>
        </nav>
      </header>
      <section className="relative slider h-[100vh] w-full overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 ${
                activeSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ rotate: -60 }}
                animate={{ rotate: activeSlide === index ? 0 : 60 }}
                transition={{ duration: 1 }}
              >
                {/* Outer Circle */}
                <motion.div
                  className="absolute w-[80vmin] h-[80vmin] rounded-full transition-transform duration-1000"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: activeSlide === index ? 1 : 0.7 }}
                  transition={{ duration: 1 }}
                >
                  {/* SVG Divided Circle */}
                  <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 100 100"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <path
                      d="M50 50 L50 0 A50 50 0 0 1 100 50 Z"
                      fill="rgba(255, 0, 0, 0.3)"
                      onClick={() => setSlide(0)}
                      className="cursor-pointer"
                    />
                    <path
                      d="M50 50 L100 50 A50 50 0 0 1 50 100 Z"
                      fill="rgba(0, 255, 0, 0.3)"
                      onClick={() => setSlide(1)}
                      className="cursor-pointer"
                    />
                    <path
                      d="M50 50 L50 100 A50 50 0 0 1 0 50 Z"
                      fill="rgba(0, 0, 255, 0.3)"
                      onClick={() => setSlide(2)}
                      className="cursor-pointer"
                    />
                    <path
                      d="M50 50 L50 100 A50 50 0 0 1 0 50 Z"
                      fill="rgba(255, 255, 0, 0.3)"
                      onClick={() => setSlide(3)}
                      className="cursor-pointer"
                    />
                    <path
                      d="M50 50 L50 100 A50 50 0 0 1 0 50 Z"
                      fill="rgba(255, 165, 0, 0.3)"
                      onClick={() => setSlide(4)}
                      className="cursor-pointer"
                    />
                    <path
                      d="M50 50 L50 100 A50 50 0 0 1 0 50 Z"
                      fill="rgba(255, 20, 147, 0.3)"
                      onClick={() => setSlide(5)}
                      className="cursor-pointer"
                    />
                  </svg>
                </motion.div>
                {/* Inner Circle */}
                <motion.div
                  className="absolute w-[40vmin] h-[40vmin] rounded-full bg-cover bg-center border-4 border-white transition-transform duration-1000"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: activeSlide === index ? 1 : 0.4 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
              <motion.div className="absolute top-[20%] left-[50%] transform -translate-x-[50%] text-center">
                <motion.h2
                  className="font-bebas text-[10vw] leading-none"
                  initial={{ translateY: "-100%" }}
                  animate={{ translateY: activeSlide === index ? "0%" : "100%" }}
                  transition={{ duration: 1 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p className="text-lg">{slide.description}</motion.p>
                <motion.p className="text-lg">{slide.secondaryDescription}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-10 left-[50%] translate-x-[-50%] flex justify-between w-[90%] max-w-[1200px]">
          <button
            onClick={handlePrev}
            disabled={activeSlide === 0}
            className={`p-4 bg-gray-600 rounded-full ${
              activeSlide === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l-4-4m4 4-4 4"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={activeSlide === slides.length - 1}
            className={`p-4 bg-gray-600 rounded-full ${
              activeSlide === slides.length - 1
                ? "opacity-0 pointer-events-none"
                : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5M19 12l-4 4m4-4l-4-4"
              />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}

