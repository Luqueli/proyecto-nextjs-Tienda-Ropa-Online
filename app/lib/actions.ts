'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id : z.string(),

    productName: z.string({
        invalid_type_error: 'Poner un nombre'
    }).min(1,{message: 'Poner un nombre'})
    ,
    price: z.coerce.
    number()
    .gt(0, { message: 'Ingresar una cantidad mayor a 0 .' }),

    brandName: z.string({
        invalid_type_error: 'Seleccionar una marca.',
    }).min(1, {message : 'Seleccionar una marca.'}),

    categoryName : z.string({
        invalid_type_error: 'Seleccionar una categoría',
    }).min(1, {message : 'Seleccionar una categoría.'}),
    
    description : z.string({
        invalid_type_error: 'Poner una descripción.',
    }).min(1, {message : 'Poner una descripción'}),
});

const categoryFormSchema = z.object({
    id : z.string(),

    categoryName: z.string({
        invalid_type_error: 'Poner una categoría'
    }).min(1,{message: 'Poner una categoría'})
    ,
});





const CreateProduct = FormSchema.omit({ id: true});
const UpdateProduct = FormSchema.omit({ id: true});

const CreateCategory = categoryFormSchema.omit({ id: true});
const UpdateCategory = categoryFormSchema.omit({ id: true});






export type State = {
    errors?: {
        productName?: string[];
        price?: string[];
        brandName?: string[];
        categoryName?: string[];
        description?: string[];
    };
    message?: string | null;
};


export type CategoryState = {
    errors?: {
        categoryName?: string[];
    };
    message?: string | null;
};


export async function createProduct(prevState : State, formData : FormData){

    const validatedFields = CreateProduct.safeParse({
        productName: formData.get('productName'),
        price: formData.get('price'),
        brandName: formData.get('brandName'),
        categoryName: formData.get('categoryName'),
        description: formData.get('description'),
    });
    
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Product.',
        };
    }

    const { 
        productName,
        price, 
        brandName, 
        categoryName, 
        description 
    } = validatedFields.data;
    
    try{
        await sql`
        INSERT INTO products (name,description,brandname,categoryname,price)
        VALUES (${productName}, ${description}, ${brandName},${categoryName},${price})
    `;
    } catch (error){
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };

    }

    revalidatePath('/admin/products');
    redirect('/admin/products');
}


export async function updateProduct(id:string, prevState : State,formData : FormData){
   
    const validatedFields = UpdateProduct.safeParse({
        productName: formData.get('productName'),
        price: formData.get('price'),
        brandName: formData.get('brandName'),
        categoryName: formData.get('categoryName'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Product.',
        };
    }

    const { 
        productName,
        price, 
        brandName, 
        categoryName, 
        description 
    } = validatedFields.data;

    try{
        await sql`
        UPDATE products
        SET name = ${productName}, price = ${price}, brandname = ${brandName}, categoryname = ${categoryName}, description = ${description}
        WHERE id = ${id}
      `;

    }catch(error){
        return {
            message: 'Database Error: Failed to Update product'
        }
    } 

    revalidatePath('/admin/products');
    redirect('/admin/products')

}

export async function deleteProduct(id: string) {
    try{
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/dashboard/products');
        return { message: 'Deleted product.' };
    }catch(error){
        return {
            message: 'Database Error: Failed to delete Invoice.',
        };
    }
}



export async function createCategory(prevState : CategoryState, formData : FormData){

    const validatedFields = CreateCategory.safeParse({
        categoryName: formData.get('categoryName'),
    });
    
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Category.',
        };
    }

    const { 
        categoryName 
    } = validatedFields.data;
    
    try{
        await sql`
        INSERT INTO categories (name)
        VALUES (${categoryName})
        `;
    } catch (error){
        return {
            message: 'Database Error: Failed to Create Category.',
        };

    }

    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}



export async function updateCategory(id:string, prevState : CategoryState,formData : FormData){
   
    const validatedFields = UpdateCategory.safeParse({
        categoryName: formData.get('categoryName'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Category.',
        };
    }

    const {  
        categoryName
    } = validatedFields.data;

    try{
        await sql`
        UPDATE categories
        SET name = ${categoryName}
        WHERE id = ${id}
      `;

    }catch(error){
        return {
            message: 'Database Error: Failed to Update Category'
        }
    } 

    revalidatePath('/admin/categories');
    redirect('/admin/categories')

}

export async function deleteCategory(id: string) {
    try{
        await sql`DELETE FROM categories WHERE id = ${id}`;
        revalidatePath('/dashboard/categories');
        return { message: 'Deleted category.' };
    }catch(error){
        return {
            message: 'Database Error: Failed to delete Category.',
        };
    }
}