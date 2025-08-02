"use client"
import { Brand, Category } from "@/app/lib/definitions"
import { Button } from "@/app/ui/button"
import { ChevronDown } from "lucide-react"
import Link  from 'next/link'
import { useState, useEffect } from "react"
  
  type Props = {
    brands: Brand[],
    categories: Category[],
  }

  export default function Dropdowns({ brands,categories }: Props) {
        const [openMenu, setOpenMenu] = useState<"brands" | "sports" | null>(null)
        
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element
            if (!target.closest(".relative")) {
             setOpenMenu(null)
             }
            }

            document.addEventListener("click", handleClickOutside)
            return () => document.removeEventListener("click", handleClickOutside)
        }, [])

        return (
            <div className="hidden md:flex items-center space-x-6">
            <Link href="/products">
              <Button variant="ghost" className="font-medium">
                Comprar
              </Button>
            </Link>

            <div className="relative">
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => setOpenMenu(openMenu === "brands" ? null : "brands")}
              >
                Marcas
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {openMenu === "brands" && (
                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border rounded-md shadow-lg z-50">
                  <div className="p-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand.name}
                        href={`/products?brand=${brand.name.toLowerCase()}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="text-sm font-medium leading-none">{brand.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => setOpenMenu(openMenu === "sports" ? null : "sports")}
              >
                Deportes
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              {openMenu === "sports" && (
                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border rounded-md shadow-lg z-50">
                  <div className="p-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/products?sport=${category.name.toLowerCase()}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="text-sm font-medium leading-none">{category.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


        )

  }