import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/app/ui/home/carousel"
import Link from "next/link"
import { fetchProducts} from "@/app/lib/data"
import Image from "next/image"

export default async function Hero() {
  const products = await fetchProducts()
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Carousel
              className="w-full max-w-[500px] h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.name}>
                    <Image 
                      src={product.image}
                      alt={product.name} 
                      height="3144"
                      width="3144" 
                      className="w-full h-full object-cover rounded-lg" />
                  </CarouselItem>
                )
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                TNDA - Tienda de zapatillas para todos los momentos de la vida.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
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
