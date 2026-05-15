import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
export type PortfolioItem = { src: string; label: string; categoryId?: string };
export type PortfolioCategory = { id: string; name: string };
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
  portfolio: {
    eyebrow: string;
    title: string;
    categories: PortfolioCategory[];
    items: PortfolioItem[];
  };
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
    categories: [
      { id: "outdoor", name: "Outdoor & Sinalética" },
      { id: "vehicle", name: "Decoração de Viaturas" },
      { id: "stand", name: "Stands & Eventos" },
      { id: "textile", name: "Impressão Têxtil" },
      { id: "identity", name: "Identidade & Papelaria" },
      { id: "3d", name: "Letras 3D & Luminosos" },
    ],
    items: [
      { src: id1, label: "Outdoor Auto Hotait", categoryId: "outdoor" },
      { src: outdoor, label: "Outdoor Original Brands", categoryId: "outdoor" },
      { src: flag, label: "Bandeiras Equity", categoryId: "outdoor" },
      { src: luminous, label: "Painel Luminoso", categoryId: "3d" },
      { src: logo3d, label: "Letras 3D — Le Beirut", categoryId: "3d" },
      { src: vehicle1, label: "Decoração de Viaturas", categoryId: "vehicle" },
      { src: vehicle2, label: "Viatura Elza Trans", categoryId: "vehicle" },
      { src: stand, label: "Stand Fenix Farma", categoryId: "stand" },
      { src: printLarge, label: "Banner Stand", categoryId: "stand" },
      { src: textile, label: "Impressão Têxtil", categoryId: "textile" },
      { src: id2, label: "Cartões de Visita", categoryId: "identity" },
      { src: id3, label: "Uniformes Corporativos", categoryId: "identity" },
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
};

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

const QUERY_KEY = ["site-settings"] as const;

async function fetchSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("Falha ao carregar conteúdo", error);
    return defaultContent;
  }
  return deepMerge(defaultContent, (data?.data as any) ?? {});
}

export function useSiteContent(): SiteContent {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchSiteContent,
    staleTime: 60_000,
    placeholderData: defaultContent,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => {
          qc.invalidateQueries({ queryKey: QUERY_KEY });
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [qc]);

  return data ?? defaultContent;
}

export function useSiteContentLoaded(): boolean {
  const { isSuccess, isError, fetchStatus } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchSiteContent,
    staleTime: 60_000,
  });
  // unblock UI as soon as the first fetch settles (success or error)
  return isSuccess || isError || fetchStatus === "idle";
}

export async function saveSiteContent(next: SiteContent) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, data: next as unknown as any });
  if (error) throw new Error(error.message);
}

export async function resetSiteContent() {
  await saveSiteContent(defaultContent);
}