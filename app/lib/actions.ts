'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {v2 as cloudinary} from 'cloudinary'
import { signIn, signOut} from '@/auth';
import  { AuthError }  from 'next-auth';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CartItem } from './definitions';
import { fetchProductById } from './data';

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
const UpdateProduct = FormSchema.omit({ id: true, image:true});

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


export async function updateProduct(id:string,oldUrl : string, oldPublicId: string, prevState : State,formData : FormData){
   
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
        description,
    } = validatedFields.data;

    const image = formData.get('image') as File


    let imageUrl : string | undefined = undefined;
    let newPublicId: string | undefined = undefined;  

    if (image.size != 0){
        const product = fetchProductById(id);
        const cloudinary_public_id = (await product).cloudinary_public_id;

        //Elimino la imágen anterior correspondiente al producto
        const result = await cloudinary.uploader.destroy((cloudinary_public_id));
        console.log('Imagen eliminada exitosamente:', result);

        //Subo la nueva imágen correspondiente al producto
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
        imageUrl = uploadResult.url;
        newPublicId = uploadResult.public_id;  //Actualizo el public ID de cloudinary
    }

    try{
        if(image.size == 0){
          await sql`
            UPDATE products
            SET name = ${productName}, price = ${price}, brand_name = ${brandName}, category_name = ${categoryName}, description = ${description}
            WHERE id = ${id}
            `;
        }  
        else{
            await sql`
                UPDATE products
                SET name = ${productName}, price = ${price}, brand_name = ${brandName}, category_name = ${categoryName}, description = ${description},
                    image = ${imageUrl}, cloudinary_public_id = ${newPublicId}
                WHERE id = ${id}
            `;

        }
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

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      console.log("Se ejecuta authenticate luego de presionar el boton log in");
      console.log("Email que ingresa:"+formData.get('email'));
      console.log("Password que ingresa:"+formData.get('password'));
      await signIn('credentials',{
        ...Object.fromEntries(formData),
        redirectTo: "/admin"
      });
    } 
    catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'El email o contraseña son incorrectos.';
        }
      }
      throw error;
    }
}


export async function logOut() {
    try{
        await signOut({redirectTo : '/'})
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function payment(cartItems: CartItem []){
    const client = new MercadoPagoConfig({accessToken : process.env.MP_ACCESS_TOKEN!});
    const preference = new Preference(client);
    
    // Crear un arreglo para almacenar los items
    const items = cartItems.map(item => ({
        id: `${item.productName}`,
        title: "mp purchase",
        productName: `${item.productName}`,
        quantity: Number(item.quantity),
        unit_price: Number(item.unitCost),
        currency_id : "ARS"
    }));

    const result= await preference.create({
        body : {
            items: items,
        },
    })
    redirect(result.sandbox_init_point!) 
}


export async function createPurchase(items : any, payerEmail : string, totalAmount : number){
    console.log("Entrando a crear la compra")

    try{

        //Crear la orden

        const data = await sql`
        INSERT INTO purchase (buyerEmail, totalCost)
        VALUES (${payerEmail}, ${totalAmount})
        RETURNING purchaseID
        `;  

        const purchaseIdv2 = data.rows[0].purchaseid;
        console.log("Compra creada")
        // Por cada item (producto,cantidad) del carrito, creo un detalle.
        await Promise.all(items.map(async (item : any) => {

            const data = sql`
            INSERT INTO purchaseDetail(purchase_id, productName, quantity, itemPrice)
            VALUES (${purchaseIdv2}, ${item.id}, ${item.quantity}, ${(item.quantity*item.unit_price)})
            `;
        }));

    } catch (error){
        return {
            message: 'Database Error: Failed to Create Category.',
        };

    }
}
