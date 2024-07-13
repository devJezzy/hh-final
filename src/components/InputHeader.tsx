import React from "react";
import Image from 'next/image';

const Header: React.FC = () => {
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
      <div className="breaker-loader" />
      <div className="breaker" />
    </div>
  );
};

export default Header;
