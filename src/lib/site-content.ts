import { useSyncExternalStore } from "react";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/logo.png";
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

export type ServiceItem = { icon: string; title: string; desc: string };
export type PortfolioItem = { src: string; label: string };
export type ValueItem = { t: string; d: string };

export type SiteContent = {
  brand: { logo: string };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleEmphasis: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    statNumber: string;
    statLabel: string;
  };
  about: {
    image: string;
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    text: string;
    values: ValueItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    items: ServiceItem[];
  };
  logos: { eyebrow: string; title: string; items: string[] };
  portfolio: { eyebrow: string; title: string; items: PortfolioItem[] };
  contact: {
    title: string;
    subtitle: string;
    bullets: string[];
    boxTitle: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
  };
  footer: { copyright: string };
};

export const defaultContent: SiteContent = {
  brand: { logo: logoImg },
  hero: {
    badge: "Soluções Gráficas Completas em Luanda",
    titleLine1: "Damos cor",
    titleLine2: "à sua",
    titleEmphasis: "marca.",
    subtitle:
      "Da criação do logotipo ao outdoor luminoso. A D.Tiba é o seu parceiro gráfico de confiança — qualidade, agilidade e respeito em cada projeto.",
    ctaPrimary: "Ver portfólio",
    ctaSecondary: "Pedir orçamento",
    image: heroImg,
    statNumber: "+100",
    statLabel: "marcas confiam na nossa qualidade gráfica",
  },
  about: {
    image: aboutImg,
    eyebrow: "Quem somos",
    title: "Solidez, competência e",
    titleEmphasis: "criatividade.",
    text: "A D.TIBA é uma empresa prestadora de serviços na área das impressões digitais e comercialização de material gráfico. Dispomos de uma equipa altamente qualificada e das tecnologias mais recentes para servir o mercado nacional e internacional.",
    values: [
      { t: "Visão", d: "Imagem de qualidade, agilidade e respeito em todo território nacional." },
      { t: "Missão", d: "Compreender e atender as necessidades dos nossos clientes." },
      { t: "Valores", d: "Compromisso, atendimento, prazo, preço e qualidade." },
    ],
  },
  services: {
    eyebrow: "O que fazemos",
    title: "Serviços que fazem a sua marca",
    titleEmphasis: "brilhar",
    items: [
      { icon: "PenTool", title: "Criação de Logotipos", desc: "Identidade de marca única e memorável." },
      { icon: "Layers", title: "Identidade Visual", desc: "Cartões, carimbos, uniformes e papelaria corporativa." },
      { icon: "Printer", title: "Impressão Pequenos Formatos", desc: "Cartazes, catálogos, revistas, convites e mais." },
      { icon: "Shirt", title: "Impressão Têxtil", desc: "T-shirts, polos, uniformes, bonés e sacolas." },
      { icon: "Car", title: "Decoração de Viaturas", desc: "Outdoor móvel para potenciar a sua marca." },
      { icon: "Megaphone", title: "Impressão Grandes Formatos", desc: "Vinis, lonas, outdoors e placas em PVC." },
      { icon: "Lightbulb", title: "Logo 3D & Letras Monobloco", desc: "Letras caixa e logos tridimensionais." },
      { icon: "Building2", title: "Stands & Eventos", desc: "Fabricação, montagem e decoração de stands." },
      { icon: "Flag", title: "Bandeiras & Painéis Luminosos", desc: "Sinalização luminosa para destaque dia e noite." },
    ],
  },
  logos: {
    eyebrow: "Criação de logotipos",
    title: "Marcas que nasceram aqui",
    items: [logo1, logo2, logo3, logo4, logo5, logo6],
  },
  portfolio: {
    eyebrow: "Portfólio",
    title: "Trabalhos que falam por nós",
    items: [
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
    ],
  },
  contact: {
    title: "Vamos dar vida ao seu próximo projeto?",
    subtitle: "Fale com a nossa equipa comercial e receba um orçamento personalizado.",
    bullets: [
      "Atendimento rápido e dedicado",
      "Qualidade premium em cada impressão",
      "Prazos cumpridos rigorosamente",
    ],
    boxTitle: "Linha de Atendimento",
    phone: "+244952272121",
    phoneDisplay: "+244 952 272 121",
    email: "comercialdtiba@gmail.com",
    address: "Projecto Nova Vida — Luanda, Angola",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} D.Tiba Gráfica. Todos os direitos reservados.`,
  },
  // unused — keeps printSmall import live in case admin re-adds it
  // @ts-expect-error
  _printSmall: printSmall,
};

const STORAGE_KEY = "dtiba_site_content_v1";

function deepMerge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || Array.isArray(override)) return (override ?? base) as T;
  if (typeof base === "object" && typeof override === "object") {
    const out: any = { ...base };
    for (const k of Object.keys(override)) {
      out[k] = deepMerge((base as any)[k], override[k]);
    }
    return out;
  }
  return (override ?? base) as T;
}

let current: SiteContent = defaultContent;
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) current = deepMerge(defaultContent, JSON.parse(raw));
  } catch {
    /* ignore */
  }
}
load();

function emit() {
  listeners.forEach((l) => l());
}

export function getSiteContent(): SiteContent {
  return current;
}

export function setSiteContent(next: SiteContent) {
  current = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Falha ao salvar conteúdo (provável limite do localStorage)", e);
      throw e;
    }
  }
  emit();
}

export function resetSiteContent() {
  current = defaultContent;
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Sync across tabs
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      load();
      cb();
    }
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

export function useSiteContent(): SiteContent {
  return useSyncExternalStore(subscribe, getSiteContent, () => defaultContent);
}