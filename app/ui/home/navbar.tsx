import { fetchBrands, fetchCategories } from '@/app/lib/data'
import Link  from 'next/link'
import DropdownCart from '@/app/ui/cart/dropdownCart';
import Dropdowns from '@/app/ui/home/dropdowns';
import Search from '@/app/ui/home/search';

export default async function Navbar(){

    const brands = await fetchBrands();
    const categories = await fetchCategories();

    return(
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl">TNDA</span>
          </Link>
          <Dropdowns brands={brands} categories={categories} />

          <div className="flex items-center space-x-2">
            <Search/>
            <DropdownCart/>            
          </div>
        </div>
      </header>
    )
}

