"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "hair", label: "Hair Care" },
    { value: "skin", label: "Skin Care" },
    { value: "wellness", label: "Wellness" },
    { value: "personal", label: "Personal Care" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered; // 'featured'
    }
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Our Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our collection of all-natural Ayurvedic remedies.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-background rounded-lg border">
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Sort by: Featured</SelectItem>
                <SelectItem value="price-asc">Sort by: Price low to high</SelectItem>
                <SelectItem value="price-desc">Sort by: Price high to low</SelectItem>
                <SelectItem value="name-asc">Sort by: Alphabetically</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
