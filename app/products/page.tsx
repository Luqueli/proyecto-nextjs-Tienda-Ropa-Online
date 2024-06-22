import ProductsCards from "@/app/ui/products/productscards"
import Pagination from '@/app/ui/products/pagination'
import { fetchProductsPages } from "@/app/lib/data"
import Search from '@/app/ui/home/search'

export default async function Products({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPages(query);


    return (
      <div className="container mx-auto px-4 py-8">
          <Search />
          <ProductsCards query={query} currentPage={currentPage} />
          <Pagination totalPages={totalPages}/>
      </div>
  )
} 
