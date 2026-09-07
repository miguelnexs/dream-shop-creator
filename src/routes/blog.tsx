import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, Tag, ArrowRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Guías & Blog de Acuarismo | AquaVida" },
      {
        name: "description",
        content:
          "Aprende sobre ciclado de acuarios, compatibilidad de peces, plantas acuáticas de bajos requerimientos y control biológico de algas.",
      },
      { property: "og:title", content: "Guías & Blog de Acuarismo | AquaVida" },
      {
        property: "og:description",
        content:
          "Artículos y tutoriales escritos por biólogos y especialistas en acuarismo natural.",
      },
    ],
  }),
  component: BlogPage,
});

const ARTICLES = [
  {
    id: "ciclado-biologico",
    title: "El Ciclado del Acuario: La Guía Definitiva Paso a Paso",
    category: "Fundamentos",
    readTime: "7 min de lectura",
    date: "15 Ago 2026",
    summary:
      "Aprende cómo madurar el filtro bacteriano de tu urna antes de ingresar peces. Evita el mortal pico de amonio y nitritos con este método seguro.",
    author: "Dra. Sofía Henao",
    highlight: true,
  },
  {
    id: "plantas-low-tech",
    title: "Top 5 Plantas Acuáticas de Bajos Requerimientos (Sin CO2)",
    category: "Aquascaping",
    readTime: "5 min de lectura",
    date: "28 Jul 2026",
    summary:
      "Anubias, Helechos de Java, Bucephalandras, Cryptocorynes y Musgo de Java: las especies más resistentes y hermosas para acuarios sin complicaciones.",
    author: "David Restrepo",
    highlight: false,
  },
  {
    id: "compatibilidad-peces",
    title: "Compatibilidad de Peces Comunitarios: ¿Quién puede vivir con quién?",
    category: "Ictiología",
    readTime: "8 min de lectura",
    date: "10 Jul 2026",
    summary:
      "Tetras, Neones, Corydoras, Otocinclus y Bettas. Conoce los rangos de temperatura, pH y comportamiento para evitar disputas en tu acuario.",
    author: "Dra. Sofía Henao",
    highlight: false,
  },
  {
    id: "control-algas",
    title: "Cómo Eliminar y Controlar las Algas sin Químicos Agresivos",
    category: "Mantenimiento",
    readTime: "6 min de lectura",
    date: "22 Jun 2026",
    summary:
      "Equilibrio entre fotoperiodo, nutrientes y el mejor equipo de limpieza biológico (Caracoles Neritina, Camarones Amano y Otocinclus).",
    author: "Camilo Torres",
    highlight: false,
  },
  {
    id: "guia-alimentacion",
    title: "Nutrición Acuática: Por qué la sobrealimentación es el enemigo #1",
    category: "Cuidados",
    readTime: "4 min de lectura",
    date: "05 Jun 2026",
    summary:
      "Cómo elegir entre escamas, pellets, alimento liofilizado y vivo para potenciar los colores y vitalidad de tus peces sin ensuciar el agua.",
    author: "David Restrepo",
    highlight: false,
  },
];

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="surface-deep py-20 text-deep-foreground text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-reef">
              <BookOpen className="h-4 w-4" />
              Academia AquaVida
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Guías, Consejos y Ciencia Acuática
            </h1>
            <p className="text-deep-foreground/80 max-w-2xl mx-auto text-base">
              Aprende el arte de recrear ríos y lagos en casa con artículos prácticos redactados por
              nuestro equipo de especialistas.
            </p>
          </div>
        </section>

        {/* Blog listing */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <Card
                  key={article.id}
                  className="border border-border/80 bg-card hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="font-semibold text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-snug hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Por {article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0">
                    <Button variant="ghost" size="sm" className="w-full justify-between group">
                      <span>Leer artículo completo</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Need advice CTA */}
        <section className="py-16 bg-muted/30 border-t border-border/60">
          <div className="mx-auto max-w-4xl px-5 text-center space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              ¿Tienes un caso particular?
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              ¿Tus peces tienen síntomas o dudas con el agua?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              No apliques medicamentos a ciegas. Escríbenos y te indicamos el tratamiento exacto
              para salvar a tus ejemplares sin dañar las colonias de bacterias.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/contacto">Consultar con un Biólogo</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
