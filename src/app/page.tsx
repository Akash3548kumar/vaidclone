import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, HeartPulse, Leaf, Package, ShieldCheck, Sparkles, Star, Truck, Wind } from "lucide-react";
import { products } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  const categories = [
    { name: "Hair Care", icon: Leaf, href: "/products?category=hair" },
    { name: "Skin Care", icon: Sparkles, href: "/products?category=skin" },
    { name: "Wellness", icon: HeartPulse, href: "/products?category=wellness" },
    { name: "Personal Care", icon: Wind, href: "/products?category=personal" },
  ];

  const whyChooseUs = [
    { title: "100% Natural", description: "Our products are made from the purest natural ingredients.", icon: Leaf },
    { title: "Quality Assured", description: "Rigorous testing ensures the highest quality and safety.", icon: ShieldCheck },
    { title: "Secure Packaging", description: "Your products are packed securely for safe transit.", icon: Package },
    { title: "Fast Delivery", description: "We provide fast and reliable delivery to your doorstep.", icon: Truck },
  ];

  const testimonials = [
    { name: "Priya S.", text: "The hair oil is a miracle! My hair has never felt so healthy and strong. I'm a customer for life.", rating: 5 },
    { name: "Rajesh K.", text: "I was skeptical about herbal supplements, but the wellness capsules have genuinely improved my energy levels.", rating: 5 },
    { name: "Anjali M.", text: "The face cream is so gentle and effective. My skin feels soft and looks radiant. Highly recommend!", rating: 5 },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[600px] w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg text-white">
                      {index === 0 ? "Embrace Natural Wellness" : "Rediscover Ancient Remedies"}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                      {index === 0
                        ? "Harnessing the power of nature to bring you health and vitality."
                        : "Timeless Ayurvedic solutions for modern-day health challenges."}
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/products">Shop Now</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4 group-hover:bg-accent/20 transition-colors">
                      <category.icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold font-headline">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Explore our best-selling products, trusted by thousands for their purity and effectiveness.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VaidClone?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
                <CardFooter>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">New Arrivals</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Check out the latest additions to our collection of natural remedies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Community</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive updates, health tips, and special offers.
          </p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-white/90 text-primary placeholder:text-muted-foreground"
            />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
