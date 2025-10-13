"use client";

import NoProducts from "@/app/ui/products/no-products";
import Pagination from "@/app/ui/products/pagination";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/products/card";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product, CartItem, Category, Brand } from "@/app/lib/definitions";
import Filters from "@/app/ui/products/filters";

const PRODUCTS_PER_PAGE = 12;

export default function ProductsClient({
  products,
  totalPages,
  totalProductsNumber,
  searchParams,
  brands,
  categories
}: {
  products: any[];
  totalPages: number;
  totalProductsNumber: number;
  categories: Category[];
  brands: Brand[];
  searchParams?: {
    query?: string;
    page?: string;
    brand?: string;
    category?: string;
  };
}) {

  const currentPage = Number(searchParams?.page) || 1;

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const handleAddToCart = (product: Product) => {
    const savedCartItems = localStorage.getItem("cartItems");
    const cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
    const indexId = cartItems.findIndex(
      (item: { id: string }) => item.id === product.id
    );
    if (indexId === -1) {
      const item: CartItem = {
        id: product.id,
        productName: product.name,
        brandName: product.brand_name,
        quantity: 1,
        unitCost: product.price,
      };
      cartItems.push(item);
    } else {
      cartItems[indexId].quantity += 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <Filters categories={categories} brands={brands}/>
    
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Mostrando {Math.min(startIndex + 1, products.length)}-
            {Math.min(endIndex, products.length)} de {totalProductsNumber} productos
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              No se encontraron productos
            </h2>
            <p className="text-gray-500 mb-6">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <Link href="/products">
              <Button>Ver todos los productos</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <CardContent className="p-0">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-black hover:bg-gray-800 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar al carrito
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </>
        )}
      </div>
    </>
  );
}
