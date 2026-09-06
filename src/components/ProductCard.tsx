import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const node = product.node;
  const selectedVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${node.title} agregado al carrito`, { position: "top-center" });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-transform duration-300 hover:-translate-y-1">
      <Link to="/product/$handle" params={{ handle: node.handle }} className="block">
        <div className="aspect-square overflow-hidden bg-secondary">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? node.title}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {node.productType ? (
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {node.productType}
          </span>
        ) : null}
        <Link to="/product/$handle" params={{ handle: node.handle }}>
          <h3 className="text-lg leading-snug font-semibold">{node.title}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{node.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-lg font-bold">
            {formatPrice(
              node.priceRange.minVariantPrice.amount,
              node.priceRange.minVariantPrice.currencyCode,
            )}
          </span>
          <Button onClick={handleAddToCart} disabled={isLoading || !selectedVariant} size="sm">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4" /> Agregar
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
