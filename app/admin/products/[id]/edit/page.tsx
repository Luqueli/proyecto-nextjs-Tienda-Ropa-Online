import { fetchBrands, fetchCategories, fetchProductById } from '@/app/lib/data'
import EditProductForm from '@/app/ui/products/edit-form'
import { notFound } from 'next/navigation';

export default async function Page( {params} : {params : {id:string} } ){

    const id = params.id
    const [brands,categories,product] = await Promise.all([
        await fetchBrands(),
        await fetchCategories(),
        await fetchProductById(id)
    ])

    if (!product){
      notFound();
    }
  
  return (
    <div className="flex justify-center items-center gap-12 p-8 md:p-12">
      
      <div className="hidden md:block">
        <img src={product.image} alt="Product Image" width={300} height={300} className="rounded-lg shadow-lg" />
      </div>

      <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Editar producto</h2>
        <EditProductForm product={product} brands ={brands} categories={categories}/>
      </div>
    </div>
  )
}

