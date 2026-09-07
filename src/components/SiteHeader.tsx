import { Link } from "@tanstack/react-router";
import { Fish, Menu, MessageCircle, Sparkles } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Catálogo", to: "/#catalogo" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Servicios", to: "/servicios" },
  { label: "Blog", to: "/blog" },
  { label: "Preguntas", to: "/faq" },
  { label: "Contacto", to: "/contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md transition-all">
      {/* Top micro banner */}
      <div className="bg-deep px-4 py-1.5 text-center text-xs font-medium text-deep-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-reef animate-pulse" />
          <span>¡Envíos gratis en compras mayores a $150.000! Garantía de vida en seres vivos.</span>
        </span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl surface-deep shadow-sm transition-all group-hover:shadow-md">
            <Fish className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-12" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              AquaVida
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
              Acuarios & Mascotas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {NAV_LINKS.map((link) => {
            const isAnchor = link.to.includes("#");
            if (isAnchor) {
              return (
                <a
                  key={link.label}
                  href={link.to}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.to}
                activeProps={{ className: "text-primary font-semibold" }}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-xs sm:inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400"
          >
            <a
              href="https://wa.me/573001234567?text=Hola%2C%20quisiera%20asesor%C3%ADa%20para%20mi%20acuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </Button>

          <CartDrawer />

          {/* Mobile Navigation Drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col justify-between">
                <div>
                  <SheetHeader className="text-left pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg surface-deep">
                        <Fish className="h-4 w-4 text-primary-foreground" />
                      </span>
                      <SheetTitle className="font-display text-lg">AquaVida</SheetTitle>
                    </div>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 py-6">
                    {NAV_LINKS.map((link) => {
                      const isAnchor = link.to.includes("#");
                      if (isAnchor) {
                        return (
                          <SheetClose asChild key={link.label}>
                            <a
                              href={link.to}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
                            >
                              {link.label}
                            </a>
                          </SheetClose>
                        );
                      }
                      return (
                        <SheetClose asChild key={link.label}>
                          <Link
                            to={link.to}
                            activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </div>

                <div className="border-t pt-4 space-y-3 pb-4">
                  <div className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">¿Necesitas ayuda con tu acuario?</p>
                    <p className="mt-0.5">Nuestros acuaristas están listos para asesorarte gratis.</p>
                  </div>
                  <Button asChild className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <a
                      href="https://wa.me/573001234567?text=Hola%2C%20quisiera%20asesor%C3%ADa%20para%20mi%20acuario"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Hablar por WhatsApp
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
