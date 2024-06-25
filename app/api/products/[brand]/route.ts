'use server'

import {fetchProductsByBrand} from '@/app/lib/data'

export async function GET(req : Request, context: any){
    const { params } = context;
    const products = await fetchProductsByBrand(params.brand);
    const filteredProducts = products.map(item => ({
      name: item.name,
      description: item.description,
      brand_name: item.brand_name,
      category_name: item.category_name,
      image: item.image,
      price: item.price,
    }));
    if(products){
      return new Response(JSON.stringify(filteredProducts),{status : 200})
    }
    else{
      return new Response ('Productos no encontrados para la marca'+params.brand ,{status : 500})
    }
  }