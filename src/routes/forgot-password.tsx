import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  head: () => ({
    meta: [
      { title: "Recuperar acesso | D.Tiba Gráfica" },
      { name: "description", content: "Recupere o acesso à área administrativa da D.Tiba Gráfica." },
      { property: "og:title", content: "Recuperar acesso | D.Tiba Gráfica" },
      { property: "og:description", content: "Solicite um link seguro para definir uma nova palavra-passe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { email: initialEmail } = Route.useSearch();
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (resetError) {
      setError("Não foi possível enviar o link. Confirme o email e tente novamente.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
      <Card className="w-full max-w-sm p-8 bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Recuperar acesso</h1>
            <p className="text-xs text-muted-foreground">D.Tiba Gráfica</p>
          </div>
        </div>

        {sent ? (
          <div className="space-y-5">
            <div className="rounded-md border border-border bg-muted/40 p-4">
              <p className="font-medium">Verifique o seu email</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Se existir uma conta para <strong>{email}</strong>, receberá um link para criar uma nova palavra-passe.
              </p>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={() => setSent(false)}>
              Reenviar o link
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Digite o email da sua conta. Enviaremos um link seguro para recuperar o acesso.
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="recovery-email">Email</Label>
              <Input
                id="recovery-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-gradient-hero" disabled={busy}>
              {busy ? "A enviar…" : "Enviar link de recuperação"}
            </Button>
          </form>
        )}

        <Button asChild variant="link" className="mt-4 w-full text-muted-foreground">
          <Link to="/login"><ArrowLeft className="w-4 h-4" /> Voltar para entrar</Link>
        </Button>
      </Card>
    </div>
  );
}