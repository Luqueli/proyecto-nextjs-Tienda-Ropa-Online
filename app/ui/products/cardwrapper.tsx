import { fetchProducts } from "@/app/lib/data"
import Image from 'next/image';
import Link from "next/link"
export default async function CardWrapper(){
    const products = await fetchProducts();
  
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            
                <div
                    key={product.id}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <Link href="#" prefetch={false}>
                        <Image
                            src={product.images}
                            alt={product.name}
                            width={700}
                            height={380}
                            className="rounded-t-lg object-cover w-full aspect-square"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <h3 className="text-lg font-semibold">{product.category_id}</h3>
                            </div>
                            <span className="text-lg font-semibold">${product.price}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )  
}