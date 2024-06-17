import Filters from "@/app/ui/products/filter"
import CardWrapper from "@/app/ui/products/cardwrapper"
export default async function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-8 bg-customCream">
        <Filters />
        <CardWrapper />
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
    </div>
    )
} 
