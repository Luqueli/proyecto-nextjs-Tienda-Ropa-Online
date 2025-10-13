"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, X } from "lucide-react"
import { payment } from "@/app/lib/actions"
import type { CartItem } from "@/app/lib/definitions"
import { Button } from "@/app/ui/button"

export default function DropdownCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Actualizar el carrito en el primer renderizado y observar cambios en localStorage.
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCartItems = localStorage.getItem("cartItems")
      setCartItems(savedCartItems ? JSON.parse(savedCartItems) : [])
    }

    handleStorageChange()

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const removePair = (id: string) => {
    const indexOfItem = cartItems.findIndex((item) => item.id === id)

    if (cartItems[indexOfItem].quantity > 1) {
      const newCartItems = [...cartItems]
      newCartItems[indexOfItem].quantity -= 1
      setCartItems(newCartItems)
      localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    } else {
      const newCartItems = cartItems.filter((item) => item.id !== id)
      setCartItems(newCartItems)
      localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    }
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.unitCost, 0)

  const handleSubmit = () => {
    if (cartItems.length !== 0) {
      payment(cartItems)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" onClick={toggleDropdown} className="relative">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
          {cartItems.length}
        </span>
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-4 bg-gray-50 text-black font-semibold border-b">
            <div className="flex items-center justify-between">
              <span>Carrito</span>
              <Button variant="ghost" size="icon" onClick={() => setIsDropdownOpen(false)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 max-h-60 overflow-y-auto bg-white">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm">
                      {item.brandName} {item.productName}
                    </span>
                    <span className="text-xs text-gray-600">Cantidad: {item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">€{(item.quantity * item.unitCost).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePair(item.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">€{totalAmount.toFixed(2)}</span>
              </div>
              <Button onClick={handleSubmit} className="w-full bg-black hover:bg-gray-800 text-white">
                Comprar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
