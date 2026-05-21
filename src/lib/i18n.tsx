import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { translateBatch } from "./translate.functions";
import type { SiteContent } from "./site-content";

export type LangCode = "pt" | "en" | "fr" | "es" | "ar" | "de" | "it" | "zh";

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية (لبنان)", flag: "🇱🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const RTL_LANGS: LangCode[] = ["ar"];

type LangContextValue = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "site-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("pt");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, dir: RTL_LANGS.includes(lang) ? "rtl" : "ltr" }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

// ---------- UI strings ----------

const UI: Record<string, Record<LangCode, string>> = {
  navAbout:    { pt: "Sobre", en: "About", fr: "À propos", es: "Acerca", ar: "من نحن", de: "Über uns", it: "Chi siamo", zh: "关于" },
  navServices: { pt: "Serviços", en: "Services", fr: "Services", es: "Servicios", ar: "خدماتنا", de: "Leistungen", it: "Servizi", zh: "服务" },
  navPortfolio:{ pt: "Portfólio", en: "Portfolio", fr: "Portfolio", es: "Portafolio", ar: "أعمالنا", de: "Portfolio", it: "Portfolio", zh: "作品集" },
  navContact:  { pt: "Contacto", en: "Contact", fr: "Contact", es: "Contacto", ar: "اتصل بنا", de: "Kontakt", it: "Contatti", zh: "联系" },
  labelCommercial: { pt: "Comercial", en: "Sales", fr: "Commercial", es: "Comercial", ar: "المبيعات", de: "Vertrieb", it: "Commerciale", zh: "销售" },
  labelEmail:  { pt: "Email", en: "Email", fr: "E-mail", es: "Correo", ar: "البريد الإلكتروني", de: "E-Mail", it: "Email", zh: "邮箱" },
  labelAddress:{ pt: "Endereço", en: "Address", fr: "Adresse", es: "Dirección", ar: "العنوان", de: "Adresse", it: "Indirizzo", zh: "地址" },
  close:       { pt: "Fechar", en: "Close", fr: "Fermer", es: "Cerrar", ar: "إغلاق", de: "Schließen", it: "Chiudi", zh: "关闭" },
  chooseLang:  { pt: "Idioma", en: "Language", fr: "Langue", es: "Idioma", ar: "اللغة", de: "Sprache", it: "Lingua", zh: "语言" },
  translating: { pt: "A traduzir…", en: "Translating…", fr: "Traduction…", es: "Traduciendo…", ar: "جارٍ الترجمة…", de: "Übersetzen…", it: "Traduzione…", zh: "翻译中…" },
};

export function useT() {
  const { lang } = useLang();
  return useCallback((key: keyof typeof UI) => UI[key]?.[lang] ?? UI[key]?.pt ?? String(key), [lang]);
}

// ---------- Dynamic content translation ----------

function collectStrings(content: SiteContent): { paths: (string | number)[][]; values: string[] } {
  const paths: (string | number)[][] = [];
  const values: string[] = [];
  // Only translate human-readable text fields; skip URLs/emails/phones/icons.
  const TEXT_KEYS = new Set([
    "badge", "titleLine1", "titleLine2", "titleEmphasis", "subtitle",
    "ctaPrimary", "ctaSecondary", "statLabel",
    "eyebrow", "title", "text", "boxTitle",
    "name", "label", "desc", "description", "copyright",
    "t", "d", "bullets",
  ]);

  function walk(node: any, path: (string | number)[], parentKey: string) {
    if (node == null) return;
    if (typeof node === "string") {
      const lastKey = path[path.length - 1];
      const keyStr = typeof lastKey === "string" ? lastKey : parentKey;
      if (TEXT_KEYS.has(keyStr) && node.trim() && !node.startsWith("http") && !node.startsWith("/") && !node.startsWith("data:")) {
        paths.push([...path]);
        values.push(node);
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, [...path, i], parentKey));
      return;
    }
    if (typeof node === "object") {
      for (const k of Object.keys(node)) walk(node[k], [...path, k], k);
    }
  }

  walk(content, [], "");
  return { paths, values };
}

function applyTranslations(content: SiteContent, paths: (string | number)[][], translations: string[]): SiteContent {
  // Deep clone
  const out: any = JSON.parse(JSON.stringify(content));
  paths.forEach((p, i) => {
    let ref: any = out;
    for (let j = 0; j < p.length - 1; j++) ref = ref[p[j]];
    ref[p[p.length - 1]] = translations[i];
  });
  return out as SiteContent;
}

function hashString(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return String(h);
}

export function useTranslatedContent(content: SiteContent): { content: SiteContent; isTranslating: boolean } {
  const { lang } = useLang();
  const fn = useServerFn(translateBatch);

  const { paths, values } = useMemo(() => collectStrings(content), [content]);
  const cacheKey = useMemo(() => hashString(values.join("|")), [values]);

  const { data, isFetching } = useQuery({
    queryKey: ["translate", lang, cacheKey],
    queryFn: async () => {
      if (typeof window !== "undefined") {
        const cached = window.localStorage.getItem(`tr:${lang}:${cacheKey}`);
        if (cached) {
          try { return JSON.parse(cached) as string[]; } catch { /* ignore */ }
        }
      }
      const res = await fn({ data: { target: lang, texts: values } });
      if (typeof window !== "undefined") {
        try { window.localStorage.setItem(`tr:${lang}:${cacheKey}`, JSON.stringify(res.translations)); } catch { /* ignore */ }
      }
      return res.translations;
    },
    enabled: lang !== "pt" && values.length > 0,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  if (lang === "pt") return { content, isTranslating: false };
  if (!data) return { content, isTranslating: isFetching };
  return { content: applyTranslations(content, paths, data), isTranslating: false };
}