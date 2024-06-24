'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/app/ui/products/select"
import { Button } from "@/app/ui/button"
import { updateProduct } from "@/app/lib/actions"
import { Brand, Category, Product } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';
import Link from 'next/link';

export default function EditProductForm({
  brands,
  categories,
  product
} : {
  brands : Brand[],
  categories : Category[],
  product: Product
}){
  const updateProducteWithId = updateProduct.bind(null,product.id)
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(updateProducteWithId, initialState);
  
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
        </label>
        <div className="mt-1" >
          <input
            id="productName"
            name="productName"
            defaultValue={product.name}
            type="text"
            maxLength={20}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"          
            aria-describedby="productname-error"
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
            defaultValue={product.price}
            type="number"
            maxLength={20}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            aria-describedby="price-error"
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
          <Select 
            name="brandName"
            defaultValue={product.brand_name}
            aria-describedby="brand-error"
            >
            <SelectTrigger className="w-full">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent
            >
              <SelectGroup>
                {brands.map( (brand) => (
                  <SelectItem key={brand.name} value={brand.name}>{brand.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <Select
              name="categoryName"  
              defaultValue={product.category_name}
              aria-describedby="category-error"
          >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                  {categories.map( (category) => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
            defaultValue={product.description}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
            aria-describedby="description-error"
          />
        </div>

        <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))
              }
        </div>
      </div>

      <div className="py-6 px-10 mt-1">   
        <input 
          className="w-full max-w-[370px] bg-gray-900 hover:bg-gray-800 text-white"
          id="image"
          name="image"
          type="file" 
          accept=".jpg,.jpeg,.png"
          onClick={() => open()}
          aria-describedby="image-error"
        />

        <div id="image-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image &&
                state.errors.image.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))
              }
        </div>        
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/products"
          className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-black-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="w-full">
          Editar producto
        </Button>
      </div>
    </form>
  )

}

  
