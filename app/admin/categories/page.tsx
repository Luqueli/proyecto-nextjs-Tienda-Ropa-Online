import { fetchCategories, fetchProducts } from "@/app/lib/data"
import { Button } from "@/components/ui/button"
import  DeleteButton  from '@/app/ui/categories/deletebutton'
import Link from "next/link"
import EditCategoryButton from "@/app/ui/categories/editcategory"



export default async function Page(){
    const categories = await fetchCategories()

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Lista de Productos</h2>
                    <Link 
                        href = {"/admin/categories/create"}
                    >
                        <Button variant="outline" size="sm" className="bg-black text-white">
                            <PlusIcon/>
                                Agregar categoría
                        </Button>

                    </Link>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 font-medium">
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Nombre</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {categories.map((category) => (
                    <tr key={category.id} className="border-b">
                        <td className="py-2 px-3">{category.id}</td>
                        <td className="py-2 px-3">{category.name}</td>
                        <td className="py-2 px-3 flex justify-end gap-2">

                        <EditCategoryButton id={category.id} />
                        <DeleteButton id={category.id} />
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

  