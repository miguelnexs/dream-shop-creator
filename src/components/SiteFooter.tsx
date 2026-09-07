import { Link } from "@tanstack/react-router";
import { Fish, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="surface-deep mt-24 border-t border-border/20 text-deep-foreground">
      {/* Upper footer */}
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-reef">
                <Fish className="h-5 w-5" />
              </span>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight">AquaVida</span>
                <p className="text-[11px] uppercase tracking-wider text-deep-foreground/70">
                  Pasión por el Acuarismo
                </p>
              </div>
            </Link>
            <p className="text-sm text-deep-foreground/80 leading-relaxed max-w-sm">
              Somos especialistas en acuarismo natural, peces seleccionados, plantas vivas y equipos
              de filtración de alta gama. Envíos climatizados y seguros a todo el país.
            </p>
            <div className="flex items-center gap-2 text-xs text-reef">
              <ShieldCheck className="h-4 w-4" />
              <span>Garantía de llegada viva y soporte biológico permanente.</span>
            </div>
          </div>

          {/* Col 2: Enlaces Rápidos */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-deep-foreground">
              Explorar
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-deep-foreground/75">
              <li>
                <Link to="/" className="transition-colors hover:text-reef">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="/#catalogo" className="transition-colors hover:text-reef">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <Link to="/nosotros" className="transition-colors hover:text-reef">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-reef">
                  Servicios y Mantenimiento
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-reef">
                  Guías & Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-reef">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Servicios */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-deep-foreground">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-deep-foreground/75">
              <li>
                <Link to="/servicios" className="transition-colors hover:text-reef">
                  Instalación a Medida
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-reef">
                  Limpieza y Mantenimiento
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-reef">
                  Aquascaping Profesional
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="transition-colors hover:text-reef">
                  Test de Parámetros de Agua
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="transition-colors hover:text-reef">
                  Asesoría Personalizada
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-deep-foreground">
              Atención al Cliente
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-deep-foreground/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-reef mt-0.5" />
                <span>Cra. 43A # 12-45, Poblado, Medellín, Colombia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-reef" />
                <span>+57 (300) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-reef" />
                <span>contacto@aquavida.co</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-reef mt-0.5" />
                <span>Lun - Sáb: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-deep-foreground/60 sm:flex-row">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} AquaVida. Creado con{" "}
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500 inline" /> para los amantes de la
            vida acuática.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/faq" className="hover:text-deep-foreground transition-colors">
              Políticas de Envío
            </Link>
            <span>•</span>
            <Link to="/contacto" className="hover:text-deep-foreground transition-colors">
              Términos del Servicio
            </Link>
            <span>•</span>
            <Link to="/contacto" className="hover:text-deep-foreground transition-colors">
              Garantía de Vivos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
