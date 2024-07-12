import React from "react";

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
  return (
    <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
      <div className="flex flex-col justify-center items-center self-start px-2 mt-4 w-6 h-6 rounded-full bg-zinc-300">
        <div className="shrink-0 w-2.5 h-2.5 bg-[#9AAC47] rounded-full" />
      </div>
      <div className="flex-auto p-4 light-gray rounded-xl max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow mt-1.5 max-md:mt-10">
              <h3 className="text-2xl font-medium tracking-tight text-black">
                {title}
              </h3>
              <p className="mt-3 text-base tracking-tight text-zinc-600">
                {time}
              </p>
              <p className="mt-3.5 text-lg tracking-tight text-neutral-400">
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
                className="grow shrink-0 max-w-full aspect-[1.04] w-[110px] max-md:mt-10 rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
