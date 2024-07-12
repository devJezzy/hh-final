import React, { useEffect, useState } from "react";
import DaySelector from "./DaySelector";
import ItineraryItem from "./ItineraryItem";
import getResponse from "@/utils/gemini";
import searchImages from "@/utils/getImage";

const ItinerarySection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState<{ [key: string]: { title: string; time: string; activity: string; imageSrc: string; }[] }>({});

  const getTripPlan = async () => {
    const res = await getResponse("2 days relaxation trip in chennai");
    const trip_plan = JSON.parse(res);
    
    for (const key in trip_plan) {
      if (trip_plan.hasOwnProperty(key)) {
        const items = trip_plan[key];
        for (let i = 0; i < items.length; i++) {
          const title = items[i].title;
          const result = await searchImages(title);
          const imageSrc = result[0]?.largeImageURL || null;
          items[i].imageSrc = imageSrc;
        }
      }
    }

    setItinerary(trip_plan);
  };

  useEffect(() => {
    getTripPlan();
  }, []);

  const days = Object.keys(itinerary);

  return (
    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col p-6 text-base leading-7 text-black rounded-xl border border-solid border-[#9AAC47] border-opacity-30 max-md:px-5 max-md:mt-5 max-md:max-w-full overflow-hidden mb-5 h-full">
        <div className="flex gap-2 self-start text-sm tracking-tight text-[#9AAC47]">
          {days.map((day, index) => (
            <button
              key={index}
              className={`justify-center px-7 py-2 rounded-3xl border border-[#9AAC47] border-solid max-md:px-5 ${
                selectedDay === parseInt(day) ? "text-white bg-[#9AAC47]" : ""
              }`}
              onClick={() => setSelectedDay(parseInt(day))}
            >
              Day {day}
            </button>
          ))}
        </div>
        <div className="plans-container overflow-hidden-vertical">
        {itinerary[selectedDay.toString()] &&
          itinerary[selectedDay.toString()].map((item, index) => (
            <ItineraryItem key={index} {...item} />
          ))}
          </div>
      </div>
    </div>
  );
};

export default ItinerarySection;
