"use client";

import { useAppDispatch, useAppSelector } from "../../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "../../../state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/state/api";
import debounce from "lodash.debounce"; // Optional for debouncing

// Define a type for Product
type Product = {
  productId: string;
  name: string;
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [searchTerm, setSearchTerm] = useState<string>(""); // Explicit type for searchTerm
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Define the type for filteredProducts
  const { data: products = [], isLoading } = useGetProductsQuery(); // Ensure data has a fallback to an empty array if undefined

  // Toggle sidebar and dark mode
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  // Debounced search handler to improve performance
  const handleSearch = debounce((searchValue: string) => {
    if (searchValue.trim()) {
      const filtered = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, 300);

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-60">
          <input
            type="search"
            placeholder="Start typing to search products"
            className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>

          {/* SEARCH SUGGESTIONS */}
          {searchTerm && filteredProducts.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
              {filteredProducts.map((product) => (
                <Link
                  key={product.productId}
                  href = {`/products/${product.productId}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}

          {/* No results found */}
          {searchTerm && filteredProducts.length === 0 && !isLoading && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="font-semibold">Kelly Phan</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
