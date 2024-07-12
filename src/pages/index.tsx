import React from 'react';
import Header from '@/components/Header';
import ChatSection from '@/components/ChatSection';
import ItinerarySection from '@/components/ItinerarySection';

const TripPlanner: React.FC = () => {
  return (
    <div className="flex flex-col px-12 py-14 bg-neutral-100 max-md:px-5 h-screen overflow-hidden shrink-0">
      <Header />
      <div className="mt-11 max-md:mt-10 max-md:max-w-full flex gap-5 max-md:flex-col max-md:gap-0 flex-grow overflow-hidden">
        <ChatSection />
        <ItinerarySection />
      </div>
    </div>
  );
};

export default TripPlanner;
