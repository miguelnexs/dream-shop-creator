import { useState } from "react";
import { Mail, Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }

    setIsSubscribed(true);
    toast.success("¡Bienvenido al Club AquaVida!", {
      description: "Usa el cupón AQUA10 para 10% OFF en tu primer pedido.",
    });
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-3xl surface-deep p-8 shadow-tank sm:p-12">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-reef/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-deep-foreground/10 px-3.5 py-1 text-xs font-semibold text-deep-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-reef" />
              <span>Club Exclusivo AquaVida</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-deep-foreground sm:text-4xl">
              Recibe 10% de descuento en tu primera compra
            </h2>

            <p className="mt-3 text-sm sm:text-base text-deep-foreground/80 leading-relaxed">
              Suscríbete a nuestro boletín semanal. Recibirás guías exclusivas de mantenimiento,
              avisos de nuevas llegadas de peces y plantas raras, y ofertas especiales.
            </p>

            {isSubscribed ? (
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reef text-deep font-bold">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-foreground">
                    ¡Gracias por suscribirte!
                  </p>
                  <p className="text-xs text-deep-foreground/75">
                    Tu código de descuento es:{" "}
                    <span className="font-mono font-bold text-reef">AQUA10</span>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escribe tu correo electrónico..."
                    className="pl-10 h-12 bg-white/95 text-foreground placeholder:text-muted-foreground border-none rounded-xl text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-xl bg-reef text-deep hover:bg-reef/90 font-semibold px-6 shrink-0 transition-transform active:scale-95"
                >
                  <span>Obtener descuento</span>
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </form>
            )}

            <p className="mt-3 text-[11px] text-deep-foreground/60">
              Sin spam. Puedes cancelar tu suscripción con un clic cuando desees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
