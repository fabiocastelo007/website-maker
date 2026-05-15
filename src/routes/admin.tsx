import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Lock, LogOut, Save, RotateCcw, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import {
  defaultContent,
  resetSiteContent,
  saveSiteContent,
  useSiteContent,
  type SiteContent,
  type ServiceItem,
  type PortfolioItem,
  type PortfolioCategory,
  type ValueItem,
} from "@/lib/site-content";
import { ImageField } from "@/components/admin/ImageField";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const ICON_OPTIONS = [
  "PenTool", "Layers", "Printer", "Shirt", "Car", "Megaphone",
  "Lightbulb", "Building2", "Flag", "Sparkles",
];

function AdminPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">A carregar…</div>;
  }
  if (!session) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
        <Card className="max-w-md p-8 text-center">
          <Lock className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <h2 className="font-bold text-lg mb-2">Sem permissão</h2>
          <p className="text-sm text-muted-foreground mb-4">
            A tua conta está autenticada mas não tem permissão de administrador.
            Pede a um admin para te dar acesso.
          </p>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}>
            Sair
          </Button>
        </Card>
      </div>
    );
  }
  return <AdminPanel onLogout={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }} />;
}

function AdminPanel({ onLogout }: { onLogout: () => void | Promise<void> }) {
  const navigate = useNavigate();
  const live = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => structuredClone(live));
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (!hydrated) {
      setDraft(structuredClone(live));
      setHydrated(true);
    }
  }, [live, hydrated]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveSiteContent(draft);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) {
      alert("Erro ao salvar: " + (e?.message ?? "desconhecido"));
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("Restaurar todo o conteúdo original? Esta ação grava no Cloud.")) return;
    setSaving(true);
    try {
      await resetSiteContent();
      setDraft(structuredClone(defaultContent));
    } catch (e: any) {
      alert("Erro: " + (e?.message ?? "desconhecido"));
    } finally {
      setSaving(false);
    }
  };

  const doLogout = () => {
    void onLogout();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={draft.brand.logo} alt="" className="h-9 w-auto" />
            <div className="leading-tight">
              <div className="font-bold text-sm">Painel Admin</div>
              <div className="text-xs text-muted-foreground">D.Tiba Gráfica</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && <span className="text-sm text-primary font-medium">✓ Salvo</span>}
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })}>Ver site</Button>
            <Button variant="outline" size="sm" onClick={reset} disabled={saving}><RotateCcw className="w-4 h-4 mr-1" />Restaurar</Button>
            <Button size="sm" onClick={save} disabled={saving} className="bg-primary"><Save className="w-4 h-4 mr-1" />{saving ? "A salvar…" : "Salvar"}</Button>
            <Button variant="ghost" size="sm" onClick={doLogout}><LogOut className="w-4 h-4 mr-1" />Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
          <strong>Lovable Cloud activo:</strong> as alterações são gravadas no servidor e ficam visíveis para todos os visitantes.
        </div>

        <Tabs defaultValue="brand" className="w-full">
          <TabsList className="flex flex-wrap h-auto bg-card border p-1">
            <TabsTrigger value="brand">Marca</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="logos">Logos Criados</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="footer">Rodapé</TabsTrigger>
          </TabsList>

          {/* MARCA */}
          <TabsContent value="brand">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Logo da empresa</h2>
              <ImageField
                label="Logo (aparece no topo, rodapé e favicon)"
                value={draft.brand.logo}
                onChange={(v) => update("brand", { ...draft.brand, logo: v })}
                aspect="aspect-square"
              />
            </Card>
          </TabsContent>

          {/* HERO */}
          <TabsContent value="hero">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Seção Hero (topo)</h2>
              <Field label="Etiqueta superior" value={draft.hero.badge} onChange={(v) => update("hero", { ...draft.hero, badge: v })} />
              <div className="grid md:grid-cols-3 gap-3">
                <Field label="Título — linha 1" value={draft.hero.titleLine1} onChange={(v) => update("hero", { ...draft.hero, titleLine1: v })} />
                <Field label="Título — linha 2" value={draft.hero.titleLine2} onChange={(v) => update("hero", { ...draft.hero, titleLine2: v })} />
                <Field label="Palavra em destaque" value={draft.hero.titleEmphasis} onChange={(v) => update("hero", { ...draft.hero, titleEmphasis: v })} />
              </div>
              <Field label="Subtítulo" textarea value={draft.hero.subtitle} onChange={(v) => update("hero", { ...draft.hero, subtitle: v })} />
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Botão primário" value={draft.hero.ctaPrimary} onChange={(v) => update("hero", { ...draft.hero, ctaPrimary: v })} />
                <Field label="Botão secundário" value={draft.hero.ctaSecondary} onChange={(v) => update("hero", { ...draft.hero, ctaSecondary: v })} />
              </div>
              <ImageField label="Imagem hero" value={draft.hero.image} onChange={(v) => update("hero", { ...draft.hero, image: v })} aspect="aspect-[4/5]" />
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Estatística (número)" value={draft.hero.statNumber} onChange={(v) => update("hero", { ...draft.hero, statNumber: v })} />
                <Field label="Estatística (texto)" value={draft.hero.statLabel} onChange={(v) => update("hero", { ...draft.hero, statLabel: v })} />
              </div>
            </Card>
          </TabsContent>

          {/* SOBRE */}
          <TabsContent value="about">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Seção Sobre</h2>
              <ImageField label="Imagem (logo grande)" value={draft.about.image} onChange={(v) => update("about", { ...draft.about, image: v })} aspect="aspect-square" />
              <Field label="Etiqueta" value={draft.about.eyebrow} onChange={(v) => update("about", { ...draft.about, eyebrow: v })} />
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Título" value={draft.about.title} onChange={(v) => update("about", { ...draft.about, title: v })} />
                <Field label="Palavra em destaque" value={draft.about.titleEmphasis} onChange={(v) => update("about", { ...draft.about, titleEmphasis: v })} />
              </div>
              <Field label="Texto" textarea value={draft.about.text} onChange={(v) => update("about", { ...draft.about, text: v })} />
              <div className="space-y-2">
                <Label>Cards (Visão / Missão / Valores)</Label>
                {draft.about.values.map((v, i) => (
                  <div key={i} className="grid md:grid-cols-[1fr_2fr_auto] gap-2 items-start">
                    <Input value={v.t} onChange={(e) => {
                      const arr = [...draft.about.values]; arr[i] = { ...arr[i], t: e.target.value };
                      update("about", { ...draft.about, values: arr });
                    }} placeholder="Título" />
                    <Textarea value={v.d} onChange={(e) => {
                      const arr = [...draft.about.values]; arr[i] = { ...arr[i], d: e.target.value };
                      update("about", { ...draft.about, values: arr });
                    }} placeholder="Descrição" rows={2} />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const arr = draft.about.values.filter((_, j) => j !== i);
                      update("about", { ...draft.about, values: arr });
                    }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("about", { ...draft.about, values: [...draft.about.values, { t: "Novo", d: "Descrição" } as ValueItem] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar card
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* SERVIÇOS */}
          <TabsContent value="services">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Serviços</h2>
              <Field label="Etiqueta" value={draft.services.eyebrow} onChange={(v) => update("services", { ...draft.services, eyebrow: v })} />
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Título" value={draft.services.title} onChange={(v) => update("services", { ...draft.services, title: v })} />
                <Field label="Palavra em destaque" value={draft.services.titleEmphasis} onChange={(v) => update("services", { ...draft.services, titleEmphasis: v })} />
              </div>
              <div className="space-y-3">
                {draft.services.items.map((s, i) => (
                  <Card key={i} className="p-4 bg-muted/40">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                      <div className="ml-auto flex gap-1">
                        <ReorderButtons i={i} list={draft.services.items} onChange={(arr) => update("services", { ...draft.services, items: arr })} />
                        <Button variant="ghost" size="icon" onClick={() => {
                          const arr = draft.services.items.filter((_, j) => j !== i);
                          update("services", { ...draft.services, items: arr });
                        }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Ícone</Label>
                        <select className="w-full h-9 rounded-md border bg-background px-2 text-sm" value={s.icon} onChange={(e) => {
                          const arr = [...draft.services.items]; arr[i] = { ...arr[i], icon: e.target.value };
                          update("services", { ...draft.services, items: arr });
                        }}>
                          {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs">Título</Label>
                        <Input value={s.title} onChange={(e) => {
                          const arr = [...draft.services.items]; arr[i] = { ...arr[i], title: e.target.value };
                          update("services", { ...draft.services, items: arr });
                        }} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Label className="text-xs">Descrição</Label>
                      <Textarea rows={2} value={s.desc} onChange={(e) => {
                        const arr = [...draft.services.items]; arr[i] = { ...arr[i], desc: e.target.value };
                        update("services", { ...draft.services, items: arr });
                      }} />
                    </div>
                  </Card>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("services", { ...draft.services, items: [...draft.services.items, { icon: "Sparkles", title: "Novo serviço", desc: "Descrição" } as ServiceItem] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar serviço
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* LOGOS */}
          <TabsContent value="logos">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Logos criados (clientes)</h2>
              <Field label="Etiqueta" value={draft.logos.eyebrow} onChange={(v) => update("logos", { ...draft.logos, eyebrow: v })} />
              <Field label="Título" value={draft.logos.title} onChange={(v) => update("logos", { ...draft.logos, title: v })} />
              <div className="space-y-3">
                {draft.logos.items.map((src, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <ImageField value={src} onChange={(v) => {
                        const arr = [...draft.logos.items]; arr[i] = v;
                        update("logos", { ...draft.logos, items: arr });
                      }} aspect="aspect-square" />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => {
                      const arr = draft.logos.items.filter((_, j) => j !== i);
                      update("logos", { ...draft.logos, items: arr });
                    }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("logos", { ...draft.logos, items: [...draft.logos.items, ""] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar logo
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* PORTFÓLIO */}
          <TabsContent value="portfolio">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Portfólio</h2>
              <Field label="Etiqueta" value={draft.portfolio.eyebrow} onChange={(v) => update("portfolio", { ...draft.portfolio, eyebrow: v })} />
              <Field label="Título" value={draft.portfolio.title} onChange={(v) => update("portfolio", { ...draft.portfolio, title: v })} />

              {/* Categorias / Estações */}
              <Card className="p-4 bg-muted/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Estações / Categorias</h3>
                    <p className="text-xs text-muted-foreground">Cada estação cria uma divisão na área do portfólio. Atribua trabalhos abaixo.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    const id = "cat_" + Math.random().toString(36).slice(2, 8);
                    const arr = [...(draft.portfolio.categories ?? []), { id, name: "Nova estação" } as PortfolioCategory];
                    update("portfolio", { ...draft.portfolio, categories: arr });
                  }}>
                    <Plus className="w-4 h-4 mr-1" /> Adicionar estação
                  </Button>
                </div>
                <div className="space-y-2">
                  {(draft.portfolio.categories ?? []).map((cat, i) => (
                    <div key={cat.id} className="flex gap-2 items-center">
                      <span className="text-xs text-muted-foreground w-8">#{i + 1}</span>
                      <Input
                        value={cat.name}
                        onChange={(e) => {
                          const arr = [...draft.portfolio.categories];
                          arr[i] = { ...arr[i], name: e.target.value };
                          update("portfolio", { ...draft.portfolio, categories: arr });
                        }}
                        placeholder="Nome da estação"
                      />
                      <ReorderButtons i={i} list={draft.portfolio.categories} onChange={(arr) => update("portfolio", { ...draft.portfolio, categories: arr })} />
                      <Button variant="ghost" size="icon" onClick={() => {
                        if (!confirm(`Remover estação "${cat.name}"? Os trabalhos ficarão sem categoria.`)) return;
                        const arr = draft.portfolio.categories.filter((_, j) => j !== i);
                        const items = draft.portfolio.items.map((p) => p.categoryId === cat.id ? { ...p, categoryId: undefined } : p);
                        update("portfolio", { ...draft.portfolio, categories: arr, items });
                      }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  {(!draft.portfolio.categories || draft.portfolio.categories.length === 0) && (
                    <p className="text-sm text-muted-foreground">Nenhuma estação criada. Os trabalhos aparecerão em "Outros".</p>
                  )}
                </div>
              </Card>

              <div className="space-y-3">
                {draft.portfolio.items.map((p, i) => (
                  <Card key={i} className="p-4 bg-muted/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                      <div className="flex gap-1">
                        <ReorderButtons i={i} list={draft.portfolio.items} onChange={(arr) => update("portfolio", { ...draft.portfolio, items: arr })} />
                        <Button variant="ghost" size="icon" onClick={() => {
                          const arr = draft.portfolio.items.filter((_, j) => j !== i);
                          update("portfolio", { ...draft.portfolio, items: arr });
                        }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Field label="Legenda" value={p.label} onChange={(v) => {
                        const arr = [...draft.portfolio.items]; arr[i] = { ...arr[i], label: v };
                        update("portfolio", { ...draft.portfolio, items: arr });
                      }} />
                      <div className="space-y-1.5">
                        <Label className="text-sm">Estação</Label>
                        <select
                          className="w-full h-10 rounded-md border bg-background px-2 text-sm"
                          value={p.categoryId ?? ""}
                          onChange={(e) => {
                            const arr = [...draft.portfolio.items];
                            arr[i] = { ...arr[i], categoryId: e.target.value || undefined };
                            update("portfolio", { ...draft.portfolio, items: arr });
                          }}
                        >
                          <option value="">— sem categoria —</option>
                          {(draft.portfolio.categories ?? []).map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <ImageField value={p.src} onChange={(v) => {
                        const arr = [...draft.portfolio.items]; arr[i] = { ...arr[i], src: v };
                        update("portfolio", { ...draft.portfolio, items: arr });
                      }} aspect="aspect-[4/3]" />
                    </div>
                  </Card>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("portfolio", { ...draft.portfolio, items: [...draft.portfolio.items, { src: "", label: "Novo trabalho" } as PortfolioItem] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar trabalho
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* CONTATO */}
          <TabsContent value="contact">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Contato</h2>
              <Field label="Título" value={draft.contact.title} onChange={(v) => update("contact", { ...draft.contact, title: v })} />
              <Field label="Subtítulo" textarea value={draft.contact.subtitle} onChange={(v) => update("contact", { ...draft.contact, subtitle: v })} />
              <div className="space-y-2">
                <Label>Bullets</Label>
                {draft.contact.bullets.map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={b} onChange={(e) => {
                      const arr = [...draft.contact.bullets]; arr[i] = e.target.value;
                      update("contact", { ...draft.contact, bullets: arr });
                    }} />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const arr = draft.contact.bullets.filter((_, j) => j !== i);
                      update("contact", { ...draft.contact, bullets: arr });
                    }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => update("contact", { ...draft.contact, bullets: [...draft.contact.bullets, "Novo benefício"] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar bullet
                </Button>
              </div>
              <Field label="Título da caixa de contato" value={draft.contact.boxTitle} onChange={(v) => update("contact", { ...draft.contact, boxTitle: v })} />
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Telefone (link tel:)" value={draft.contact.phone} onChange={(v) => update("contact", { ...draft.contact, phone: v })} />
                <Field label="Telefone (exibido)" value={draft.contact.phoneDisplay} onChange={(v) => update("contact", { ...draft.contact, phoneDisplay: v })} />
              </div>
              <Field label="Email" value={draft.contact.email} onChange={(v) => update("contact", { ...draft.contact, email: v })} />
              <Field label="Endereço" value={draft.contact.address} onChange={(v) => update("contact", { ...draft.contact, address: v })} />
            </Card>
          </TabsContent>

          {/* RODAPÉ */}
          <TabsContent value="footer">
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold">Rodapé</h2>
              <Field label="Texto de copyright" value={draft.footer.copyright} onChange={(v) => update("footer", { ...draft.footer, copyright: v })} />
            </Card>
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-4 mt-8 flex justify-end">
          <Button size="lg" onClick={save} disabled={saving} className="bg-primary shadow-elegant">
            <Save className="w-4 h-4 mr-2" /> {saving ? "A salvar…" : "Salvar alterações"}
          </Button>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {textarea ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ReorderButtons<T>({ i, list, onChange }: { i: number; list: T[]; onChange: (arr: T[]) => void }) {
  const move = (dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const arr = [...list];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };
  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => move(-1)} disabled={i === 0}><ChevronUp className="w-4 h-4" /></Button>
      <Button variant="ghost" size="icon" onClick={() => move(1)} disabled={i === list.length - 1}><ChevronDown className="w-4 h-4" /></Button>
    </>
  );
}