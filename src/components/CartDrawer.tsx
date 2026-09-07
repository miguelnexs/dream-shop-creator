import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle, Package } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/api";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getWhatsAppOrderUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckoutWhatsApp = () => {
    const url = getWhatsAppOrderUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-xl">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-accent text-accent-foreground border-2 border-background">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-6">
        <SheetHeader className="text-left border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-lg">Tu Carrito de Compras</SheetTitle>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Vaciar
              </button>
            )}
          </div>
          <SheetDescription className="text-xs">
            {totalItems === 0
              ? "Aún no has agregado productos a tu urna."
              : `${totalItems} artículo${totalItems !== 1 ? "s" : ""} seleccionado${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0 py-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
                <ShoppingCart className="h-8 w-8 opacity-60" />
              </div>
              <p className="font-semibold text-sm text-foreground">Tu carrito está vacío</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Explora nuestro catálogo de acuarios, plantas, filtros y alimentos para añadir tus preferidos.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl border border-border/70 bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className="w-16 h-16 bg-muted/50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-7 h-7 text-muted-foreground/40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-primary mt-0.5">
                        {formatPrice(item.price)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer shrink-0"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-4 mt-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Subtotal estimado</span>
                  <span className="font-display font-extrabold text-lg text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  * Los costos de envío e impuestos se coordinan de forma personalizada según tu ciudad.
                </p>

                <Button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-sm shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Pedir por WhatsApp ({formatPrice(totalPrice)})</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
