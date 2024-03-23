'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Product from './product'
import axios from 'axios'
import { ProductType } from '@/interfaces'

export default function ProductCard() {
  const [data, setData] = useState<ProductType[]>([]);
  useEffect(()=>{
    axios.get(`http://localhost:5000/products`)
    .then(response => {
      setData(response.data.slice(0,5))
    })
  })
  return (
    <Carousel className="w-[100%]max-w-sm">
      <CarouselContent className="-ml-1">
        {data.map((elem) => (
          <CarouselItem key={elem._id} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className='w-[100%]'>
                <CardContent className="flex aspect-square elems-center justify-center p-6">
                  <Product item={elem} page={'home'}  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
