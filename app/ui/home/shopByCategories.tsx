import Link from "next/link";
import Image from "next/image";
import { Category } from "@/app/lib/definitions";

type Props = {
  categories: Category[]
}

export default function ShopByCategories({ categories }: Props) {
  console.log(categories);
  return (
    <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">COMPRAR POR CATEGORÍAS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories && categories.map((category) => (
              <Link key={category.name} href={`/products?category=${category.name.toLowerCase()}`} className="group">
                <div className="relative h-80 rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  <Image
                    src={category.image}
                    alt={`Zapatillas de ${category.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>






  )


}