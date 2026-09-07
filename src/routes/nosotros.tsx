import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  HeartHandshake,
  Award,
  Users,
  Compass,
  Sprout,
  ArrowRight,
  Fish,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre Nosotros | AquaVida Acuarios y Mascotas" },
      {
        name: "description",
        content:
          "Conoce la historia, el equipo y la filosofía detrás de AquaVida. Especialistas en acuarismo natural y bienestar animal.",
      },
      { property: "og:title", content: "Sobre Nosotros | AquaVida" },
      {
        property: "og:description",
        content:
          "Nuestra pasión por el acuarismo responsable y la creación de ecosistemas vivos.",
      },
    ],
  }),
  component: NosotrosPage,
});

const STATS = [
  { value: "+10", label: "Años de experiencia acuarística" },
  { value: "+5,000", label: "Acuarios y biotopos instalados" },
  { value: "99.8%", label: "Tasa de supervivencia en envíos" },
  { value: "+12k", label: "Clientes y aficionados satisfechos" },
];

const VALUES = [
  {
    icon: Sprout,
    title: "Bienestar Animal Primero",
    description:
      "No vendemos especies incompatibles ni fomentamos la sobrepoblación. Cada pez, caracol o planta recibe cuidados óptimos y cuarentena antes de ser entregado.",
  },
  {
    icon: Compass,
    title: "Acuarismo Científico y Real",
    description:
      "Basamos nuestras recomendaciones en parámetros medibles (pH, TDS, dureza, ciclado bacteriano), no en mitos o ventas innecesarias.",
  },
  {
    icon: ShieldCheck,
    title: "Procedencia Ética",
    description:
      "Trabajamos exclusivamente con criaderos certificados y programas de propagación sustentable de plantas in-vitro.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento Continuo",
    description:
      "Tu relación con nosotros no termina con la compra; te acompañamos en cada etapa de maduración de tu urna.",
  },
];

const TEAM = [
  {
    name: "David Restrepo",
    role: "Fundador & Maestro Aquascaper",
    description:
      "Más de 12 años diseñando acuarios de concurso estilo Iwagumi y Holandés. Apasionado por la botánica acuática.",
    avatar: "DR",
  },
  {
    name: "Dra. Sofía Henao",
    role: "Bióloga & Especialista en Ictiología",
    description:
      "Encargada de los protocolos de cuarentena, nutrición balanceada y salud de nuestras especies vivas.",
    avatar: "SH",
  },
  {
    name: "Camilo Torres",
    role: "Jefe de Soporte Técnico & Filtración",
    description:
      "Experto en filtración biológica, inyección de CO2 presurizado y automatización domótica para acuarios.",
    avatar: "CT",
  },
];

function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden surface-deep py-20 lg:py-28">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative mx-auto max-w-5xl px-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-reef">
              <Fish className="h-4 w-4" />
              Nuestra Historia & Esencia
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl text-deep-foreground leading-[1.1]">
              Un trozo de naturaleza viva en el corazón de tu hogar
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-deep-foreground/85 max-w-3xl mx-auto leading-relaxed">
              En AquaVida no solo vendemos peces o urnas de cristal: diseñamos ecosistemas
              equilibrados y enseñamos el arte y la ciencia del acuarismo responsable.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-border/70 bg-card py-10 shadow-sm">
          <div className="mx-auto max-w-6xl px-5 grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  ¿Cómo empezó todo?
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                  De una pasión en un pequeño garaje a la mayor comunidad acuarista
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  AquaVida nació hace una década cuando David, nuestro fundador, descubrió que la
                  mayoría de personas que intentaban tener un acuario fracasaban debido a malos
                  consejos comerciales: peces sobrealimentados, urnas sin ciclar y químicos
                  innecesarios.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Decidimos cambiar las reglas del juego: crear un espacio donde la educación, la
                  biología real y la empatía con los animales fueran el centro de cada decisión. Hoy
                  hacemos envíos seguros de seres vivos a todo el país y asesoramos a miles de
                  hogares y oficinas.
                </p>
                <div className="pt-2">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/contacto">
                      <span>Habla con un especialista</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-border/80 bg-muted/40 p-8 shadow-card space-y-6">
                <h3 className="font-display text-xl font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Nuestra Promesa Inquebrantable
                </h3>
                <ul className="space-y-4 text-sm text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong>Cero maltrato:</strong> Ningún animal es enviado si no cumple con el
                      peso y condición de nado perfecto.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong>Empaque térmico profesional:</strong> Cajas de poliestireno
                      expandido, bolsas dobles con oxígeno puro y parches de calor si el clima lo
                      requiere.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong>Plantas libres de caracoles plaga:</strong> Cultivos in-vitro y
                      desinfección garantizada.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/20 border-t border-border/60">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Nuestros Principios
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Lo que nos mueve cada día
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <Card key={val.title} className="border-border/70 hover:shadow-card transition-all">
                    <CardContent className="p-6 space-y-3">
                      <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-base text-foreground">{val.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {val.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                El Equipo
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Acuaristas, biólogos y apasionados a tu servicio
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">
                Conoce a las personas que seleccionan cada producto y cuidan cada especie en
                AquaVida.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {TEAM.map((member) => (
                <Card
                  key={member.name}
                  className="border-border/70 bg-card hover:shadow-card transition-all p-6 text-center space-y-4"
                >
                  <div className="mx-auto h-20 w-20 rounded-full surface-deep text-deep-foreground flex items-center justify-center font-bold text-2xl shadow-inner">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 surface-deep text-deep-foreground">
          <div className="mx-auto max-w-5xl px-5 text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para armar el acuario de tus sueños?</h2>
            <p className="text-deep-foreground/80 max-w-2xl mx-auto text-sm sm:text-base">
              Visita nuestro catálogo con más de 200 referencias seleccionadas o solicita una
              asesoría personalizada para tu espacio.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="secondary">
                <a href="/#catalogo">Explorar Catálogo</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/contacto">Contáctanos Hoy</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
