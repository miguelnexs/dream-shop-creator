import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y Tienda Física | AquaVida" },
      {
        name: "description",
        content:
          "Visítanos en nuestra tienda física en Medellín o ponte en contacto con nuestro equipo de acuaristas por WhatsApp, teléfono o correo.",
      },
      { property: "og:title", content: "Contacto y Tienda Física | AquaVida" },
      {
        property: "og:description",
        content:
          "Estamos aquí para resolver tus inquietudes y ayudarte a diseñar el acuario ideal.",
      },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "consulta_general",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success("¡Mensaje enviado con éxito!", {
        description: "Uno de nuestros especialistas te responderá en menos de 2 horas hábiles.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="surface-deep py-20 text-deep-foreground text-center">
          <div className="mx-auto max-w-4xl px-5 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-reef">
              <Sparkles className="h-4 w-4" />
              Estamos a tu disposición
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Ponte en Contacto con Nosotros
            </h1>
            <p className="text-deep-foreground/80 max-w-2xl mx-auto text-base">
              ¿Deseas una cotización para un acuario a medida, asesoría sobre compatibilidad de
              peces o visitar nuestra tienda física? ¡Escríbenos!
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Left Form */}
              <div className="lg:col-span-7">
                <Card className="border border-border/80 bg-card shadow-card">
                  <CardContent className="p-8 sm:p-10">
                    <h2 className="text-2xl font-bold text-foreground">Envíanos un Mensaje</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Diligencia el formulario y nuestro equipo técnico se pondrá en contacto contigo.
                    </p>

                    {isSent ? (
                      <div className="mt-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center space-y-4">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">¡Recibimos tu solicitud!</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Gracias por escribirnos, <strong>{form.nombre}</strong>. Hemos recibido tu
                          mensaje y pronto nos comunicaremos a <strong>{form.email}</strong> o vía
                          WhatsApp.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSent(false);
                            setForm({
                              nombre: "",
                              email: "",
                              telefono: "",
                              asunto: "consulta_general",
                              mensaje: "",
                            });
                          }}
                        >
                          Enviar otro mensaje
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Tu Nombre Completo *</Label>
                            <Input
                              id="nombre"
                              required
                              placeholder="Ej: Andrés Gómez"
                              value={form.nombre}
                              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico *</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              placeholder="andres@ejemplo.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="telefono">WhatsApp / Teléfono</Label>
                            <Input
                              id="telefono"
                              placeholder="+57 300 000 0000"
                              value={form.telefono}
                              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="asunto">Motivo de Contacto</Label>
                            <select
                              id="asunto"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value={form.asunto}
                              onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                            >
                              <option value="consulta_general">Consulta general</option>
                              <option value="mantenimiento">Mantenimiento de acuarios</option>
                              <option value="diseno_medida">Acuario a medida / Aquascaping</option>
                              <option value="envio_seres_vivos">Estado de un pedido</option>
                              <option value="asesoria_biologica">Asesoría biológica gratuita</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mensaje">¿En qué te podemos ayudar? *</Label>
                          <Textarea
                            id="mensaje"
                            required
                            rows={5}
                            placeholder="Cuéntanos las medidas de tu acuario, especies que tienes o dudas que deseas resolver..."
                            value={form.mensaje}
                            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                          />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto gap-2">
                          <Send className="h-4 w-4" />
                          <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje"}</span>
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Details */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border border-border/80 bg-card">
                  <CardContent className="p-6 space-y-5">
                    <h3 className="font-bold text-lg text-foreground">Canales Directos</h3>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3.5">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
                          <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">WhatsApp Directo</p>
                          <p className="text-xs text-muted-foreground">Respuesta rápida en minutos</p>
                          <a
                            href="https://wa.me/573001234567?text=Hola%2C%20quisiera%20asesor%C3%ADa%20personalizada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-emerald-600 hover:underline mt-1 inline-block"
                          >
                            Chatear con un asesor →
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Tienda Física</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Cra. 43A # 12-45, El Poblado
                            <br />
                            Medellín, Antioquia, Colombia
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Línea Telefónica</p>
                          <p className="text-xs text-muted-foreground">+57 (300) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Correo Electrónico</p>
                          <p className="text-xs text-muted-foreground">contacto@aquavida.co</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Horario de Atención</p>
                          <p className="text-xs text-muted-foreground">
                            Lunes a Sábado: 9:00 AM – 7:00 PM
                            <br />
                            Domingos y Festivos: 10:00 AM – 4:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Map visual box */}
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-6 space-y-3">
                  <h4 className="font-semibold text-sm text-foreground">¿Cómo llegar a la tienda?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Contamos con parqueadero privado para clientes y estamos a solo 5 minutos de la
                    estación Poblado del Metro. Ven a ver más de 40 acuarios en exhibición activa.
                  </p>
                  <Button asChild variant="secondary" size="sm" className="w-full text-xs">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1.5"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Ver en Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
