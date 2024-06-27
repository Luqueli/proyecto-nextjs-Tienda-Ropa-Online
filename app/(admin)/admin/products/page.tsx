import { fetchProducts } from "@/app/lib/data"
import { Button } from "@/app/ui/button"
import  DeleteButton  from '@/app/ui/products/deletebutton'
import Link from "next/link"
import EditProductButton from "@/app/ui/products/editproduct"



export default async function Page(){
    const products = await fetchProducts()
    
    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Lista de Productos</h2>
                    <Link 
                        href = {"/admin/products/create"}
                    >
                        <Button variant="outline" size="sm" className="bg-black text-white">
                            <PlusIcon/>
                                Agregar producto
                        </Button>
                    </Link>
                </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 font-medium">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Nombre</th>
                    <th className="py-3 px-4 text-left">Marca</th>
                    <th className="py-3 px-4 text-left">Categoría</th>
                    <th className="py-3 px-4 text-left">Precio</th>
                    <th className="py-3 px-4 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (

                    <tr key={product.id} className="border-b">
                        <td className="py-3 px-4">{product.id}</td>
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">{product.brand_name}</td>
                        <td className="py-3 px-4">{product.category_name}</td>
                        <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 flex justify-center gap-2">
                        <EditProductButton id={product.id} />
                        <DeleteButton id={product.id} cloudinary_public_id={product.cloudinary_public_id} />
                        </td>
                    </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}
function DeleteIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
        <line x1="18" x2="12" y1="9" y2="15" />
        <line x1="12" x2="18" y1="9" y2="15" />
      </svg>
    )
}

  function PlusIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
}

  