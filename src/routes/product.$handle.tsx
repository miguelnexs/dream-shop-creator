import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Plus, Star, ShieldCheck, Truck, Check, Package } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartSync } from "@/hooks/useCartSync";
import { useCartStore } from "@/stores/cartStore";
import { fetchAsentingProductById, formatPrice } from "@/lib/api";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Producto | AquaVida" },
      {
        name: "description",
        content: "Detalle del producto: precio, descripción y compra segura en AquaVida.",
      },
      { property: "og:title", content: "Producto | AquaVida" },
      {
        property: "og:description",
        content: "Detalle del producto: precio, descripción y compra segura en AquaVida.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  useCartSync();
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: product, isPending } = useQuery({
    queryKey: ["asenting-product", handle],
    queryFn: () => fetchAsentingProductById(handle),
  });

  const categoryName =
    typeof product?.category === "object" ? product?.category?.name : product?.category;

  const handleAddToCart = async () => {
    if (!product) return;
    await addItem({ product, quantity: 1 });
    toast.success(`${product.name} agregado al carrito`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        {isPending ? (
          <div className="mt-8 h-96 animate-pulse rounded-3xl bg-muted" />
        ) : !product ? (
          <div className="mt-16 text-center text-muted-foreground py-12 rounded-2xl border bg-card">
            <p className="font-semibold text-lg text-foreground">Producto no encontrado</p>
            <p className="text-sm mt-1">El producto solicitado no está disponible.</p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/">Regresar a la tienda</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Image Column */}
            <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-border/80 bg-muted/40 shadow-card relative aspect-square flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover aspect-square"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground/40 bg-secondary/30 select-none p-8">
                  <Package className="h-24 w-24 stroke-[1.2] opacity-70 mb-2" />
                  <span className="text-sm font-medium tracking-wider uppercase text-muted-foreground/60">
                    Sin imagen disponible
                  </span>
                </div>
              )}
              {product.is_sale && (
                <Badge className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs shadow-md">
                  Oferta Especial
                </Badge>
              )}
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                {categoryName && (
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    {categoryName}
                  </span>
                )}
                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl text-foreground leading-tight">
                  {product.name}
                </h1>

                {product.rating && (
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs text-amber-500 font-semibold">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-muted-foreground ml-1">Calificación 5.0 (Verificada)</span>
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-foreground">
                  {formatPrice(product.sale_price || product.price)}
                </span>
                {product.sale_price && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <div className="border-t border-border/50 pt-4">
                <p className="leading-relaxed text-sm sm:text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Características destacadas:
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>Envíos seguros a todo el país</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Garantía de calidad AquaVida</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full h-12 rounded-xl text-base font-bold gap-2 shadow-lg"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Agregar al Carrito</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
