import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ProductListSection = (): JSX.Element => {
  const productData = {
    title: "Replaceable Team.",
    description: "Description of lower product",
    price: "$10.99",
    backgroundImage: "/image-1.svg",
    productImage: "/image-22.svg",
  };

  return (
    <div className="flex flex-col w-full max-w-[515px] items-start gap-10">
      <Card className="w-full border-none">
        <CardContent className="p-0 flex flex-col items-start gap-6">
          <div className="relative w-full rounded-lg bg-[url(/image-1.svg)] bg-cover bg-center aspect-video" />

          <img
            className="w-full object-contain"
            alt="Product image"
            src={productData.productImage}
          />

          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <h3 className="font-medium text-black text-2xl leading-9 font-sans">
              {productData.title}
            </h3>

            <p className="font-normal text-[#828282] text-xl leading-[30px] font-sans">
              {productData.description}
            </p>

            <p className="font-medium text-black text-xl leading-[30px] font-sans">
              {productData.price}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
