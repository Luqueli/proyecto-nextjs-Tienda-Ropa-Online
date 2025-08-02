import Hero from "@/app/ui/home/hero"
import { fetchCategories, fetchProducts } from "@/app/lib/data"

export default async function Home() {
  const products = await fetchProducts()
  const categories = await fetchCategories()
  const carouselImages = products.map(product => product.image)
  return (
      <Hero  carouselImages={carouselImages} categories={categories}/>
  );
}
