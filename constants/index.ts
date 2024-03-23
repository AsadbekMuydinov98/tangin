import {
	Contact2,
	BookHeartIcon,
	Home,
	ShoppingBag,
	HandPlatter
} from 'lucide-react'

export const navLinks = [
	{ name: 'Home', route: '/', icon: Home },
	{ name: 'Products', route: '/products', icon: ShoppingBag },
	{ name: 'My Products', route: '/myproducts', icon: HandPlatter },
	{ name: 'My favourites', route: '/favourites', icon: 	BookHeartIcon},
	{ name: 'Contact', route: '/contact', icon: Contact2 },
]

export const popularCategories = [
	{ name: 'Front End', slug: 'front-end' },
	{ name: 'Back End', slug: 'back-end' },
	{ name: 'Full Stack', slug: 'full-stack' },
	{ name: "Sun'iy Intelekt", slug: 'artificial-intelligence' },
]

export const popularTags = [
	{ name: 'ReactJS', slug: 'react-js' },
	{ name: 'JavaScript', slug: 'java-script' },
	{ name: 'NodeJS', slug: 'node-js' },
	{ name: 'NextJS', slug: 'next-js' },
]
