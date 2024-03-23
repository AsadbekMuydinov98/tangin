'use client'

import ModeToggle from '@/components/shared/mode-toggle'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import GlobalSearch from './global-search'
import { navLinks } from '@/constants'
import Mobile from './mobile'
import { useMyContext } from '@/app/userContext'
import Cookies from 'js-cookie';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import LoginModal from '@/components/modal/login-modal'
import { User } from 'lucide-react'
import useLoginModal from '@/hooks/useLoginModal'
import { useCallback } from 'react'
import {LogOut} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Navbar() {
	const pathname = usePathname()
	const { user, setUser } = useMyContext();
	const loginModal = useLoginModal();

	const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

	const removeCookie = ()=>{
		Cookies.remove('yourCookieKey');
		window.location.reload()
	}

	return (
		<div className='h-[10vh] backdrop-blur-sm border-b sticky top-0 z-40 inset-0 bg-background'>
			<LoginModal />
			<div className='container max-w-6xl mx-auto h-[10vh] w-full flex items-center justify-between'>
				{/* Logo */}
				<Link href={'/'}>
					<h1 className='text-4xl font-creteRound'>Mory</h1>
				</Link>
				{/* Nav links */}
				<div className='gap-2 hidden md:flex'>
					<Link className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors' href={'/'}>Home</Link>
					<Link className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors' href={'/products'}>Products</Link>
					<Link className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors' href={user ? '/myproducts':'/register'}>My Products</Link>
					<Link className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors'href={user ? '/favourites':'/register'}>My Favourites</Link>
					<Link className='hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors' href={'/contact'}>Contact</Link>
					{/* {navLinks.map(nav => (
						<Link
							key={nav.route}
							href={nav.route}
							className={cn(
								'hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors',
								pathname === nav.route && 'text-blue-400'
							)}
						>
							{nav.name}
						</Link>
					))} */}
				</div>
				{/* Search */}
				<div className='flex items-center gap-1'>
					{/* <GlobalSearch /> */}
					{user!=null ? (
						<div className='flex justify-center items-center gap-1'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
								<Avatar>
									<AvatarFallback><User /></AvatarFallback>
								</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent >
									<DropdownMenuItem onClick={removeCookie}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							
						</div>
					): (
						<div className='grid'>
							<Button onClick={onOpenLoginModal}>Login</Button>
						</div>
					)}
					<ModeToggle />
          <Mobile />
				</div>
			</div>
		</div>
	)
}

export default Navbar