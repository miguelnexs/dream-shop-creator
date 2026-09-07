export const API_BASE_URL: string =
  (import.meta as any).env?.VITE_API_URL || "https://asenting.com";

export const buildApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

/**
 * Obtiene el parámetro de enlace (`site` o `aid`) exactamente como en la burbuja o en kooat:
 * - Si viene en la URL (?site=... o ?aid=...), se respeta directamente.
 * - Si se entra con la IP local (ej: http://192.168.101.4:8081), se enlaza ese origen.
 * - Si se entra por localhost o 127.0.0.1, enlaza a la URL registrada en Asenting (http://192.168.101.4:8081).
 */
export const getPublicParams = (): string => {
  if (typeof window === "undefined") {
    return `?site=${encodeURIComponent("http://192.168.101.4:8081")}`;
  }

  const params = new URLSearchParams(window.location.search);
  const siteParam = params.get("site");
  const aidParam = params.get("aid");

  if (siteParam) return `?site=${encodeURIComponent(siteParam)}`;
  if (aidParam) return `?aid=${encodeURIComponent(aidParam)}`;

  // Origen actual del navegador (ej: http://192.168.101.4:8081 o https://mitienda.com)
  let site = window.location.origin;

  // En desarrollo local desde localhost, mapear al enlace registrado en Asenting
  if (site.includes("localhost") || site.includes("127.0.0.1")) {
    site = "http://192.168.101.4:8081";
  }

  return `?site=${encodeURIComponent(site)}`;
};

export const buildMediaUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/media/${path}`;
};


export interface AsentingCategory {
  id: number;
  name: string;
  slug?: string | undefined;
  image?: string | undefined;
  description?: string | undefined;
  active?: boolean | undefined;
}

export interface AsentingProduct {
  id: number | string;
  name: string;
  description: string;
  price: number;
  sale_price?: number | undefined;
  image?: string | undefined;
  category?: { id?: number | undefined; name: string } | string | undefined;
  category_id?: number | string | undefined;
  category_name?: string | undefined;
  rating?: number | undefined;
  is_new?: boolean | undefined;
  is_sale?: boolean | undefined;
  features?: string[] | undefined;
  total_stock?: number | undefined;
}

export function formatPrice(price: number | string, currency = "USD"): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "$ 0.00";
  if (num < 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  }
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency || "COP",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `$ ${num.toLocaleString("es-CO")}`;
  }
}

// Obtener productos reales de la cuenta de Asenting vinculada por site
export async function fetchAsentingProducts(): Promise<AsentingProduct[]> {
  try {
    const url = buildApiUrl("webconfig/public/products/") + getPublicParams();
    console.log("[Asenting API] Consultando catálogo enlazado:", url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.results || [];
    console.log(`[Asenting API] ${list.length} productos enlazados correctamente.`);

    return list
      .filter((item: any) => item && item.active !== false && item.is_draft !== true)
      .map((item: any) => {
        const catId =
          typeof item.category === "number"
            ? item.category
            : typeof item.category === "object"
            ? item.category?.id
            : undefined;
        const catName =
          item.category_name ||
          (typeof item.category === "object" ? item.category?.name : typeof item.category === "string" ? item.category : "") ||
          "";

        return {
          id: item.id,
          name: item.name || item.title || "Producto",
          description: item.description || "",
          price: Number(item.price || 0),
          sale_price: item.sale_price ? Number(item.sale_price) : undefined,
          image: item.image ? buildMediaUrl(item.image) : "",
          category: catName || "General",
          category_id: catId,
          category_name: catName,
          rating: item.rating,
          is_new: item.is_new,
          is_sale: item.is_sale,
          total_stock: item.total_stock,
          features: item.features,
        };
      });
  } catch (error) {
    console.error("[Asenting API] Error al consultar productos:", error);
    return [];
  }
}

// Obtener detalle de producto real por ID desde Asenting
export async function fetchAsentingProductById(id: string | number): Promise<AsentingProduct | null> {
  try {
    const url = buildApiUrl(`webconfig/public/products/${id}/`) + getPublicParams();
    const res = await fetch(url);
    if (res.ok) {
      const item = await res.json();
      if (item.active === false || item.is_draft === true) {
        return null;
      }
      const catId =
        typeof item.category === "number"
          ? item.category
          : typeof item.category === "object"
          ? item.category?.id
          : undefined;
      const catName =
        item.category_name ||
        (typeof item.category === "object" ? item.category?.name : typeof item.category === "string" ? item.category : "") ||
        "";

      return {
        id: item.id,
        name: item.name || item.title || "Producto",
        description: item.description || "",
        price: Number(item.price || 0),
        sale_price: item.sale_price ? Number(item.sale_price) : undefined,
        image: item.image ? buildMediaUrl(item.image) : "",
        category: catName || "General",
        category_id: catId,
        category_name: catName,
        rating: item.rating,
        is_new: item.is_new,
        is_sale: item.is_sale,
        total_stock: item.total_stock,
        features: item.features,
      };
    }
  } catch (e) {
    console.error("[Asenting API] Error al obtener producto por ID:", e);
  }

  // Fallback: buscar directamente en el catálogo enlazado
  try {
    const all = await fetchAsentingProducts();
    const match = all.find((p) => String(p.id) === String(id));
    if (match) return match;
  } catch {}

  return null;
}

// Obtener categorías reales de Asenting vinculadas por site (solo las publicadas)
export async function fetchAsentingCategories(): Promise<AsentingCategory[]> {
  try {
    const url = buildApiUrl("webconfig/public/categories/") + getPublicParams();
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.results || [];
      return list.filter(
        (c: any) =>
          c &&
          c.name &&
          typeof c.name === "string" &&
          c.name.trim() !== "" &&
          c.active !== false &&
          c.is_active !== false &&
          c.visible !== false
      );
    }
  } catch (e) {
    console.error("[Asenting API] Error cargando categorías de Asenting:", e);
  }

  return [];
}
