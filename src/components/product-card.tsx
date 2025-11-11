"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const productImage =
    PlaceHolderImages.find((img) => img.id === `product-${product.id}`) ||
    PlaceHolderImages.find((img) => img.id === "product-8");
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={productImage.imageHint}
            />
          )}
        </div>
      </Link>
      <CardContent className="flex-grow p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-base leading-snug hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button variant="outline" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
