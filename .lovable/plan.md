## Visão geral

Reescrita estrutural em 6 fases. Cada fase é independente e pode ser validada antes de seguir. O admin atual (password hardcoded `dtiba2025`) é removido por completo.

---

### Fase 1 — Autenticação real (Email/Password + Google)

- Ativar **Email/Password + Google** no Lovable Cloud (`configure_social_auth`).
- Criar tabelas:
  - `profiles` (id → auth.users, display_name, avatar)
  - `user_roles` (user_id, role) com enum `app_role` ('admin', 'user') — padrão de segurança Lovable.
  - Função `has_role(user_id, role)` SECURITY DEFINER.
- Trigger `handle_new_user` cria profile automaticamente em signup.
- Páginas novas: `/login` (email+password + botão "Entrar com Google"), `/signup`, `/reset-password`.
- `/admin` passa a estar sob `_authenticated/` + check `has_role(uid, 'admin')`. Sem role admin → 403.
- Remover por completo `src/lib/admin-auth.ts`, sessionStorage, `dtiba2025`, e o RPC `update_site_content` que valida password.
- Tu serás o único admin: depois do teu primeiro signup eu insiro manualmente o teu user_id em `user_roles`. Registo aberto fica para utilizadores normais (mas o painel só abre com role admin).

### Fase 2 — Normalização do conteúdo em tabelas

Substituir o JSON único `site_content` por tabelas reais:

- `site_settings` (chave/valor para hero, about, contact, footer — campos simples)
- `services` (icon, title, desc, sort_order)
- `portfolio_categories` (id, name, sort_order)
- `portfolio_items` (image_url, label, category_id, sort_order)
- `client_logos` (image_url, sort_order)
- `home_logos` (logos da secção "Marcas que nasceram aqui")

RLS: leitura pública (`SELECT` para anon), escrita só para admin (`has_role(uid, 'admin')`).

Migração de dados: script que lê o `site_content` atual e popula as novas tabelas, depois dropa `site_content`.

### Fase 3 — Storage de imagens

- Bucket público `site-images`.
- RLS: leitura pública, upload/delete só admin.
- `ImageField` passa a fazer upload real (não data URL base64) e guarda o URL público.
- Imagens existentes que estejam em base64 são migradas para o bucket.

### Fase 4 — Realtime + frontend dinâmico

- Ativar `supabase_realtime` para todas as tabelas de conteúdo.
- Substituir o store custom em `site-content.ts` por **TanStack Query** + subscription Realtime que invalida queries quando há mudanças.
- Resultado: editar no admin → site público atualiza sozinho em ≤1s, sem refresh.
- Preloader mantido mas mais leve (timeout reduzido, dark bg que já está).
- Admin reescrito para usar mutations diretas por tabela (não mais "salvar tudo de uma vez"), com optimistic updates.

### Fase 5 — Portfólio + carrossel

- Frontend portfólio:
  - Por categoria: mostrar **6 itens**, botão "Ver mais" carrega o resto (paginação client-side, dados já vêm).
  - Carrossel automático na home com auto-play (Embla, já instalado), agrupado por categoria.
- Admin portfólio:
  - CRUD completo de categorias (criar, renomear, reordenar drag, apagar).
  - CRUD de items com upload, troca de categoria, reordenação.

### Fase 6 — WhatsApp + Chatbot IA

- Botão flutuante (bottom-right) estilo call center: ícone headset, animação pulse.
- Click abre menu com 2 opções:
  1. **Falar no WhatsApp** → `https://wa.me/244950272121`
  2. **Chat com assistente** → abre painel de chat
- Chatbot:
  - `createServerFn` com streaming via Lovable AI (`google/gemini-3-flash-preview`, grátis).
  - System prompt treinado com info da D.Tiba (serviços, contacto, horário) — puxa dinamicamente das tabelas para estar sempre atualizado.
  - UI de chat moderna com markdown, typing indicator, histórico em sessionStorage.

---

## Detalhes técnicos

- **Stack**: TanStack Start (server fns, não Edge Functions). Auth via `requireSupabaseAuth` middleware. Cliente Supabase no browser para realtime + queries públicas.
- **TanStack Query**: caching + invalidação por canal Realtime; loaders ficam triviais.
- **Performance**: queries paralelas (`Promise.all`) no boot, fetch só do necessário, preloader esconde no primeiro paint útil.
- **Segurança**: RLS estrita em todas as tabelas; nenhuma policy `USING (true)` para escrita; service role só em server fns admin.
- **Migração de dados**: irreversível mas com snapshot do `site_content` antes de dropar.

---

## Ordem de entrega

Sugiro entregar em **3 PRs lógicos** (cada um testável):

1. **Fases 1+2+3** (auth + tabelas + storage) — base sólida, admin já funciona com BD real.
2. **Fases 4+5** (realtime + portfólio) — site fica dinâmico e portfólio polido.
3. **Fase 6** (WhatsApp + chatbot) — feature isolada no fim.

Após aprovares começo pela Fase 1.