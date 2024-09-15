"use client";

import { useAppDispatch, useAppSelector } from "../../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "../../../state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useGetProductsQuery } from "@/state/api";
import debounce from "lodash.debounce";

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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const { data: products = [], isLoading } = useGetProductsQuery();

  const suggestionsRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

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

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (highlightedIndex === null || highlightedIndex === filteredProducts.length - 1) {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(prevIndex => prevIndex !== null ? prevIndex + 1 : 0);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlightedIndex === null || highlightedIndex === 0) {
        setHighlightedIndex(filteredProducts.length - 1);
      } else {
        setHighlightedIndex(prevIndex => prevIndex !== null ? prevIndex - 1 : filteredProducts.length - 1);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex !== null && filteredProducts[highlightedIndex]) {
        window.location.href = `/products/${filteredProducts[highlightedIndex].productId}`;
      }
    }
  };

  useEffect(() => {
    setHighlightedIndex(null);
  }, [searchTerm]);

  useEffect(() => {
    if (suggestionsRef.current && highlightedIndex !== null) {
      const suggestion = suggestionsRef.current.children[highlightedIndex] as HTMLElement;
      if (suggestion) {
        suggestionsRef.current.scrollTop = suggestion.offsetTop - suggestionsRef.current.clientHeight / 2 + suggestion.clientHeight / 2;
      }
    }
  }, [highlightedIndex]);

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
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>

          {/* SEARCH SUGGESTIONS */}
          {searchTerm && filteredProducts.length > 0 && (
            <div
              className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto"
              ref={suggestionsRef}
            >
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.productId}
                  href={`/products/${product.productId}`}
                  className={`block px-4 py-2 ${index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
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
