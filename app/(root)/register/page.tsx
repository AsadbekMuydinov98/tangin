'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/interfaces'
import axios from 'axios'
import React, { ChangeEvent, useCallback, useState } from 'react'
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/modal/login-modal'
import useLoginModal from '@/hooks/useLoginModal'

export default function RegisterPage() {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [client, setClient] = useState<User>({
    name: '',
    email: '',
    password: '',
    tel: ''
  })
  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });    
  };
  const handleSetCookie = () => {
    // Cookies.set('yourCookieKey', JSON.stringify(client), { expires: 7 });
    axios.post(`http://localhost:5000/register`, client)
    .then(response => {
      // Handle the response
      console.log('Response:', response);
      Cookies.set('yourCookieKey', JSON.stringify(response.data), { expires: 7 });
      router.push('/');
      window.location.reload()
    }).catch(error => {
      // Handle errors
      console.error('Error:', error);
    })
  };
  return (
    <div className=' w-[50vw] h-[80vh] m-auto p-24'>
      <LoginModal />
      <div className="flex flex-col gap-4 border rounded-lg py-12 px-24">
        <h1 className='text-2xl text-center'>Register</h1>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Your name"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tel" className="text-right">
                Phone number
              </Label>
              <Input
                placeholder="Phone number"
                name="tel"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className='self-end'><Button type="submit" onClick={handleSetCookie}>Register</Button></div>
            <div className='self-center text-muted-foreground font-mono mt-[-25px] flex items-center'>
              Already have an account? <Button variant={'link'} className='mx-0 p-1' onClick={onOpenLoginModal}>Login</Button>  now
              </div>
          </div>
    </div>
  )
}
