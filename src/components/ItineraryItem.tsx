import React from "react";
import { GetTripProps } from '@/context/TripContext';
import { CgArrowLongRight } from "react-icons/cg";

interface ItineraryItemProps {
  title: string;
  time: string;
  activity: string;
  imageSrc?: string;
}

const ItineraryItem: React.FC<ItineraryItemProps> = ({
  title,
  time,
  activity,
  imageSrc,
}) => {
  const { destination } = GetTripProps();
  const mapUrl = `https://www.google.com/maps/search/${title.replace(
    / /g,
    "+"
  )}+in+${destination}`;
  const findHotelsURL =`https://happyholidays.in/package/?pa_destination=${destination}`
  return (
    <a
      href={mapUrl}
      target="_blank"
      className="flex gap-4 max-md:gap-2 max-md:max-w-full"
    >
      <div className="flex flex-col justify-center items-center self-start px-2 mt-4 max-md:w-5 max-md:h-5 w-6 h-6 rounded-full bg-zinc-300">
        <div className="shrink-0 w-2.5 h-2.5 bg-[#9AAC47]  rounded-full" />
      </div>
      <div className="flex-auto p-4 light-gray rounded-xl max-md:max-w-full hover:shadow-md border">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow">
              <p className="text-2xl max-md:text-xl font-medium tracking-tight text-black">
                {title}
              </p>
              <p className="mt-3 tracking-tight text-zinc-600">{time}</p>
              <p className="mt-3.5 tracking-tight text-neutral-400">
                {activity}
              </p>
            </div>
          </div>
          {imageSrc && (
            <div className="flex flex-col shrink-0 ml-auto max-md:ml-0 max-md:w-full self-end">
              <img
                loading="lazy"
                src={imageSrc}
                alt={title}
                className="grow shrink-0 max-w-full aspect-[1.04] w-[110px] max-md:mt-2 rounded-xl"
              />
            </div>
          )
        }
          { (time.toLowerCase() == "bedtime") && (
            <a
            href={findHotelsURL} target="_blank" className="flex rounded-md bg-[#9AAC47] text-white px-4 py-2 items-center gap-2 self-center ml-auto max-md:ml-0 shrink-0">
            Find Hotels <CgArrowLongRight/> 
        </a>
          )
          }
        </div>
      </div>
    </a>
  );
};

export default ItineraryItem;
