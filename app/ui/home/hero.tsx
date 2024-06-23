import { Carousel, CarouselContent, CarouselItem } from "@/app/ui/home/carousel"
import Link from "next/link"
import { fetchProducts, fetchProductsImages } from "@/app/lib/data"

export default async function Hero() {
  const products = await fetchProducts()
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 md:gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px]">
          <div className="grid gap-4">
            <Carousel
              opts={{ align: "start", loop: true, autoplay: true, duration: 3000 }}
              className="w-full max-w-[500px] h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem>
                    <img src={product.images} alt="Shoe 1" className="w-full h-full object-cover rounded-lg" />
                  </CarouselItem>
                )
                )}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                TNDA - Tienda de zapatillas para todos los momentos de la vida.
              </h1>
              <p className="text-slate-500 md:text-xl dark:text-slate-400">
                Explora nuestra colección de zapatillas de las marcas más populares y encuentra el estilo perfecto para
                ti.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300"
              prefetch={false}
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
