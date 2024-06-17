'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createProduct, updateCategory, updateProduct } from "@/app/lib/actions"
import { Brand, Category, Product } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import Link from 'next/link';

export default function EditCategoryForm({

  category
} : {
  category : Category
}){
  const updateCategoryWithId = updateCategory.bind(null,category.id)
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(updateCategoryWithId, initialState);
  
  return (
    <form action={dispatch}>
      <div >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
        </label>
        <div className="mt-1" >
          <input
            id="categoryName"
            name="categoryName"
            defaultValue={category.name}
            type="text"
            maxLength={20}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"          
            aria-describedby="categoryname-error"
            />
        </div>

        <div id="categoryname-error" aria-live="polite" aria-atomic="true">
          {state.errors?.categoryName &&
            state.errors.categoryName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
      </div>
    </div>
      

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/categories"
          className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-black-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="w-full">
          Editar categoría
        </Button>
      </div>
    </form>
  )

}

  
