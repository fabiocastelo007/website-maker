import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Check, Printer, Shirt, Car, Megaphone, PenTool, Layers, Lightbulb, Flag, Building2, Sparkles, Maximize2, X, Menu, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSiteContent, type PortfolioItem } from "@/lib/site-content";
import { useTranslatedContent, useT } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D.Tiba Gráfica — Impressão e Comunicação Visual em Luanda" },
      { name: "description", content: "Conheça os serviços e trabalhos da D.Tiba Gráfica em impressão, identidade visual, stands, viaturas e comunicação em Luanda." },
      { property: "og:title", content: "D.Tiba Gráfica — Soluções gráficas completas" },
      { property: "og:description", content: "Portfólio de impressão, identidade visual, stands, viaturas e comunicação visual em Luanda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const ICONS: Record<string, LucideIcon> = {
  PenTool, Layers, Printer, Shirt, Car, Megaphone, Lightbulb, Building2, Flag, Sparkles, Phone, Mail,
};

function PortfolioShowcase({
  category,
  items,
  onOpen,
}: {
  category: string;
  items: PortfolioItem[];
  onOpen: (item: PortfolioItem) => void;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    if (active >= items.length) setActive(0);
  }, [active, items.length]);

  const current = items[active];
  if (!current) return null;

  const move = (direction: number) => {
    setActive((currentIndex) => (currentIndex + direction + items.length) % items.length);
  };

  return (
    <article className="border-t border-primary-foreground/15 pt-7">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase text-accent">
            {String(items.length).padStart(2, "0")} trabalhos
          </span>
          <h2 className="text-2xl font-bold uppercase md:text-3xl">{category}</h2>
        </div>
        {items.length > 1 && (
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => move(-1)}
              aria-label="Imagem anterior"
              className="rounded-full border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => move(1)}
              aria-label="Próxima imagem"
              className="rounded-full border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.7fr)]">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onOpen(current)}
          className="group relative h-auto min-h-0 overflow-hidden rounded-lg p-0 hover:bg-transparent"
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-secondary md:aspect-[16/9]">
            <img
              key={current.src}
              src={current.src}
              alt={current.label}
              className="h-full w-full animate-fade-in object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-secondary/95 to-transparent p-5 pt-16 text-left md:p-7">
            <div className="min-w-0">
              <span className="block text-xs font-semibold uppercase text-accent">D.Tiba Gráfica</span>
              <span className="mt-1 block whitespace-normal text-lg font-bold text-primary-foreground md:text-2xl">{current.label}</span>
            </div>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant">
              <Maximize2 className="size-5" />
            </span>
          </div>
        </Button>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {items.slice(0, 3).map((item, index) => (
            <Button
              key={`${item.src}-${index}`}
              type="button"
              variant="ghost"
              onClick={() => setActive(index)}
              aria-label={`Ver ${item.label}`}
              className={`relative h-auto min-h-0 overflow-hidden rounded-md border p-0 hover:bg-transparent ${
                active === index ? "border-accent" : "border-primary-foreground/15 opacity-65 hover:opacity-100"
              }`}
            >
              <div className="aspect-[4/3] w-full lg:aspect-[16/5]">
                <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
              </div>
              <span className="absolute inset-x-0 bottom-0 truncate bg-secondary/80 px-3 py-2 text-left text-xs font-semibold text-primary-foreground">
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center gap-3" aria-label="Progresso da galeria">
          <span className="text-xs font-semibold tabular-nums text-primary-foreground/60">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-primary-foreground/15">
            {items.map((_, index) => (
              <span
                key={index}
                className={`h-full flex-1 transition-colors duration-300 ${index === active ? "bg-accent" : "bg-transparent"}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold tabular-nums text-primary-foreground/60">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </article>
  );
}

function Index() {
  const raw = useSiteContent();
  const { content: c, isTranslating } = useTranslatedContent(raw);
  const t = useT();
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const grouped = (() => {
    const cats = c.portfolio.categories ?? [];
    const buckets = cats.map((cat) => ({
      cat,
      items: c.portfolio.items.filter((p) => p.categoryId === cat.id),
    }));
    const orphans = c.portfolio.items.filter(
      (p) => !p.categoryId || !cats.some((cat) => cat.id === p.categoryId),
    );
    if (orphans.length) {
      buckets.push({ cat: { id: "__other__", name: "Outros" }, items: orphans });
    }
    return buckets.filter((b) => b.items.length > 0);
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <a href="#top" className="flex items-center shrink-0">
            <img src={c.brand.logo} alt="D.Tiba Gráfica" className="h-9 sm:h-10 w-auto object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">{t("navAbout")}</a>
            <a href="#servicos" className="hover:text-primary transition-colors">{t("navServices")}</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">{t("navPortfolio")}</a>
            <a href="#contacto" className="hover:text-primary transition-colors">{t("navContact")}</a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <a href={`tel:${c.contact.phone}`} className="inline-flex">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-3">
                <Phone className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">{c.contact.phoneDisplay}</span>
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1 text-sm font-medium">
              <a href="#sobre" onClick={() => setMenuOpen(false)} className="py-2 hover:text-primary transition-colors">{t("navAbout")}</a>
              <a href="#servicos" onClick={() => setMenuOpen(false)} className="py-2 hover:text-primary transition-colors">{t("navServices")}</a>
              <a href="#portfolio" onClick={() => setMenuOpen(false)} className="py-2 hover:text-primary transition-colors">{t("navPortfolio")}</a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="py-2 hover:text-primary transition-colors">{t("navContact")}</a>
            </div>
          </nav>
        )}
        {isTranslating && (
          <div className="text-center text-xs py-1 bg-primary/10 text-primary">
            {t("translating")}
          </div>
        )}
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
          <div className="relative overflow-hidden marquee-mask">
            <div className="flex w-max marquee-track gap-6 py-2">
              {[...c.logos.items, ...c.logos.items, ...c.logos.items, ...c.logos.items].map((l, i) => (
                <div key={i} className="h-28 w-44 md:h-36 md:w-56 shrink-0 rounded-2xl bg-card border border-border p-5 flex items-center justify-center">
                  <img src={l} alt={`Logo cliente ${(i % c.logos.items.length) + 1}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-gradient-dark text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">{c.portfolio.eyebrow}</span>
            <h1 className="text-6xl md:text-8xl font-extrabold mt-4 leading-[0.95] tracking-tight">
              {c.portfolio.title}
            </h1>
          </div>

          <div className="space-y-20">
            {grouped.map(({ cat, items }) => (
              <PortfolioShowcase
                key={cat.id}
                category={cat.name}
                items={items}
                onOpen={(item) => setLightbox({ src: item.src, label: item.label })}
              />
            ))}
          </div>
        </div>

        <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white"
              aria-label={t("close")}
            >
              <X className="w-5 h-5" />
            </button>
            {lightbox && (
              <div className="flex flex-col">
                <img src={lightbox.src} alt={lightbox.label} className="w-full max-h-[85vh] object-contain bg-black" />
                <div className="p-4 text-center text-white text-sm font-medium">{lightbox.label}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
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
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("labelCommercial")}</div>
                      <div className="font-bold text-lg">{c.contact.phoneDisplay}</div>
                    </div>
                  </a>
                  <a href={`mailto:${c.contact.email}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("labelEmail")}</div>
                      <div className="font-semibold break-all">{c.contact.email}</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("labelAddress")}</div>
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
