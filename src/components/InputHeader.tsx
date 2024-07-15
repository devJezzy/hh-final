import React from "react";
import Image from 'next/image';

interface HeaderProps {
  loaderWidth: string;
}

const Header: React.FC<HeaderProps> = ({ loaderWidth }) => {
  const loaderClass = `breaker-loader w-[${loaderWidth}%]`;
  return (
    <div className="w-full flex flex-col">
      <Image
        src="/logo.png" 
        alt="Mountains"
        width={100}
        height={100}
        priority
        className="py-10 self-center"
      />
      <div className="breaker-loader" style={{width:`${loaderWidth}%`}}/>
      <div className="breaker"/>
    </div>
  );
};

export default Header;
