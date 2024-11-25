'use client'
import React, { useEffect, useState } from 'react';
import BillsStack from './inc/table';
import MobileBillsStack from './inc/mobiletable';

type Props = {};

const DashboardPage: React.FC<Props> = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check the screen width
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 950); // Adjust breakpoint as needed
    };

    // Initial check
    checkDeviceType();

    // Add a resize event listener
    window.addEventListener('resize', checkDeviceType);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="flex justify-center items-center border-b">
        {isMobile ? <MobileBillsStack /> : <BillsStack />}
      </h1>
    </div>
  );
};

export default DashboardPage;
