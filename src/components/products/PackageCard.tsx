import React from "react";
import type { CardProps } from "../../Types/data.types";

function PackageCard({ title, imgUrl, detail }: CardProps) {
  return (
    <div className="relative flex flex-col rounded-lg bg-white shadow-[0_5px_5px_rgba(0,0,0,0.25)] bg-clip-border w-[380px] h-[438px] flex items-center justify-center">
      <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border w-full h-[272px] rounded-t-lg">
        <img
          src={imgUrl}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 text-center ">
        <div className="mb-2">
          <p className="text-[#142B41] text-[18px] font-bold">
            {title}
          </p>
        </div>
        <p className="text-[#142B41] text-[14px] font-normal">
          {detail}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className=" font-semibold text-center text-base text-center rounded-full  block w-[139px] h-[48px] bg-[#2A4B6A] text-white drop-shadow-lg "
          type="button"
        >
          Buy Package
        </button>
      </div>
    </div>
  );
}
export default PackageCard;

