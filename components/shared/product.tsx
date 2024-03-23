'use client';

import { ProductType, Token } from '@/interfaces';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ProductStatus } from './product-status';
import UpdateProductModal from '../modal/update-product-modal';
import axios from 'axios';
import Cookies from "js-cookie";
import useEditProduct from '@/hooks/useEditProduct';


const Product: FC<{ item: ProductType, page: String}> = ({ item, page }) => {
  const [position, setPosition] = useState<string>('For sale')
  const [kuki, setKuki] = useState<string | object | Token>('')
  const editProductModal = useEditProduct();
  useEffect(()=>{
    const cookie = Cookies.get('yourCookieKey');
    if (cookie) {
      const parsedClient = JSON.parse(cookie) as Token;
      setKuki(parsedClient.token);
    }
  }, [])
  
  const onOpenUpdateModal = useCallback(() => {
    editProductModal.onOpen();
  }, [editProductModal]);

  const deleteProduct = (productId: string) => {
    axios.delete(`http://localhost:5000/products/${productId}`)
  };

  const addFav = (productId:string) => {
    axios
      .post(`http://localhost:5000/products/addfavourite/${productId}`, {
        headers: {
          Authorization: `${kuki}`,
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response);
        
      });
  };
  const delFav = (productId:string) => {
    axios
      .post(`http://localhost:5000/products/refavourite/${productId}`, {
        headers: {
          Authorization: `${kuki}`,
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response);
      });
  };
  let path = item.images[0]?.substring(item.images[0]?.lastIndexOf("\\") +1)
  
  
	return (
		<div className='border rounded-lg h-96 flex flex-col p-6  group hover:scale-105 transition-transform ease-out duration-200'>
      <Link
        href={`/${item._id}`}
        className='h-96 flex flex-col  group'
      >
        <div className='relative max-h-80 flex-1'>
        <Image  width={500} height={500} key={item._id} src={`http://localhost:5000/uploads/${path}`} alt="Mahsulot rasmi" className="m-3" />
        </div>

        <h3 className='tracking-widest text-indigo-500 text-xs font-medium title-font'>
          {item?.category}
        </h3>
        <div className='font-semibold flex items-center justify-between mt-4 mb-1'>
          <p className='w-44 truncate'>{item.name} </p>
          <p>${item.price}</p>
        </div>
        <p className='leading-relaxed text-base line-clamp-2'>
          {item.description}
        </p>
      </Link>
      <div className='flex justify-end'>
        {
          page =='my'  ? (
            <div className='grid grid-cols-3 gap-3'>
              <ProductStatus position={position} setPosition={setPosition} />
              <Button variant="destructive" onClick={() => deleteProduct(item._id)}>Delete</Button>
              <Button onClick={onOpenUpdateModal}>Edit</Button>
              <UpdateProductModal data={item} />
            </div>
          ) : (
            <div className='flex justify-between w-full'>
              <div>{item.state}</div>
              <div>
                {
                  item.isFav ? (
                    <svg onClick={() => delFav(item._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    
                  ) : (
                    <svg onClick={() => addFav(item._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  )
                }
              </div>
            </div>
          )
        }


      </div>
    </div>
	);
};

export default Product; 