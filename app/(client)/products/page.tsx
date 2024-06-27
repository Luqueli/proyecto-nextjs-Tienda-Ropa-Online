import ProductsCards from "@/app/ui/products/productscards"
import NoProducts from "@/app/ui/products/no-products"
import Pagination from '@/app/ui/products/pagination'
import { fetchProductsPages, fetchFilteredProducts } from "@/app/lib/data"
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
    const products = await fetchFilteredProducts(query, currentPage);


    return (
      <div className="container mx-auto px-4 py-8">
          <Search />
          <ProductsCards products={products} />
          {noProducts()}
          <Pagination totalPages={totalPages}/>
      </div>
  )


  function noProducts(){
    if(!products.length)
      return <NoProducts/>
  }
}


