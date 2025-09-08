'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/products/select";

import { Category, Brand } from "@/app/lib/definitions";
import { useState, useEffect } from "react";

export default function Filters({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "all");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // Reiniciamos a la primera página cuando cambian los filtros
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSelectedBrand(searchParams.get("brand") || "all");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {/* Podrías pasar searchQuery desde el padre si lo necesitas */}
              {searchParams.get("query")
                ? `Resultados para "${searchParams.get("query")}"`
                : "Todos los Productos"}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedBrand}
              onValueChange={(val) => {
                setSelectedBrand(val);
                updateParams("brand", val);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.name}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={(val) => {
                setSelectedCategory(val);
                updateParams("category", val);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
