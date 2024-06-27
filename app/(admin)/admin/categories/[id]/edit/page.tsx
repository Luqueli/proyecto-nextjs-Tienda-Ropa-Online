import {fetchCategories, fetchCategoryById } from '@/app/lib/data'
import EditCategoryForm from '@/app/ui/categories/edit-form'
import { notFound } from 'next/navigation'

export default async function Page( {params} : {params : {id:string} } ){

    const id = params.id
    const [categories,category] = await Promise.all([
        await fetchCategories(),
        await fetchCategoryById(id)
    ])

    if(!category){
      notFound();
    }
  
    return (
      <div className="bg-customCream flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-customCream w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Editar producto</h2>
          </div>
          <EditCategoryForm category={category}/>
        </div>
      </div>
    )
}

