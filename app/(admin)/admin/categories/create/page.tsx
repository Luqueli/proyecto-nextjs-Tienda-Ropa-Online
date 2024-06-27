import {fetchCategories } from '@/app/lib/data'
import CreateCategoryForm from '@/app/ui/categories/create-form'

export default async function Page(){
  const categories = await fetchCategories();
  
  return (
    <div className="bg-customCream flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Crear producto</h2>
        </div>
        <CreateCategoryForm categories={categories}/>
      </div>
    </div>
  )
}

