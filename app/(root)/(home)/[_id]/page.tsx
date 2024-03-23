"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductType, User } from "@/interfaces";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailedPage() {
  const { _id } = useParams(); // type assertion
  // const [owner, setOwner] = useState<any>()

  const [product, setProduct] = useState<ProductType>({} as ProductType);
  useEffect(() => {
    const  getData = async () => {
      await axios.get(`http://localhost:5000/products/${_id}`).then((response) => {
      setProduct(response.data);
    });
    }
    getData()
  });

  console.log(product.images);
  

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  
  return (
    <div className="flex flex-col lg:flex-row p-0 items-center ">
      <div className="flex-1">
        <Carousel className="w-[100%]max-w-sm ">
          <CarouselContent className="-ml-1 ">
          {product.images && product.images.map(image => (
              <CarouselItem key={image} className="pl-1 md:basis-1/1 lg:basis-1/1">
                <div className="p-1">
                  <Card className='w-[100%]'>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image  width={500} height={500} key={image} src={`http://localhost:5000/uploads/${image.substring(image.lastIndexOf('\\')+1)}`} alt="Mahsulot rasmi" className="m-3" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>
      <div className="flex-1 mt-6 lg:ml-6 lg:mt-0">
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Name :</span>{product.name}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Price :</span>{USDollar.format(product.price)}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Owner:</span>{product.owner?.name}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Contact with owner:</span>{product.owner?.tel}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Category :</span>{product.category}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Description: </span>{product.description}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Status: </span>{product.state}</h1>
      </div>
    </div>
  );
}
