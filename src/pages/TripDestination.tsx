import React, { FormEvent, useEffect, useState } from "react";
import Header from "@/components/InputHeader";
import Select from "react-dropdown-select";
import { FaSearch } from "react-icons/fa";
import { GetTripProps } from "@/context/TripContext";
import router from "next/router";

interface Option {
  label: string;
  value: number;
}

const SearchComponent: React.FC = () => {
  const options: Option[] = [
    { label: "Kerala", value: 1 },
    { label: "Goa", value: 2 },
    { label: "Himachal", value: 3 },
    { label: "Andaman", value: 4 },
    { label: "Sikkim", value: 5 },
    { label: "Mysore", value: 6 },
    { label: "Kodaikanal", value: 7 },
    { label: "Ooty", value: 8 },
    { label: "Coorg", value: 9 },
    { label: "Yercaud", value: 10 },
    { label: "Delhi", value: 11 },
    { label: "International Destinations", value: 12 },
    { label: "Thailand", value: 13 },
    { label: "Singapore", value: 14 },
    { label: "Srilanka", value: 15 },
    { label: "Europe", value: 16 },
    { label: "Mauritius", value: 17 },
    { label: "Maldives", value: 18 },
    { label: "Malaysia", value: 1 },
    { label: "dubai", value: 19 },
    { label: "Bali", value: 20 },
    { label: "Vietnam", value: 21 },
  ];
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  const { duration, setDestination } = GetTripProps();

  const handleSubmit = () => {
    if (!selectedValues) {
      return;
    }
    const duration = String(selectedValues[0].label);
    console.log(duration);

    setDestination(duration);
    router.push({
      pathname: "/TripStyle",
      query: { /* any query params you might want to pass */ },
    }, '/trip-style');
  };

  useEffect(() => {
    if (!duration) {
      router.push({
        pathname: "/",
      });
    }
  });

  const handleChange = (values: Option[]) => {
    console.log(values[0].value);
    setSelectedValues(values);
  };
  return (
    <main className="flex flex-col items-center min-h-screen text-base max-md:text-sm max-sm:text-xs">
      <Header loaderWidth="66" />
      <h2 className="mt-28 text-2xl max-md:text-lg tracking-tighter text-black max-md:mt-10">
        Where do you want to go?
      </h2>
      <form onSubmit={handleSubmit} className="flex mt-10 border rounded-full">
        <FaSearch className="self-center mx-4" />
        <Select
          name="travelDays"
          placeholder="Travel Destination"
          options={options}
          values={selectedValues}
          onChange={handleChange}
          style={{ width: "300px", border: "none" }}
          color="gray"
          required
        />
      </form>
      <div
        className="mt-auto w-full flex"
        style={{
          height: "10%",
          borderTop: "1px solid #CDCDCD",
          backgroundColor: "white",
          boxShadow: "rgb(165 165 165 / 10%) 0px -3px 0px",
        }}
      >
        <button
          onClick={handleSubmit}
          className="my-[2%] ml-[55%] px-16 py-4 tracking-tight rounded-full text-white whitespace-nowrap bg-black shadow-xl max-md:px-10"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default SearchComponent;
