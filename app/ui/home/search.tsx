  'use client'


  import { Input } from "@/app/ui/home/input"
  import { Button } from "@/app/ui/button"
  import { useSearchParams, usePathname, useRouter } from 'next/navigation';
  import { useDebouncedCallback } from 'use-debounce';
  import { useState } from "react";
  import { Search as SearchIcon } from "lucide-react";
  import { useEffect } from "react";

  export default function Search(){

      const searchParams = useSearchParams();
      const pathname = usePathname();
      const { replace } = useRouter();
      const [searchOpen, setSearchOpen] = useState(false)


      useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
              const target = event.target as Element
              if (!target.closest(".search-container")) {
                  setSearchOpen(false)
              }
      }

      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }, [])

      const handleSearch = useDebouncedCallback( (term) => {
          const params = new URLSearchParams(searchParams);
          if (term) {
              params.set('query', term);
          } else {
              params.delete('query');
          }
          replace(`${pathname}?${params.toString()}`);
      },300);

      return(
              <div className="relative search-container">
                {searchOpen && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50">
                      <div className="relative">
                        <Input
                          type="text" 
                          placeholder="Buscar un producto" 
                          onChange={(e) => {
                              handleSearch(e.target.value);
                          }}
                          defaultValue={searchParams.get('query')?.toString()}
                          className="w-48 pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white shadow-lg"
                          autoFocus
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => setSearchOpen(false)}
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </div>
                  </div>
                )}

                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="relative">
                  <SearchIcon className="h-5 w-5" />
                </Button>
              </div>        
      )
  }