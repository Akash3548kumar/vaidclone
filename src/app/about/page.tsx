import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Leaf, ShieldCheck, Target, Users } from "lucide-react";

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'hero-2') ?? PlaceHolderImages[0];

  const team = [
    { name: "Dr. Alok Sharma", role: "Chief Ayurvedic Officer" },
    { name: "Sunita Patel", role: "Head of Product Development" },
    { name: "Rajiv Singh", role: "Lead Botanist" },
    { name: "Meera Desai", role: "Quality Assurance Lead" },
  ];

  return (
    <div className="bg-background">
      <section className="relative h-80">
        <Image
          src={aboutImage.imageUrl}
          alt="Our Team"
          fill
          className="object-cover"
          data-ai-hint="herbal medicine"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">About VaidClone</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Merging ancient wisdom with modern science for your holistic well-being.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                VaidClone was born from a passion for natural healing and a deep respect for the ancient traditions of Ayurveda. We saw a need for pure, effective, and trustworthy herbal products in a market flooded with synthetic alternatives.
              </p>
              <p className="text-muted-foreground">
                Our journey began in a small workshop, carefully sourcing ingredients and perfecting our formulations. Today, we are proud to offer a wide range of products that bring the timeless benefits of nature to your doorstep, helping you lead a healthier, more balanced life.
              </p>
            </div>
            <div>
                <Image
                    src="https://picsum.photos/seed/about-story/600/400"
                    alt="Our workshop"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="workshop interior"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Our Mission & Values</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our guiding principles define our commitment to you and to nature.</p>
            </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Purity</h3>
              <p className="text-muted-foreground">We are committed to using only the purest, 100% natural ingredients, sourced responsibly and sustainably.</p>
            </div>
            <div className="p-6">
                <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
              <h3 className="text-xl font-semibold mb-2">Efficacy</h3>
              <p className="text-muted-foreground">Our formulations are backed by both ancient texts and modern research to ensure they deliver real results.</p>
            </div>
            <div className="p-6">
              <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">We maintain transparency in our processes and are honest in our promises to you, our valued customer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Meet Our Team</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">The dedicated experts behind VaidClone's commitment to quality.</p>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-32 w-32 mx-auto mb-4">
                    <Image
                        src={`https://picsum.photos/seed/${member.name.replace(' ','-')}/128/128`}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="rounded-full object-cover shadow-md"
                        data-ai-hint="portrait professional"
                    />
                </div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
