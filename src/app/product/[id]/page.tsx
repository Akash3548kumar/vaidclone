"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  const productImage = PlaceHolderImages.find((img) => img.id === `product-${product.id}`) || PlaceHolderImages[0];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square">
          <Image
            src={productImage.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-lg"
            data-ai-hint={productImage.imageHint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
            </div>
            <span className="text-muted-foreground text-sm">(12 reviews)</span>
          </div>
          <p className="text-2xl font-bold text-primary mt-4">${product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          <Separator className="my-6" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </div>
  );
}
