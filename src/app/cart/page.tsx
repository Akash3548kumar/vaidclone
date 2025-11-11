"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useCart();

  const getProductImage = (productId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === `product-${productId}`);
    return image || PlaceHolderImages[0];
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
      {cartCount > 0 ? (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cartItems.map((item) => {
                    const image = getProductImage(item.id);
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={image.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Unit Price: ${item.price.toFixed(2)}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg flex flex-col items-center">
            <div className="rounded-full bg-secondary p-6 mb-6">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty.</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
