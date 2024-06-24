'use client'
import React, { useState, useRef, useEffect } from 'react';
import { payment } from '@/app/lib/actions';
import { CartItem } from '@/app/lib/definitions';


export default function DropdownCart() {

  const [cartItems, setCartItems] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cartItems')));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Observar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCartItems = localStorage.getItem('cartItems');
      setCartItems(savedCartItems ? JSON.parse(savedCartItems) : []);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const removePair = (id: string) => {
    const indexOfItem = cartItems!.findIndex(item => item.id === id);
    if (cartItems![indexOfItem].quantity > 1) {
      const newCartItems = [...cartItems!];
      newCartItems[indexOfItem].quantity -= 1;
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems!.filter(item => item.id !== id);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };

  const totalAmount = cartItems!.reduce((total, item) => total + (item.quantity * item.unitCost), 0);

  const handleSubmit = () => {
    if (cartItems!.length!=0){
      payment(cartItems!);  
    }
  }
  
  // Cierra el carrito si se clickea fuera del mismo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">{cartItems.length}</span>
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
          <div className="p-4 bg-customCream text-black font-semibold">Carrito</div>
          <div className="p-4 max-h-60 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center my-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{item.brand_name} {item.model}</span>
                  <span className="text-sm">Pares: {item.quantity}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">${(item.quantity * item.unitCost).toFixed(2)}</span>
                  <button onClick={() => removePair(item.id)} className="ml-2 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.707 10l3.647-3.646a.5.5 0 00-.708-.708L8 9.293 4.354 5.646a.5.5 0 00-.708.708L7.293 10l-3.647 3.646a.5.5 0 00.708.708L8 10.707l3.646 3.647a.5.5 0 00.708-.708L8.707 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-customCream border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-left">
              <button className="btn text-white bg-gray-900 hover:bg-gray-500"
                    onClick={handleSubmit}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
