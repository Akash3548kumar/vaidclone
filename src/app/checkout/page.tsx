"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cardCvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [cartItems, router]);

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout data:", data);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push("/");
  };

  const getProductImage = (productId: string) => {
    return PlaceHolderImages.find((img) => img.id === `product-${productId}`) || PlaceHolderImages[0];
  };

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-semibold">Your cart is empty. Redirecting...</h1>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} placeholder="you@example.com" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                     <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="cardName" render={({ field }) => (
                      <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                  />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (
                      <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input {...field} placeholder="•••• •••• •••• ••••" /></FormControl><FormMessage /></FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                        <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input {...field} placeholder="MM/YY" /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                        <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} placeholder="•••" /></FormControl><FormMessage /></FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                Place Order - ${cartTotal.toFixed(2)}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map((item) => {
                            const image = getProductImage(item.id);
                            return (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                        <Image
                                            src={image.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={image.imageHint}
                                        />
                                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                    </div>
                                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            );
                        })}
                        <Separator />
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span className="font-medium">FREE</span>
                        </div>
                        <Separator />
                         <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
