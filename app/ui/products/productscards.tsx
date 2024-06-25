'use client'
import { CartItem, Product } from "@/app/lib/definitions";
import Image from 'next/image';
import Link from 'next/link'
export default async function ProductsCards({
    products
}:{
    products: Product[];
}){

    const handleAddToCart = (product: Product) => {
        
        // Obtener los elementos actuales del carrito del localStorage
        const savedCartItems= localStorage.getItem('cartItems');
        const cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];

        // Verificar si el producto ya está en el carrito
        const indexId = cartItems.findIndex((item: { id: string; }) => item.id === product.id);
        if (indexId === -1) {
            const item : CartItem ={id: product.id, model: product.name, brand_name: product.brand_name, quantity: 1, unitCost: product.price }
            cartItems.push(item);
        } else {
            cartItems[indexId].quantity += 1;
        }

        // Actualizar el localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Opcional: Emitir un evento personalizado para notificar al DropdownCart
        window.dispatchEvent(new Event('storage'));
    };



    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
            
                <div
                    key={product.id}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <Link href="#" prefetch={false}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={700}
                            height={380}
                            className="rounded-t-lg object-cover w-full aspect-square"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <h3 className="text-lg font-semibold">{product.category_name}</h3>
                            </div>
                            <span className="text-lg font-semibold">${product.price}</span>
                        </div>
                        <button className="btn pb-1 pl-2 bg-customCream rounded"
                            onClick={
                                () =>handleAddToCart(product)
                            }
                        >
                            Agregar al carrito
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    )  
}