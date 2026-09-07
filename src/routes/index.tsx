import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Droplets,
  Truck,
  HeartHandshake,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Fish,
  Wrench,
  Layers,
  HeartPulse,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import heroAsset from "@/assets/hero.jpg.asset.json";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { useCartSync } from "@/hooks/useCartSync";
import { fetchAsentingProducts, fetchAsentingCategories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const QUICK_FAQS = [
  {
    q: "¿Cómo garantizan que los peces y plantas lleguen vivos?",
    a: "Utilizamos empaque profesional con bolsas de doble sellado inyectadas con oxígeno puro grado médico, dentro de cajas térmicas de icopor de alta densidad. Garantizamos 100% su llegada viva.",
  },
  {
    q: "¿Hacen envíos a todas las ciudades de Colombia?",
    a: "Sí, despachamos equipos, filtros y alimentos a todo el país. Para peces e invertebrados vivos, hacemos envíos prioritarios express (24h) a las principales ciudades.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos tarjetas de crédito/débito, PSE, transferencias directas Bancolombia, Nequi y Daviplata. Todos los pagos están protegidos con encriptación segura.",
  },
  {
    q: "¿Ofrecen servicio de mantenimiento a domicilio?",
    a: "Sí, contamos con un equipo técnico especializado para limpieza profunda, calibración de parámetros y cambios de agua en hogares y empresas.",
  },
];

function Index() {
  useCartSync();
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  // Productos de la cuenta de Asenting
  const { data: rawProducts = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["asenting-products"],
    queryFn: () => fetchAsentingProducts(),
  });

  // Categorías de la cuenta de Asenting (solo las publicadas)
  const { data: rawCategories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["asenting-categories"],
    queryFn: () => fetchAsentingCategories(),
  });

  const isLoading = isLoadingProducts || isLoadingCategories;

  // Solo las categorías que están publicadas
  const publishedCategories = useMemo(() => {
    if (!Array.isArray(rawCategories)) return [];
    return rawCategories.filter(
      (c: any) => c && c.name && typeof c.name === "string" && c.name.trim() !== ""
    );
  }, [rawCategories]);

  // Si la categoría activa actual se despublica o no existe, regresar a "todos"
  useEffect(() => {
    if (activeCategory !== "todos" && publishedCategories.length > 0) {
      const exists = publishedCategories.some(
        (c: any) =>
          String(c.id) === activeCategory ||
          c.name.trim().toLowerCase() === activeCategory.toLowerCase()
      );
      if (!exists) {
        setActiveCategory("todos");
      }
    }
  }, [publishedCategories, activeCategory]);

  // Mapear productos brutos de la cuenta de Asenting
  const products = useMemo(() => {
    return (Array.isArray(rawProducts) ? rawProducts : [])
      .map((p: any) => {
        if (!p) return null;
        if (p.node) {
          return {
            id: p.node.id,
            name: p.node.title || "Producto",
            description: p.node.description || "",
            price: parseFloat(p.node.priceRange?.minVariantPrice?.amount || "0"),
            image: p.node.images?.edges?.[0]?.node?.url || "",
            category: p.node.productType || "General",
          };
        }
        return p;
      })
      .filter(Boolean);
  }, [rawProducts]);

  // Lista dinámica de categorías para el filtro: solo "Todos" y las categorías publicadas
  const dynamicCategories = useMemo(() => {
    return [
      { id: "todos", name: "Todos" },
      ...publishedCategories.map((c: any) => ({
        id: String(c.id),
        name: c.name.trim(),
      })),
    ];
  }, [publishedCategories]);

  // Filtrado reactivo de productos según la categoría seleccionada
  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      if (!p) return false;
      if (activeCategory === "todos") return true;

      const pCatId = p.category_id != null ? String(p.category_id) : null;
      const pCatName = (
        typeof p.category === "object" ? p.category?.name : p.category || ""
      ).trim().toLowerCase();

      const isMatchId = pCatId && pCatId === activeCategory;
      const isMatchName = pCatName && pCatName === activeCategory.toLowerCase();

      return isMatchId || isMatchName;
    });
  }, [products, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* HERO / PORTADA */}
        <section className="relative overflow-hidden min-h-[620px] lg:min-h-[700px] flex items-center">
          <img
            src="/hero.jpg"
            alt="Showroom de acuarios plantados de concurso e iluminación natural AquaVida"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover scale-105 animate-in fade-in duration-700"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,oklch(0.18_0.07_220/0.95)_0%,oklch(0.20_0.06_220/0.85)_50%,oklch(0.22_0.06_220/0.5)_100%)]" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-28 w-full">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-reef backdrop-blur-md border border-white/15">
                <Sparkles className="h-3.5 w-3.5 text-reef animate-spin [animation-duration:6s]" />
                <span>Tienda Oficial de Acuarismo Natural</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl leading-[1.08] font-extrabold text-deep-foreground sm:text-6xl lg:text-6xl tracking-tight">
                Tu acuario, vivo y en equilibrio desde el primer día.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-deep-foreground/85 max-w-xl leading-relaxed">
                Acuarios plantados, sistemas de filtración, especies seleccionadas y asesoría
                biológica personalizada. Todo lo que tu ecosistema necesita, con despacho seguro a
                tu puerta.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-reef text-deep hover:bg-reef/90 font-bold px-7 shadow-lg shadow-reef/20 transition-all hover:scale-105"
                >
                  <a href="#catalogo">
                    <span>Ver Catálogo</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/30 text-white hover:bg-white/15 backdrop-blur-sm"
                >
                  <Link to="/servicios">Nuestros Servicios</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-deep-foreground/90 hover:text-white hover:bg-white/10"
                >
                  <Link to="/nosotros">Conócenos →</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-deep-foreground/75">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-deep-foreground">4.9/5</span>
                  <span>(+1,200 reseñas)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-reef" />
                  <span>Garantía de llegada viva</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-reef" />
                  <span>Envíos climatizados 24h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS CLAVE */}
        <section className="mx-auto grid max-w-6xl gap-5 px-5 -mt-10 relative z-20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Droplets,
              title: "Agua Sana & Equilibrada",
              text: "Filtros biológicos y sustratos activos probados en tienda.",
            },
            {
              icon: Truck,
              title: "Envíos Climatizados",
              text: "Empaque térmico especial con oxígeno puro para peces y plantas.",
            },
            {
              icon: HeartHandshake,
              title: "Asesoría Gratuita",
              text: "Te guiamos paso a paso en el ciclado y armado de tu urna.",
            },
            {
              icon: ShieldCheck,
              title: "Garantía de Vida",
              text: "Respaldamos el 100% de los envíos de plantas y ejemplares.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-3.5 rounded-2xl border border-border/80 bg-card p-5 shadow-card hover:shadow-lg transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CATÁLOGO DE PRODUCTOS */}
        <section id="catalogo" className="mx-auto max-w-6xl px-5 pt-20 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Colección Exclusiva
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mt-1">
                Catálogo de Productos
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Insumos, urnas y accesorios listos para despacho inmediato.
              </p>
            </div>

            {/* Filter pills dinámicas: SOLO categorías publicadas */}
            <div className="flex flex-wrap gap-2">
              {dynamicCategories.map((catItem) => {
                const isSelected =
                  activeCategory.toLowerCase() === catItem.id.toLowerCase() ||
                  activeCategory.toLowerCase() === catItem.name.toLowerCase();
                return (
                  <button
                    key={catItem.id}
                    onClick={() => setActiveCategory(catItem.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {catItem.name}
                  </button>
                );
              })}
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-border/80 bg-card p-12 text-center text-muted-foreground space-y-4 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground text-lg">
                  {products.length === 0
                    ? "No hay productos disponibles en tu cuenta de Asenting"
                    : "No hay productos en esta categoría"}
                </p>
                <p className="text-sm max-w-md mx-auto">
                  {products.length === 0
                    ? "Activa o publica tus productos en el panel de control de Asenting para que aparezcan en tu tienda."
                    : "Selecciona otra categoría o pulsa 'Ver todos' para ver los productos disponibles."}
                </p>
              </div>
              {products.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setActiveCategory("todos")}>
                  Ver todos los productos
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product: any, idx: number) => (
                <ProductCard
                  key={product?.id != null ? String(product.id) : `prod-${idx}`}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>

        {/* SERVICIOS ESTRELLA PREVIEW */}
        <section className="py-16 bg-muted/20 border-t border-border/60">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                  Atención Especializada
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mt-1">
                  Nuestros Servicios
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Desde mantenimiento periódico a domicilio hasta proyectos de aquascaping de alto nivel.
                </p>
              </div>

              <Button asChild variant="outline" className="shrink-0 gap-1.5">
                <Link to="/servicios">
                  <span>Ver todos los servicios</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Wrench,
                  title: "Mantenimiento a Domicilio",
                  text: "Limpieza de cristales, sifonado, control de algas, test de química y cambio de agua para hogares y empresas.",
                  linkText: "Cotizar mantenimiento",
                },
                {
                  icon: Layers,
                  title: "Aquascaping a Medida",
                  text: "Diseño e instalación de urnas de concurso estilo japonés con rocas Seiryu, maderas curadas y flora in-vitro.",
                  linkText: "Explorar diseños",
                },
                {
                  icon: HeartPulse,
                  title: "Asesoría Biológica Gratuita",
                  text: "Diagnóstico de enfermedades de peces, prevención de picos tóxicos y compatibilidad de especies comunitarias.",
                  linkText: "Consultar a un biólogo",
                },
              ].map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.title}
                    className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{srv.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {srv.text}
                      </p>
                    </div>

                    <Link
                      to="/servicios"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 pt-2"
                    >
                      <span>{srv.linkText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUIÉNES SOMOS / LA TIENDA */}
        <section id="tienda" className="mx-auto max-w-6xl px-5 py-16">
          <div className="overflow-hidden rounded-3xl surface-deep p-8 shadow-tank sm:p-12">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-reef">
                  <Fish className="h-3.5 w-3.5" />
                  Sobre Nosotros
                </span>
                <h2 className="text-3xl font-bold sm:text-4xl text-deep-foreground">
                  Somos una comunidad apasionada por la vida acuática
                </h2>
                <p className="text-sm sm:text-base text-deep-foreground/85 leading-relaxed max-w-2xl">
                  En AquaVida combinamos 10 años de experiencia técnica con un profundo respeto por
                  los ecosistemas. Te acompañamos desde tu primer pez betta hasta el montaje de
                  acuarios plantados de concurso.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button asChild variant="secondary" className="font-semibold">
                    <Link to="/nosotros">Conoce Nuestra Historia</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Link to="/contacto">Visitar Tienda Física</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 rounded-2xl bg-black/20 p-6 backdrop-blur-md border border-white/10 text-center space-y-4">
                <p className="font-display text-4xl font-extrabold text-reef">+5,000</p>
                <p className="text-xs text-deep-foreground/80 font-medium">
                  Acuarios y biotopos activos instalados en todo el país.
                </p>
                <div className="h-px bg-white/10 w-3/4 mx-auto" />
                <p className="text-xs text-deep-foreground/70">
                  Visítanos en Medellín: Cra. 43A # 12-45, El Poblado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <TestimonialsSection />

        {/* PREGUNTAS FRECUENTES PREVIEW */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Resolvemos tus Dudas
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Preguntas Frecuentes
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {QUICK_FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`home-faq-${idx}`}
                  className="border border-border/70 rounded-2xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/faq">
                  <HelpCircle className="h-4 w-4" />
                  <span>Ver todas las preguntas frecuentes</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <NewsletterSection />

        {/* FINAL WHATSAPP BANNER */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <MessageCircle className="h-4 w-4" />
                  Atención Inmediata
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  ¿Tienes dudas sobre qué urna o peces elegir?
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg">
                  Chatea directamente con nuestros especialistas. Te asesoramos sin costo en minutos.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold shrink-0"
              >
                <a
                  href="https://wa.me/573001234567?text=Hola%2C%20quisiera%20asesor%C3%ADa%20para%20mi%20acuario"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
