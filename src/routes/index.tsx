import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ArrowRight, Check, Printer, Shirt, Car, Megaphone, PenTool, Layers, Lightbulb, Flag, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/logo.jpg";
import aboutImg from "@/assets/about.jpg";
import logo1 from "@/assets/logo-1.jpg";
import logo2 from "@/assets/logo-2.jpg";
import logo3 from "@/assets/logo-3.jpg";
import logo4 from "@/assets/logo-4.jpg";
import logo5 from "@/assets/logo-5.jpg";
import logo6 from "@/assets/logo-6.jpg";
import id1 from "@/assets/identity-1.jpg";
import id2 from "@/assets/identity-2.jpg";
import id3 from "@/assets/identity-3.jpg";
import printSmall from "@/assets/print-small.jpg";
import textile from "@/assets/textile.jpg";
import vehicle1 from "@/assets/vehicle-1.jpg";
import vehicle2 from "@/assets/vehicle-2.jpg";
import printLarge from "@/assets/print-large.jpg";
import logo3d from "@/assets/logo-3d.jpg";
import stand from "@/assets/stand.jpg";
import outdoor from "@/assets/outdoor.jpg";
import flag from "@/assets/flag.jpg";
import luminous from "@/assets/luminous.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { icon: PenTool, title: "Criação de Logotipos", desc: "Identidade de marca única e memorável." },
  { icon: Layers, title: "Identidade Visual", desc: "Cartões, carimbos, uniformes e papelaria corporativa." },
  { icon: Printer, title: "Impressão Pequenos Formatos", desc: "Cartazes, catálogos, revistas, convites e mais." },
  { icon: Shirt, title: "Impressão Têxtil", desc: "T-shirts, polos, uniformes, bonés e sacolas." },
  { icon: Car, title: "Decoração de Viaturas", desc: "Outdoor móvel para potenciar a sua marca." },
  { icon: Megaphone, title: "Impressão Grandes Formatos", desc: "Vinis, lonas, outdoors e placas em PVC." },
  { icon: Lightbulb, title: "Logo 3D & Letras Monobloco", desc: "Letras caixa e logos tridimensionais." },
  { icon: Building2, title: "Stands & Eventos", desc: "Fabricação, montagem e decoração de stands." },
  { icon: Flag, title: "Bandeiras & Painéis Luminosos", desc: "Sinalização luminosa para destaque dia e noite." },
];

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];
const portfolio = [
  { src: id1, label: "Outdoor Auto Hotait" },
  { src: vehicle1, label: "Decoração de Viaturas" },
  { src: stand, label: "Stand Fenix Farma" },
  { src: outdoor, label: "Outdoor Original Brands" },
  { src: textile, label: "Impressão Têxtil" },
  { src: luminous, label: "Painel Luminoso" },
  { src: flag, label: "Bandeiras Equity" },
  { src: logo3d, label: "Letras 3D — Le Beirut" },
  { src: vehicle2, label: "Viatura Elza Trans" },
  { src: id2, label: "Cartões de Visita" },
  { src: id3, label: "Uniformes Corporativos" },
  { src: printLarge, label: "Banner Stand" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center">
            <img src={logoImg} alt="D.Tiba Gráfica" className="h-10 w-10 object-contain rounded" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfólio</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
          </nav>
          <a href="tel:+244952272121">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              <Phone className="w-4 h-4 mr-1" /> +244 952 272 121
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
              Soluções Gráficas Completas em Luanda
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.95] mb-6">
              Damos cor<br />à sua <span className="italic">marca.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 leading-relaxed">
              Da criação do logotipo ao outdoor luminoso. A D.Tiba é o seu parceiro
              gráfico de confiança — qualidade, agilidade e respeito em cada projeto.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold">
                  Ver portfólio <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a href="#contacto">
                <Button size="lg" variant="outline" className="rounded-full border-white/40 text-primary-foreground hover:bg-white/10 bg-transparent">
                  Pedir orçamento
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5]">
              <img src={heroImg} alt="Cores vibrantes da D.Tiba" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-5 shadow-card max-w-[220px]">
              <div className="text-3xl font-extrabold text-gradient">+100</div>
              <div className="text-sm text-muted-foreground">marcas confiam na nossa qualidade gráfica</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-dark p-12 flex items-center justify-center shadow-card">
              <img src={aboutImg} alt="Identidade D.Tiba" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">Quem somos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">Solidez, competência e <span className="text-gradient">criatividade</span>.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              A D.TIBA é uma empresa prestadora de serviços na área das impressões digitais
              e comercialização de material gráfico. Dispomos de uma equipa altamente qualificada
              e das tecnologias mais recentes para servir o mercado nacional e internacional.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { t: "Visão", d: "Imagem de qualidade, agilidade e respeito em todo território nacional." },
                { t: "Missão", d: "Compreender e atender as necessidades dos nossos clientes." },
                { t: "Valores", d: "Compromisso, atendimento, prazo, preço e qualidade." },
              ].map((v) => (
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
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">O que fazemos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">Serviços que fazem a sua marca <span className="text-gradient">brilhar</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group bg-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS CRIADOS */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-sm font-semibold text-primary tracking-widest uppercase">Criação de logotipos</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Marcas que nasceram aqui</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {logos.map((l, i) => (
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
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">Trabalhos que falam por nós</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((p, i) => (
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Vamos dar vida ao seu próximo projeto?</h2>
                <p className="text-white/90 text-lg mb-6">Fale com a nossa equipa comercial e receba um orçamento personalizado.</p>
                <ul className="space-y-3 text-white/95">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Atendimento rápido e dedicado</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Qualidade premium em cada impressão</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Prazos cumpridos rigorosamente</li>
                </ul>
              </div>
              <div className="bg-background text-foreground rounded-2xl p-8 shadow-card">
                <h3 className="font-bold text-xl mb-5">Linha de Atendimento</h3>
                <div className="space-y-4">
                  <a href="tel:+244952272121" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Comercial</div>
                      <div className="font-bold text-lg">+244 952 272 121</div>
                    </div>
                  </a>
                  <a href="mailto:comercialdtiba@gmail.com" className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Email</div>
                      <div className="font-semibold break-all">comercialdtiba@gmail.com</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-11 h-11 rounded-full bg-gradient-hero flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Endereço</div>
                      <div className="font-semibold">Projecto Nova Vida — Luanda, Angola</div>
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
            <img src={logoImg} alt="D.Tiba" className="h-7 w-7 object-contain rounded" />
            <span className="font-bold">D.TIBA Gráfica</span>
          </div>
          <div className="text-white/60">© {new Date().getFullYear()} D.Tiba Gráfica. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
