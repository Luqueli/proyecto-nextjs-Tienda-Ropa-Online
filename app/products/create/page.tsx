import { fetchBrands, fetchCategories } from "@/app/lib/data"
import CreateForm from "@/app/ui/products/create-form"
export default async function Create(){

    const brands = await fetchBrands()
    const categories = await fetchCategories
    ()
    return(
        <CreateForm key="create-form" brands={brands} categories={categories} />
    )
}