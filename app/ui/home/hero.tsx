'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/app/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ShopByCategories from "./shopByCategories"
import { Category } from "@/app/lib/definitions"

type Props = {
  carouselImages: string[],
  categories: Category[]
}

export default function Hero({ carouselImages, categories }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage((currentImage + 1) % carouselImages.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [currentImage])

  const changeImage = (newIndex: number) => {
    setFade(false) // start fade-out
    setTimeout(() => {
      setCurrentImage(newIndex)
      setFade(true) // fade-in new image
    }, 300) // match fade duration
  }

  const nextImage = () => {
    changeImage((currentImage + 1) % carouselImages.length)
  }

  const prevImage = () => {
    changeImage((currentImage - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <>
    <main className="container mx-auto px-4 md:px-6 py-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Carousel */}
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              key={currentImage} // Important to force re-render
              src={carouselImages[currentImage] || "/placeholder.svg"}
              alt={`Zapatillas ${currentImage + 1}`}
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
              priority
            />

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => changeImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              TNDA - Tienda de zapatillas para todos los momentos de la vida.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Explora nuestra colección de zapatillas de las marcas más populares y encuentra el estilo perfecto para ti.
            </p>
          </div>

          <Link href="/products">
            <Button
              variant="link"
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg tracking-normal rounded-md border-0 my-5"
            >
              Comprar ahora
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <ShopByCategories categories={categories} />
    </>
  )
}
