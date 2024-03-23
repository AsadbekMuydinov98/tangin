'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios'
import { User } from "@/interfaces";


export default function RegisterModal() {
  
  const [client, setClient] = useState<User>({
    name: '',
    email: '',
    password: '',
    tel: ''
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });    
  };

  const handleSetCookie = () => {
    // Cookies.set('yourCookieKey', JSON.stringify(client), { expires: 7 });
    axios.post(`http://localhost:5000/register`, client)
    .then(response => {
      // Handle the response
      console.log('Response:', response);
    }).catch(error => {
      // Handle errors
      console.error('Error:', error);
    })
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-end"><Button className="w-26">Register</Button></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register now</DialogTitle>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="submit" onClick={handleSetCookie}>Register</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
