import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Discover the power of nature with our range of authentic Ayurvedic products for modern health.
            </p>
          </div>
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold font-headline mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VaidClone. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {SOCIAL_LINKS.map((social) => (
              <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
