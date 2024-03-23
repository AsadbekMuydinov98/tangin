"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Token } from "@/interfaces";
import { Kategoriya } from "../shared/Kategoriya";
import { toast } from "sonner";
import useAddProduct from "@/hooks/useAddProduct";
import Modal from "../ui/modal";

export default function ProductModal() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const addProductModal = useAddProduct();

  const [product, setProduct] = useState<any>({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    images: [""],
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const [kuki, setKuki] = useState<string | object | Token>("");
  useEffect(() => {
    const cookie = Cookies.get("yourCookieKey");
    if (cookie) {
      const parsedClient = JSON.parse(cookie) as Token;
      setKuki(parsedClient.token);
    }
  }, []);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      images: e.target.files, 
    });
  };

  const voala = () => {

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('brand', product.brand);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', selectedCategory || 'Other');

    for (const file of product.images) {
      formData.append('images', file);
  }

    const promise = axios
      .post(`http://localhost:5000/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${kuki}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Successfully add!',
        error: 'Something went wrong!',
      })
      addProductModal.onClose();

  };

  const bodyContent = (
    <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                placeholder="Product name"
                name="name"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Brand
              </Label>
              <Input
                placeholder="Brand"
                name="brand"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input
                placeholder="Price"
                name="price"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Category
              </Label>
              <Kategoriya  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                placeholder="Description"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Image
              </Label>
              <Input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
          </div>
  )

  const footer = (
    <div className="flex justify-end">
      <Button type="submit" onClick={voala}>
        Add
      </Button>
    </div>
  )

  return (
    <Modal
      isOpen={addProductModal.isOpen}
      onClose={addProductModal.onClose}
      body={bodyContent}
      footer={footer}
    />
  )
}