import React, { createContext, useState, ReactNode, useContext } from "react";

interface TripPropsContext {
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  IsLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TripContext = createContext<TripPropsContext | undefined>(undefined);

export const GetTripProps = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("GetTripProps must be used within a Provider");
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [duration, setDuration] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  return (
    <TripContext.Provider
      value={{ duration, setDuration ,destination, setDestination ,style, setStyle,IsLoading, setIsLoading }}
    >
      {children}
    </TripContext.Provider>
  );
};
