import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Cloud,
  Database,
  ExternalLink,
  Github,
  Layers,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const liveUrl = "https://e-commerce-team-2.runasp.net/";
const githubUrl = "https://github.com/ziadeslam-git/ECommerce_System";

const highlights = [
  "Admin area for catalog, products, variants, orders, shipments, payments, discounts, reviews, and users.",
  "Customer storefront with product browsing, cart, wishlist, checkout, order history, cancellation, and reviews.",
  "Identity area for register/login, password reset, external auth hooks, profile editing, and address management.",
  "Stock-aware product variants, coupon validation, payment/shipment states, and role-based access separation.",
];

const techStack = [
  ".NET 10",
  "ASP.NET Core MVC",
  "Razor Views",
  "Entity Framework Core 10",
  "SQL Server",
  "ASP.NET Core Identity",
  "Stripe.net",
  "Cloudinary",
  "MailKit SMTP",
  "Tailwind utility styling",
  "ASP.NET Core Localization",
];

const featureGroups = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Area-Based Architecture",
    body: "The codebase is separated into Admin, Customer, and Identity areas with controllers, ViewModels, repositories, and a Unit of Work layer.",
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "Commerce Workflow",
    body: "The customer flow covers product details, stock-aware variants, wishlist, cart, coupons, checkout, order placement, and post-purchase reviews.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Accounts And Roles",
    body: "ASP.NET Core Identity powers authentication, profile data, address management, external login hooks, and role-based admin/customer separation.",
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: "Real Integrations",
    body: "Cloudinary handles product and profile media, Stripe sandbox supports card checkout experiments, and MailKit supports email flows.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Domain Modeling",
    body: "The model includes categories, products, variants, images, carts, orders, payments, shipments, discounts, reviews, addresses, and users.",
  },
];

const SmartStoreProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Smart Store E-Commerce | Project Details";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Smart Store is a full-stack ASP.NET Core MVC e-commerce project with admin, customer, Identity, checkout, Stripe, Cloudinary, localization, and SQL Server."
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)_/_0.18),transparent_36rem)]" />
        <div className="container relative z-10 mx-auto px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
          <Button
            variant="outline"
            className="mb-10 rounded-full border-white/15 text-white/75 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            asChild
          >
            <Link to="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Full-Stack E-Commerce Case Study
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Smart Store <span className="text-primary">E-Commerce</span>
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/70">
                Smart Store is a full-stack ASP.NET Core MVC graduation project built around a real multi-area commerce workflow. It combines admin operations, customer shopping, Identity, catalog management, stock-aware variants, carts, wishlists, coupons, checkout, order tracking, review moderation, localization, media uploads, and responsive dashboards in one codebase.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="rounded-full bg-primary px-7 py-6 font-semibold text-primary-foreground shadow-glow hover:bg-primary-glow" asChild>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Live Store
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 px-7 py-6 font-semibold text-white hover:border-white/40 hover:bg-white/10" asChild>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/5 shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}uploads/smart-store-preview.png`}
                alt="Smart Store production homepage"
                className="h-full w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-2xl border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-5 text-2xl font-bold text-white">Core Highlights</h2>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/70">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <div>
            <h2 className="mb-5 text-2xl font-bold text-white">Technical Scope</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureGroups.map((feature) => (
                <Card key={feature.title} className="rounded-2xl border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-6 text-white/60">{feature.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="mt-8 rounded-2xl border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 text-2xl font-bold text-white">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} className="border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75 hover:border-primary/30 hover:bg-primary/10 hover:text-primary">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default SmartStoreProject;
