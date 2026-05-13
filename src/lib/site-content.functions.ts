import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Mesma password do painel admin (src/lib/admin-auth.ts).
// Verificada no servidor antes de gravar.
const ADMIN_PASSWORD = "dtiba2025";

export const fetchSiteContent = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("content")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data?.content ?? {}) as Record<string, unknown>;
  },
);

export const saveSiteContentFn = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; content: unknown }) => {
    if (!input || typeof input.password !== "string") {
      throw new Error("Pedido inválido");
    }
    if (typeof input.content !== "object" || input.content === null) {
      throw new Error("Conteúdo inválido");
    }
    return input;
  })
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      throw new Error("Não autorizado");
    }
    const { error } = await supabaseAdmin
      .from("site_content")
      .update({ content: data.content as object, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });