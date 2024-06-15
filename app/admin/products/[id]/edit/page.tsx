import { fetchBrands, fetchCategories, fetchProductById } from '@/app/lib/data'
import EditProductForm from '@/app/ui/products/edit-form'

export default async function Page( {params} : {params : {id:string} } ){

    const id = params.id
    const [brands,categories,product] = await Promise.all([
        await fetchBrands(),
        await fetchCategories(),
        await fetchProductById(id)
    ])
  
  return (
    <div className="bg-customCream flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-customCream w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Editar producto</h2>
        </div>
        <EditProductForm product={product} brands = {brands} categories={categories}/>
      </div>
    </div>
  )
}

