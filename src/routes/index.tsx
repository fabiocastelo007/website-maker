import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ArrowRight, Check, Printer, Shirt, Car, Megaphone, PenTool, Layers, Lightbulb, Flag, Building2, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  component: Index,
});

const ICONS: Record<string, LucideIcon> = {
  PenTool, Layers, Printer, Shirt, Car, Megaphone, Lightbulb, Building2, Flag, Sparkles, Phone, Mail,
};

function Index() {
  const c = useSiteContent();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center">
            <img src={c.brand.logo} alt="D.Tiba Gráfica" className="h-10 w-auto object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfólio</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
          </nav>
          <a href={`tel:${c.contact.phone}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              <Phone className="w-4 h-4 mr-1" /> {c.contact.phoneDisplay}
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container mx-auto px-6 relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold tracking-wider uppercase mb-6">
              {c.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.95] mb-6">
              {c.hero.titleLine1}<br />{c.hero.titleLine2} <span className="italic">{c.hero.titleEmphasis}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 leading-relaxed">
              {c.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold">
                  {c.hero.ctaPrimary} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a href="#contacto">
                <Button size="lg" variant="outline" className="rounded-full border-white/40 text-primary-foreground hover:bg-white/10 bg-transparent">
                  {c.hero.ctaSecondary}
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5]">
              <img src={c.hero.image} alt="Cores vibrantes da D.Tiba" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-5 shadow-card max-w-[220px]">
              <div className="text-3xl font-extrabold text-gradient">{c.hero.statNumber}</div>
              <div className="text-sm text-muted-foreground">{c.hero.statLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-dark p-12 flex items-center justify-center shadow-card">
              <img src={c.about.image} alt="Identidade D.Tiba" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">{c.about.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">{c.about.title} <span className="text-gradient">{c.about.titleEmphasis}</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{c.about.text}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {c.about.values.map((v) => (
                <div key={v.t} className="rounded-2xl p-5 bg-muted border border-border">
                  <div className="font-bold text-primary mb-1">{v.t}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">{c.services.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">{c.services.title} <span className="text-gradient">{c.services.titleEmphasis}</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.services.items.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Sparkles;
              return (
                <div key={i} className="group bg-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOGOS CRIADOS */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-sm font-semibold text-primary tracking-widest uppercase">{c.logos.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">{c.logos.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {c.logos.items.map((l, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-card border border-border p-4 flex items-center justify-center hover:shadow-card hover:border-primary/40 transition-all">
                <img src={l} alt={`Logo cliente ${i + 1}`} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-gradient-dark text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">{c.portfolio.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">{c.portfolio.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.portfolio.items.map((p, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <img src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-sm font-semibold tracking-wide">{p.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACTO */}
      <section id="contacto" className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center text-primary-foreground">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{c.contact.title}</h2>
                <p className="text-white/90 text-lg mb-6">{c.contact.subtitle}</p>
                <ul className="space-y-3 text-white/95">
                  {c.contact.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-3"><Check className="w-5 h-5" /> {b}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-background text-foreground rounded-2xl p-8 shadow-card">
                <h3 className="font-bold text-xl mb-5">{c.contact.boxTitle}</h3>
                <div className="space-y-4">
                  <a href={`tel:${c.contact.phone}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Comercial</div>
                      <div className="font-bold text-lg">{c.contact.phoneDisplay}</div>
                    </div>
                  </a>
                  <a href={`mailto:${c.contact.email}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Email</div>
                      <div className="font-semibold break-all">{c.contact.email}</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Endereço</div>
                      <div className="font-semibold">{c.contact.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary text-secondary-foreground py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <img src={c.brand.logo} alt="D.Tiba Gráfica" className="h-8 w-auto object-contain" />
          </div>
          <div className="text-white/60">{c.footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
