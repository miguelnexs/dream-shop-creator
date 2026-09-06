import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Droplets, Truck, HeartHandshake } from "lucide-react";
import heroAsset from "@/assets/hero.jpg.asset.json";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { useCartSync } from "@/hooks/useCartSync";
import { fetchProducts } from "@/lib/shopify";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaVida | Acuarios, peces y accesorios para mascotas" },
      {
        name: "description",
        content:
          "Tienda online de acuarios, filtros, plantas naturales, alimento y accesorios para peces y aves. Envíos a todo el país.",
      },
      { property: "og:title", content: "AquaVida | Acuarios y accesorios para mascotas" },
      {
        property: "og:description",
        content:
          "Acuarios, filtros, plantas naturales, alimento y accesorios para peces y aves. Envíos a todo el país.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useCartSync();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(50),
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Interior de la tienda con acuarios plantados iluminados"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative bg-[linear-gradient(100deg,oklch(0.2_0.06_220/0.92),oklch(0.2_0.06_220/0.55))]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <p className="text-sm uppercase tracking-[0.3em] text-deep-foreground/70">
              Acuarismo y mascotas
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-bold text-deep-foreground sm:text-6xl">
              Tu acuario, vivo desde el primer día.
            </h1>
            <p className="mt-5 max-w-xl text-base text-deep-foreground/80 sm:text-lg">
              Acuarios plantados, filtración, alimento y accesorios seleccionados por acuaristas.
              Todo lo que hay en nuestra tienda de barrio, ahora a un clic.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <a href="#catalogo">Ver el catálogo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:grid-cols-3">
        {[
          { icon: Droplets, title: "Agua sana", text: "Filtros y sustratos probados en tienda." },
          { icon: Truck, title: "Envíos seguros", text: "Empaque especial para vidrio y plantas." },
          { icon: HeartHandshake, title: "Asesoría real", text: "Te ayudamos a armar tu acuario." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3 rounded-2xl border bg-card p-5 shadow-card">
            <Icon className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl px-5 pb-10">
        <h2 className="text-3xl font-bold sm:text-4xl">Catálogo</h2>
        <p className="mt-2 text-muted-foreground">Productos disponibles para envío inmediato.</p>

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="mt-10 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            No hay productos todavía.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section id="tienda" className="mx-auto max-w-6xl px-5 py-16">
        <div className="overflow-hidden rounded-3xl surface-deep p-8 shadow-tank sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">La tienda</h2>
          <p className="mt-4 max-w-2xl opacity-85">
            Somos una tienda de acuarismo y mascotas: acuarios plantados, peces, aves y todo lo que
            necesitan para vivir bien. Escríbenos y armamos tu montaje a la medida.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
