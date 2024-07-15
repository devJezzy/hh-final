import React, { FormEvent, useState } from 'react';
import Header from '@/components/InputHeader';
import Select from 'react-dropdown-select';
import { FaSearch } from 'react-icons/fa';
import { GetTripProps } from '@/context/TripContext';
import router from 'next/router';
import { GiConsoleController } from 'react-icons/gi';


interface Option {
  label: string;
  value: number;
}

const SearchComponent: React.FC = () => {
  const options: Option[] = [
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "4 days", value: 4 },
    { label: "5 days", value: 5 },
    { label: "6 days", value: 6 },
    { label: "7 days", value: 7 },
  ];
  
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const {setDuration } = GetTripProps();

  const handleSubmit = () => {
    if (!selectedValues) {
      return;
    }
    const duration = String(selectedValues[0].value)
    setDuration(duration);
    router.push({
      pathname: "/destination",
    });
  };
  
  
  const handleChange = (values: Option[]) => {
    console.log(values[0].value)
    setSelectedValues(values);
  };
  
  return (
    <main className="flex flex-col items-center min-h-screen text-base max-md:text-sm max-sm:text-xs">
      <Header loaderWidth="33"/>
      <h2 className="mt-28 text-2xl max-md:text-lg tracking-tighter text-black max-md:mt-10">
      How many days do you want to go?
      </h2>
      <form onSubmit={handleSubmit} className="flex mt-10 border rounded-full">
      <FaSearch className="self-center mx-4"/>
        <Select
          name="travelDays"
          placeholder="Travel Days"
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
