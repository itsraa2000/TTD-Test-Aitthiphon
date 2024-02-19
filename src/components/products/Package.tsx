import React from "react";
import PackageCard from "./PackageCard";
import product from "../../data/packageproduct.json";

function Package() {
  return (
    <div>
      <div className="py-[60px] max-w-[1628px] mx-auto ">
        <div className="mb-[40px] font-bold text-[32px] text-[#142B41] flex items-center justify-center ">
        <h1>Lorem ipsum</h1>
        </div>
        <div className=" sm:flex sm:items-center sm:justify-between gap-x-6">
          {product.map((item) => (
            <div key={item.id}>
              <PackageCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Package;
