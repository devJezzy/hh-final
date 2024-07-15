import React, { FormEvent, useEffect, useState } from 'react';
import Header from '@/components/InputHeader';
import Select from 'react-dropdown-select';
import { FaSearch } from 'react-icons/fa';
import { GetTripProps } from '@/context/TripContext';
import router from 'next/router';


interface Option {
  label: string;
  value: number;
}

const SearchComponent: React.FC = () => {
  const options: Option[] = [
    { label: "Family-Friendly", value: 1 },
    { label: "Romantic for Couples", value: 2 },
    { label: "Adventure and Outdoor", value: 3 },
    { label: "Cultural and Historical", value: 4 },
  ];
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const {setStyle,duration,destination } = GetTripProps();

  const handleSubmit = () => {
    if (!selectedValues) {
      return;
    }
    const duration = String(selectedValues[0].label)
    console.log(duration)
    setStyle(duration);
    router.push({
      pathname: "/TripPlan",
      query: { /* any query params you might want to pass */ },
    }, '/TripPlan'); // Specify your custom URL path here
  };

  useEffect(() => {
    if (!duration || !destination) {
      router.push({
        pathname: "/",
      });
    }
  });
  
  const handleChange = (values: Option[]) => {
    console.log(values)
    setSelectedValues(values);
  };
  
  return (
    <main className="flex flex-col items-center min-h-screen text-base max-md:text-sm max-sm:text-xs">
      <Header loaderWidth="100"/>
      <h2 className="mt-28 text-2xl max-md:text-lg tracking-tighter text-black max-md:mt-10">
      How do you want to spend your time ?
      </h2>
      <form onSubmit={handleSubmit} className="flex mt-10 border rounded-full">
      <FaSearch className="self-center mx-4"/>
        <Select
          name="travelDays"
          placeholder="Travel Style"
          options={options}
          values={selectedValues}
          onChange={handleChange}
          style={{ width : "300px" , border : "none"}} 
          color="gray"
          required
        />
      </form>
      <div className="mt-auto w-full flex" style={{ height: '10%', borderTop: '1px solid #CDCDCD', backgroundColor: 'white', boxShadow: 'rgb(165 165 165 / 10%) 0px -3px 0px' }}>
        <button onClick={handleSubmit} className="my-[2%] ml-[55%] px-16 py-4 tracking-tight rounded-full text-white whitespace-nowrap bg-black shadow-xl max-md:px-10">
          Next
        </button>
      </div>
    </main>
  );
};

export default SearchComponent;
