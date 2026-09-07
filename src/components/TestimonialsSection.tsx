import { Star, CheckCircle2, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  comment: string;
  setup: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Mario Restrepo",
    role: "Acuarista aficionado",
    initials: "CR",
    rating: 5,
    comment:
      "Llegaron mis plantas y peces en perfecto estado a Medellín. El empaque térmico con oxígeno es de primer nivel. Llevo 3 semanas con el acuario ciclado y todo marcha impecable.",
    setup: "Acuario Plantado 120L • Paisajismo Iwagumi",
  },
  {
    name: "Valentina Gómez",
    role: "Cliente verificada",
    initials: "VG",
    rating: 5,
    comment:
      "La asesoría por WhatsApp fue lo mejor. No sabía qué filtro elegir para no estresar a mis Bettas y me explicaron todo con paciencia. ¡Se nota la pasión y conocimiento que tienen!",
    setup: "Nano Acuario Betta 30L",
  },
  {
    name: "Andrés Felipe Morales",
    role: "Diseñador & Acuarista",
    initials: "AM",
    rating: 5,
    comment:
      "Excelente selección de rocas, sustratos y troncos curados. Es muy difícil encontrar tiendas que realmente entiendan de Aquascaping profesional en el país. 100% recomendados.",
    setup: "Aquascape Holandés 200L",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            Comunidad y Confianza
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Lo que dicen quienes confían en AquaVida
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Más de 5,000 acuarios instalados y clientes satisfechos en todo el país avalan nuestra
            dedicación y calidad.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="relative overflow-hidden border border-border/70 bg-card hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </CardContent>

              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-primary/20 bg-primary/10 text-primary font-semibold">
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-sm truncate">{t.name}</p>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{t.setup}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
