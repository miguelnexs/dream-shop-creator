import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useCartSync } from "@/hooks/useCartSync";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";

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
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const node = product?.node;
  const variant = node?.variants.edges[0]?.node;
  const image = node?.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Agregado al carrito", { position: "top-center" });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        {isPending ? (
          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-muted" />
        ) : !node ? (
          <p className="mt-16 text-center text-muted-foreground">Producto no encontrado.</p>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border bg-secondary shadow-card">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText ?? node.title}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div>
              {node.productType ? (
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {node.productType}
                </span>
              ) : null}
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{node.title}</h1>
              <p className="mt-4 text-2xl font-bold text-primary">
                {formatPrice(
                  node.priceRange.minVariantPrice.amount,
                  node.priceRange.minVariantPrice.currencyCode,
                )}
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">{node.description}</p>
              <Button
                className="mt-8 w-full sm:w-auto"
                size="lg"
                onClick={handleAddToCart}
                disabled={isLoading || !variant}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Agregar al carrito
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
