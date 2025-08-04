import { fetchBrands, fetchCategories } from "@/app/lib/data";
import { Brand, Category } from "@/app/lib/definitions";
import Link from "next/link";

export default async function Footer() {
  const brands: Brand[] = await fetchBrands();
  const categories: Category[] = await fetchCategories();

  return (
    <footer className="bg-black text-white mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">TNDA</span>
            </div>
            <p className="text-gray-400">Tu destino para las mejores zapatillas del mercado.</p>
          </div>

          {/* Marcas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Marcas</h3>
            <ul className="space-y-2 text-gray-400">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/products?brand=${brand.name.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categorías</h3>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.name.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:tnda-shoestore@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  tnda-shoestore@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/tndaShoestore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                  </svg>
                  @tndaShoestore
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TNDA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
