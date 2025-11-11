import { Facebook, Instagram, Twitter } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export const FOOTER_LINKS = [
    {
        title: "Shop",
        links: [
            { label: "Hair Care", href: "/products?category=hair" },
            { label: "Skin Care", href: "/products?category=skin" },
            { label: "Wellness", href: "/products?category=wellness" },
            { label: "All Products", href: "/products" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "FAQ", href: "/faq" },
            { label: "Shipping Policy", href: "/shipping" },
            { label: "Returns & Exchanges", href: "/returns" },
            { label: "Privacy Policy", href: "/privacy" },
        ],
    },
];

export const SOCIAL_LINKS = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
];
