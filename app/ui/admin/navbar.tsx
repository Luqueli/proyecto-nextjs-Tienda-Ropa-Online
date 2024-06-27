import { fetchBrands } from '@/app/lib/data'
import Link  from 'next/link'
import DropdownCart from '@/app/ui/cart/dropdownCart';
import { logOut } from '@/app/lib/actions';
import Topnav from '@/app/ui/admin/topnav'

export default async function Navbar(){

    const brands = await fetchBrands();

    return(
        <div className="navbar bg-customCream">
            <div className="navbar-start">
                <Link href={"/"}>
                    <div className= "btn btn-ghost text-xl font-bold tracking-widest ml-10">T N D A.</div>
                </Link>
                <h1 className="text-xl font-bold tracking-widest ml-10">Admin Dashboard</h1>
            </div>

            <div className="navbar-center font-bold ml-10">                    
                <Topnav />
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