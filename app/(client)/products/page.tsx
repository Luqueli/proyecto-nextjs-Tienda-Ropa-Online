// File: app/products/page.tsx (Server Component)
import ProductsClient from "@/app/ui/products/products-client";
import { fetchProductsPages, fetchFilteredProducts, fetchTotalProductsNumber, fetchCategories, fetchBrands } from "@/app/lib/data";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    brand?: string;
    category?: string;
    page?: string;
  };
}) {
    const query = searchParams?.query || "";
    const brand = searchParams?.brand || "";
    const category = searchParams?.category || "";

    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchProductsPages(query,brand,category);
    const products = await fetchFilteredProducts(query,currentPage,brand,category);
    const totalProducts = await fetchTotalProductsNumber();
    const categories = await fetchCategories();
    const brands = await fetchBrands();
    return (
      <ProductsClient
        products={products}
        totalPages={totalPages}
        totalProductsNumber={totalProducts}
        searchParams={searchParams}
        categories={categories}
        brands={brands}
      />
  );
}