import { Link } from "@tanstack/react-router";
import { Fish } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full surface-deep">
            <Fish className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">AquaVida</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <a href="/#catalogo" className="transition-colors hover:text-foreground">
            Catálogo
          </a>
          <a href="/#tienda" className="transition-colors hover:text-foreground">
            La tienda
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
