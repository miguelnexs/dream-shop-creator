import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, MessageCircle, Truck, ShieldCheck, HeartPulse } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas Frecuentes (FAQ) | AquaVida" },
      {
        name: "description",
        content:
          "Resuelve tus dudas sobre envíos de peces vivos, garantías de llegada, tiempos de entrega y métodos de pago en AquaVida.",
      },
      { property: "og:title", content: "Preguntas Frecuentes | AquaVida" },
      {
        property: "og:description",
        content:
          "Información transparente sobre nuestras garantías de vida, envíos y cuidados de tus peces.",
      },
    ],
  }),
  component: FaqPage,
});

const FAQ_CATEGORIES = [
  {
    name: "Envíos y Seres Vivos",
    icon: Truck,
    questions: [
      {
        q: "¿Cómo garantizan que los peces y plantas lleguen vivos y sanos?",
        a: "Utilizamos empaque profesional con bolsas especiales de doble sellado inyectadas con oxígeno puro grado médico. Las cajas están revestidas con icopor (poliestireno expandido de alta densidad) para amortiguar impactos y mantener temperatura estable. En zonas frías o cálidas extremas, agregamos parches térmicos o geles refrigerantes.",
      },
      {
        q: "¿Qué cubre la Garantía de Llegada Viva (DOA)?",
        a: "Si por cualquier imprevisto del transporte un pez o planta no llega en perfectas condiciones, te reponemos el ejemplar de inmediato o te generamos un crédito a favor. Solo debes enviarnos una fotografía o video nítido del ejemplar dentro de la bolsa sellada dentro de las 2 horas siguientes a la entrega.",
      },
      {
        q: "¿A qué ciudades realizan despachos?",
        a: "Despachamos equipos, urnas, filtros, alimentos y químicos a todo el territorio nacional con cobertura de transportadora. Para peces e invertebrados vivos, hacemos despachos prioritarios express (24 horas) a las principales ciudades y cabeceras municipales para minimizar el tiempo de viaje.",
      },
    ],
  },
  {
    name: "Pagos y Pedidos",
    icon: ShieldCheck,
    questions: [
      {
        q: "¿Cuáles son los métodos de pago disponibles?",
        a: "Aceptamos pagos 100% seguros mediante pasarela de pagos: Tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE (todos los bancos), Nequi, Daviplata y transferencias directas Bancolombia. En nuestra tienda física también aceptamos efectivo.",
      },
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: "Los pedidos de accesorios y alimentos se procesan en 24 horas hábiles y tardan entre 1 a 3 días hábiles en llegar a tu puerta. Los envíos de peces vivos se despachan únicamente de lunes a miércoles para evitar que pasen el fin de semana en bodega de transporte.",
      },
      {
        q: "¿Puedo recoger mi pedido personalmente?",
        a: "¡Por supuesto! Al realizar tu compra puedes seleccionar la opción de retiro en nuestra tienda física en El Poblado, Medellín, sin ningún costo adicional.",
      },
    ],
  },
  {
    name: "Cuidado y Asesoría Biológica",
    icon: HeartPulse,
    questions: [
      {
        q: "¿Puedo comprar peces si mi acuario es completamente nuevo?",
        a: "Recomendamos encarecidamente realizar primero el proceso de 'ciclado biológico' (de 3 a 4 semanas) para que las bacterias beneficiosas colonicen tu filtro antes de meter peces. Si apenas estás iniciando, pregúntanos por nuestro kit de inicio rápido con bacterias vivas para acortar este tiempo de manera segura.",
      },
      {
        q: "¿Ofrecen asesoría para saber si dos especies son compatibles?",
        a: "Sí, es parte de nuestro servicio gratuito. Antes de finalizar tu compra puedes escribirnos a nuestro WhatsApp y nuestros biólogos revisarán tu litraje, filtración y compañeros de acuario actuales para darte luz verde.",
      },
      {
        q: "¿Las plantas acuáticas vienen con caracoles plaga?",
        a: "Nuestras plantas provienen de cultivo in-vitro estéril o pasan por un riguroso baño de desinfección preventiva para garantizar que ingresen a tu urna completamente limpias de caracoles no deseados y esporas de algas.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="surface-deep py-20 text-deep-foreground text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-reef">
              <HelpCircle className="h-4 w-4" />
              Centro de Ayuda
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Preguntas Frecuentes
            </h1>
            <p className="text-deep-foreground/80 max-w-2xl mx-auto text-base">
              Todo lo que necesitas saber sobre envíos con empaque oxigenado, políticas de
              garantía, formas de pago y cuidado biológico.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-5 space-y-14">
            {FAQ_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border/70 pb-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {category.questions.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${category.name}-${idx}`}
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
                </div>
              );
            })}
          </div>
        </section>

        {/* Still have questions banner */}
        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-5">
            <div className="rounded-3xl border border-border/80 bg-muted/40 p-8 sm:p-10 text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">¿Tienes alguna pregunta que no está aquí?</h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Escríbenos directamente. Uno de nuestros biólogos y acuaristas responderá todas tus
                inquietudes en pocos minutos.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <a
                    href="https://wa.me/573001234567?text=Hola%2C%20tengo%20una%20pregunta%20espec%C3%ADfica%20sobre%20AquaVida"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Preguntar por WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contacto">Formulario de Contacto</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
