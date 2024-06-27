import { fetchBrands } from '@/app/lib/data'
import Link  from 'next/link'
import DropdownCart from '@/app/ui/cart/dropdownCart';
import { logOut } from '@/app/lib/actions';


export default async function Navbar(){

    const brands = await fetchBrands();

    return(
        <div className="navbar bg-customCream">
            <div className="navbar-start">
                <Link href={"/"}>
                    <div className="btn btn-ghost text-xl font-bold tracking-widest ml-10">T N D A.</div>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex font-bold">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link
                            href="/products"
                        >
                            SHOP
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary>MARCAS</summary>
                            <ul className="p-2">

                            {brands.map((brand) => {
                                const link = `/products?query=${brand.name}`
                                return(
                                    <li key={brand.name}>
                                        <Link
                                            href= {link}
                                        >
                                            {brand.name}
                                        </Link>
                                </li>

                            )}
                            )}
                            </ul>
                        </details>
                    </li>

                </ul>
            </div>


            <div className="navbar-end mr-10">
                <DropdownCart/>
            </div> 
                
                <form action={ async () => { 
                    'use server'
                    const callResponse = await logOut()                                            
                }}> 
                    
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"                        >
                        Cerrar Sesión
                </button>
                </form>
            
        </div>
    )
}