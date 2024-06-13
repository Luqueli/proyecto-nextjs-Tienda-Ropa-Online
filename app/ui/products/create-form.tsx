'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createProduct } from "@/app/lib/actions"
import { Brand, Category } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';

export default function CreateForm({
  brands,
  categories
} : {
  brands : Brand[],
  categories : Category[]
}){
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
        </label>
        <div className="mt-1">
          <input
            id="productName"
            name="productName"
            type="text"
            maxLength={20}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          />
        </div>

        <div id="productname-error" aria-live="polite" aria-atomic="true">
          {state.errors?.productName &&
            state.errors.productName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Precio
        </label>
        <div className="mt-1">
          <input
            id="price"
            name="price"
            type="number"
            maxLength={20}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          />
        </div>
        <div id="price-error" aria-live="polite" aria-atomic="true">
              {state.errors?.price &&
                state.errors.price.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))
              }
        </div>
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Marca
        </label>
        <div className="mt-1">
          <select 
            id="brandName"
            name="brandName">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {brands.map( (brand) => (
                  <SelectItem value={brand.name}>{brand.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </select>
        </div>
        <div id="brand-error" aria-live="polite" aria-atomic="true">
              {state.errors?.brandName &&
                state.errors.brandName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))
              }
        </div>
      </div>
      
      <div>
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Categoría
        </label>
        <div className="mt-1">
          <select
            id="categoryName"
            name="categoryName">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                {categories.map( (category) => (
                  <SelectItem value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </select>
        </div>

        <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.categoryName &&
                state.errors.categoryName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))
              }
        </div>

      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción
        </label>
        <div className="mt-1">
          <input
            id="description"
            name="description"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
          />
        </div>
      </div>
      <div>
        <Button type="submit" className="w-full">
          Crear producto
        </Button>
      </div>
    </form>
  )

}

  
