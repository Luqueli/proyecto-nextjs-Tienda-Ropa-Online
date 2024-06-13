'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id : z.string(),
    productName: z.string({
        invalid_type_error: 'Seleccionar un nombre.',
    }),
    brandName: z.string({
        invalid_type_error: 'Seleccionar una marca.',
    }),
    categoryName : z.string({
        invalid_type_error: 'Seleccionar una categoría',
    }),
    price: z.coerce.
        number()
        .gt(0, { message: 'Ingresar una cantidad mayor a 0 .' }),
    
    description : z.string({
        invalid_type_error: 'Poner una descripción.',
    }),
});

const CreateProduct = FormSchema.omit({ id: true});

export type State = {
    errors?: {
      brandName?: string[];
      productName?: string[];
      categoryName?: string[];
      price?: number;
      description?: string[];
    };
    message?: string | null;
};


export async function createProduct(prevState : State, formData : FormData){
    
    const validatedFields = CreateProduct.safeParse({
        productName: formData.get('productName'),
        brandName: formData.get('brandName'),
        categoryName: formData.get('categoryName'),
        price: formData.get('price'),
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
            brandName, 
            categoryName, 
            price, 
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