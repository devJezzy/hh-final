import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ChatSection from '@/components/ChatSection';
import ItinerarySection from '@/components/ItinerarySection';
import ChatBot from '@/components/chatBot';

const TripPlanner: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col px-12 py-14 bg-neutral-100 h-screen overflow-hidden shrink-0
            max-lg:px-6 max-md:px-4 max-sm:px-2 max-xs:px-1
            max-lg:py-8 max-md:py-6 max-sm:py-4 max-xs:py-2">
      {isMobile ? <ChatBot /> : null}
      <Header />
      <div className="mt-11 max-md:mt-0 max-md:max-w-full flex gap-5 max-md:flex-col max-md:gap-0 flex-grow overflow-hidden text-base max-md:text-sm max-sm:text-xs">
        {!isMobile ? <ChatSection /> : null}
        <ItinerarySection />
      </div>
    </div>
  );
};

export default TripPlanner;
