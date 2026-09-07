import { Link } from "@tanstack/react-router";
import { Loader2, Plus, Star, Package } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type AsentingProduct } from "@/lib/api";

export function ProductCard({ product }: { product: AsentingProduct | any }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  if (!product) return null;

  // Normalizar producto por si viniera con estructura de nodo (Shopify) o directa (Asenting)
  const raw: AsentingProduct = product.node
    ? {
        id: product.node.id,
        name: product.node.title || "Producto",
        description: product.node.description || "",
        price: parseFloat(product.node.priceRange?.minVariantPrice?.amount || "0"),
        image: product.node.images?.edges?.[0]?.node?.url || "",
        category: product.node.productType || "Acuarismo",
      }
    : product;

  const productId = String(raw.id ?? "1");
  const name = raw.name || "Producto";
  const description = raw.description || "";
  const image = raw.image || "";

  const categoryName =
    typeof raw.category === "object" ? raw.category?.name : raw.category;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addItem({ product: raw, quantity: 1 });
    toast.success(`${name} agregado al carrito`, { position: "top-center" });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to="/product/$handle" params={{ handle: productId }} className="block relative">
        <div className="aspect-square overflow-hidden bg-muted/40 relative flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground/40 bg-secondary/30 select-none p-4">
              <Package className="h-16 w-16 stroke-[1.2] opacity-70 mb-1" />
              <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground/60">
                Sin imagen
              </span>
            </div>
          )}
          {raw.is_sale && (
            <Badge className="absolute top-3 left-3 bg-rose-500 text-white font-bold text-xs shadow-md">
              Oferta
            </Badge>
          )}
          {raw.is_new && !raw.is_sale && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-bold text-xs shadow-md">
              Nuevo
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          {categoryName ? (
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              {categoryName}
            </span>
          ) : (
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Acuarismo
            </span>
          )}

          {raw.rating && (
            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{raw.rating}</span>
            </div>
          )}
        </div>

        <Link to="/product/$handle" params={{ handle: productId }}>
          <h3 className="text-base sm:text-lg leading-snug font-bold text-foreground hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-foreground">
              {formatPrice(raw.sale_price || raw.price)}
            </span>
            {raw.sale_price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(raw.price)}
              </span>
            )}
          </div>

          <Button onClick={handleAddToCart} disabled={isLoading} size="sm" className="rounded-xl gap-1.5 font-semibold">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Agregar</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
