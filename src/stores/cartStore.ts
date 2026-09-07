import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type AsentingProduct, formatPrice } from "@/lib/api";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image?: string | undefined;
  quantity: number;
  category?: string | undefined;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: { product: AsentingProduct; quantity?: number }) => Promise<void>;
  updateQuantity: (id: number | string, quantity: number) => void;
  removeItem: (id: number | string) => void;
  clearCart: () => void;
  syncCart: () => void;
  getWhatsAppOrderUrl: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isSyncing: false,

      addItem: async ({ product, quantity = 1 }) => {
        set({ isLoading: true });
        try {
          const currentItems = get().items;
          const existingIndex = currentItems.findIndex((item) => String(item.id) === String(product.id));

          if (existingIndex > -1) {
            const updated = [...currentItems];
            const existingItem = updated[existingIndex];
            if (existingItem) {
              existingItem.quantity += quantity;
            }
            set({ items: updated });
          } else {
            const newItem: CartItem = {
              id: product.id,
              name: product.name,
              price: product.sale_price || product.price,
              image: product.image,
              quantity,
              category: typeof product.category === "string" ? product.category : product.category?.name,
            };
            set({ items: [...currentItems, newItem] });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: (id: number | string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            String(item.id) === String(id) ? { ...item, quantity } : item,
          ),
        }));
      },

      removeItem: (id: number | string) => {
        set((state) => ({
          items: state.items.filter((item) => String(item.id) !== String(id)),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      syncCart: () => {
        // Validación de sincronización local
        set({ isSyncing: false });
      },

      getWhatsAppOrderUrl: () => {
        const { items } = get();
        if (items.length === 0) return "";

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        let text = "👋 ¡Hola AquaVida! Quiero realizar el siguiente pedido desde la tienda web:\n\n";
        items.forEach((item, index) => {
          text += `${index + 1}. *${item.name}* (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
        });
        text += `\n💰 *Total:* ${formatPrice(total)}\n`;
        text += `📦 ¿Tienen disponibilidad inmediata para despacho a mi ciudad?`;

        return `https://wa.me/573001234567?text=${encodeURIComponent(text)}`;
      },
    }),
    {
      name: "aquavida_cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
