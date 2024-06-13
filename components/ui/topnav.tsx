'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { 
    name: 'Overview', 
    href: '/admin/overview'
  },
  {
    name: 'Products',
    href: '/admin/products',
  },
  { 
    name: 'Categories', 
    href: '/admin/categories'
  },
];


export default function topnav() {
  const pathname = usePathname();
  return (
    <div className="bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="flex gap-4 mb-6">
        {links.map( (link) => {
          return(
                <Link 
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'font-medium hover:text-gray-700)',
                    {
                      'bg-black text-white': pathname === link.href,
                    } 
                  )}
                >
                  {link.name}
                </Link>
          )
        })} 
      </nav>
    </div>
  )
}

