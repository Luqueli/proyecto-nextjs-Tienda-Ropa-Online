'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {v2 as cloudinary} from 'cloudinary'

//Archivos aceptados para chequear el esquema con zod.
const ACCEPTED_FILE_TYPES = ['image/png','image/jpg ','image/jpeg'];

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const FormSchema = z.object({
    id : z.string(),

    productName: z.string({
        invalid_type_error: 'Poner un nombre'
    }).min(1,{message: 'Poner un nombre'}),

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

    image : z.instanceof(File)
            .refine((file) => {
                return ACCEPTED_FILE_TYPES.includes(file.type);
            }, 'Por favor, subir una imágen')
});


const CategoryFormSchema = z.object({
    id : z.string(),

    categoryName: z.string({
        invalid_type_error: 'Poner una categoría'
    }).min(1,{message: 'Poner una categoría'})
    ,
});


const CreateProduct = FormSchema.omit({ id: true});
const UpdateProduct = FormSchema.omit({ id: true});

const CreateCategory = CategoryFormSchema.omit({ id: true});
const UpdateCategory = CategoryFormSchema.omit({ id: true});

export type State = {
    errors?: {
        productName?: string[];
        price?: string[];
        brandName?: string[];
        categoryName?: string[];
        description?: string[];
        image?: string[];
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
        image: formData.get('image') as File
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
        description,
        image
    } = validatedFields.data;
    
    const arrayImage = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayImage)

    const uploadResult : any = await new Promise((resolve, reject) => {
        
      cloudinary.uploader.upload_stream({}, function (error, result){
        if ( error ) {
            reject(error)
        }
        resolve(result);

    }).end(buffer);
    })

    const imageUrl = uploadResult.url
    const publicId = uploadResult.public_id

    try{
        await sql`
        INSERT INTO products (name,description,brand_name,category_name,price,image,cloudinary_public_id)
        VALUES (${productName}, ${description},${brandName},${categoryName},${price},${imageUrl},${publicId})
    `;
    } catch (error){
        return {
            message: 'Database Error: Failed to Create Product.',
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
        SET name = ${productName}, price = ${price}, brand_name = ${brandName}, category_name = ${categoryName}, description = ${description}
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

export async function deleteProduct(id: string, cloudinary_public_id:string) {

    try{
        const result = await cloudinary.uploader.destroy(cloudinary_public_id);
        console.log('Imagen eliminada exitosamente:', result);
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/admin/products');
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
        console.log(id)
        await sql`DELETE FROM categories WHERE id = ${id}`;
        revalidatePath('/admin/categories');
        return { message: 'Deleted category.' };
    }catch(error){
        return {
            message: 'Database Error: Failed to delete Category.',
        };
    }

}