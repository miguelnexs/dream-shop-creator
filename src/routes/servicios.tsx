import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench,
  Sparkles,
  Layers,
  HeartPulse,
  CalendarCheck,
  Check,
  MessageCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios y Mantenimiento | AquaVida" },
      {
        name: "description",
        content:
          "Servicios profesionales de mantenimiento de acuarios a domicilio, diseño de aquascaping a medida, análisis de agua y asesoría biológica.",
      },
      { property: "og:title", content: "Servicios y Mantenimiento | AquaVida" },
      {
        property: "og:description",
        content:
          "Mantenimiento, diseño a medida y asesoría técnica para que disfrutes de tu acuario sin preocupaciones.",
      },
    ],
  }),
  component: ServiciosPage,
});

const SERVICES = [
  {
    id: "mantenimiento",
    title: "Mantenimiento a Domicilio y Empresas",
    tag: "Más solicitado",
    description:
      "Nos encargamos de que tu acuario luzca siempre cristalino, con agua saludable y peces llenos de vitalidad sin que tengas que ensuciarte las manos.",
    icon: Wrench,
    features: [
      "Cambio de agua declorada y atemperada",
      "Sifonado profundo del sustrato y remoción de desechos",
      "Limpieza y acondicionamiento del sistema de filtración",
      "Poda estética de plantas y control biológico de algas",
      "Test digital de parámetros: pH, GH, KH, Amonio, Nitritos y Nitratos",
    ],
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: "aquascaping",
    title: "Diseño e Instalación de Acuarios a Medida",
    tag: "Premium",
    description:
      "Transformamos cualquier espacio en una obra de arte viva. Creamos montajes personalizados según la estética de tu hogar u oficina.",
    icon: Layers,
    features: [
      "Urnas en vidrio extra-claro (Óptico) sin rebordes",
      "Hardscape exclusivo: maderas curadas (Driftwood) y rocas naturales (Seiryu, Dragón)",
      "Sistemas de iluminación LED espectral de alto rendimiento",
      "Inyección de CO2 presurizado con difusores cerámicos",
      "Plan de fertilización líquida y maduración guiada",
    ],
    badgeColor: "bg-accent text-accent-foreground",
  },
  {
    id: "biologia",
    title: "Diagnóstico Biológico y Salud de Peces",
    tag: "Especializado",
    description:
      "¿Tus peces actúan extraño o notas agua turbia? Nuestro equipo biológico te ayuda a resolver problemas antes de que sea tarde.",
    icon: HeartPulse,
    features: [
      "Identificación de patógenos (Ich, hongos, bacterias)",
      "Tratamientos seguros para invertebrados y plantas",
      "Análisis microscópico y compatibilidad de especies",
      "Guía de aclimatación para nuevos ejemplares",
      "Ajuste y estabilización de parámetros químicos",
    ],
    badgeColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "hospedaje",
    title: "Cuidado y Visitas en Vacaciones",
    tag: "Tranquilidad",
    description:
      "Viaja con total calma. Realizamos visitas programadas a tu hogar para alimentar a tus ejemplares y verificar el funcionamiento de los equipos.",
    icon: CalendarCheck,
    features: [
      "Dosificación exacta de alimento vivo o seco",
      "Comprobación de niveles de temperatura y filtración",
      "Reposición de agua evaporada (ósmosis inversa)",
      "Reporte con fotos y videos a tu WhatsApp en cada visita",
      "Respuesta a emergencias 24/7",
    ],
    badgeColor: "bg-secondary text-secondary-foreground",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Contáctanos o Solicita Cotización",
    text: "Escríbenos por WhatsApp contándonos las dimensiones de tu urna o el proyecto que tienes en mente.",
  },
  {
    step: "02",
    title: "Evaluación & Plan a Medida",
    text: "Te presentamos una propuesta clara con el cronograma, insumos necesarios y costo transparente.",
  },
  {
    step: "03",
    title: "Visita del Especialista",
    text: "Uno de nuestros técnicos acude puntualmente con todo el equipo profesional y productos bio-seguros.",
  },
  {
    step: "04",
    title: "Disfruta de tu Ecosistema",
    text: "Recibes el informe de parámetros y recomendaciones para mantener tu acuario en su mejor estado.",
  },
];

function ServiciosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="surface-deep py-20 lg:py-24 text-deep-foreground text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-reef">
              <Sparkles className="h-4 w-4" />
              Soporte Acuarístico Integral
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-[1.1]">
              Nosotros cuidamos de tu acuario. Tú solo dedícate a disfrutarlo.
            </h1>
            <p className="text-base sm:text-lg text-deep-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Mantenimiento experto a domicilio, diseño de aquascaping de concurso y diagnósticos
              precisos para mantener a tus peces y plantas en plenitud.
            </p>
            <div className="pt-3">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold shadow-lg"
              >
                <a
                  href="https://wa.me/573001234567?text=Hola%2C%20quiero%20cotizar%20un%20servicio%20de%20mantenimiento%20o%20dise%C3%B1o%20de%20acuario"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Cotizar por WhatsApp Ahora
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Nuestras Soluciones
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Servicios diseñados para cada necesidad
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {SERVICES.map((srv) => {
                const Icon = srv.icon;
                return (
                  <Card
                    key={srv.id}
                    className="border border-border/80 bg-card hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary" className="font-semibold text-xs">
                          {srv.tag}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{srv.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {srv.description}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2 border-t border-border/50">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          ¿Qué incluye este servicio?
                        </p>
                        {srv.features.map((item) => (
                          <div key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <div className="p-8 pt-0 mt-2">
                      <Button asChild className="w-full gap-2">
                        <a
                          href={`https://wa.me/573001234567?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(srv.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Solicitar cotización de {srv.title}</span>
                        </a>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-muted/30 border-y border-border/60">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Proceso Simple
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                ¿Cómo funciona nuestro servicio?
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm relative overflow-hidden space-y-3"
                >
                  <span className="font-display text-4xl font-extrabold text-primary/20">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-base text-foreground">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits bar */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-5">
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="h-5 w-5" />
                  Garantía AquaVida Certificada
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Personal calificado, puntual y con insumos de primera línea
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg">
                  Nuestros técnicos siguen protocolos de bioseguridad para evitar transmisión de
                  parásitos o contaminación cruzada en tus acuarios.
                </p>
              </div>

              <Button asChild size="lg" className="shrink-0 gap-2">
                <Link to="/contacto">
                  <span>Agendar Consulta</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
