import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nova palavra-passe | D.Tiba Gráfica" },
      { name: "description", content: "Defina uma nova palavra-passe para a área administrativa da D.Tiba Gráfica." },
      { property: "og:title", content: "Nova palavra-passe | D.Tiba Gráfica" },
      { property: "og:description", content: "Conclua com segurança a recuperação da sua conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [validating, setValidating] = useState(true);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hasRecoveryHash = window.location.hash.includes("type=recovery");
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setRecoveryReady(hasRecoveryHash || Boolean(data.session));
      setValidating(false);
    };
    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryReady(true);
        setValidating(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmation) {
      setError("As palavras-passe não coincidem.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError("O link expirou ou não é válido. Solicite um novo link de recuperação.");
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
      <Card className="w-full max-w-sm p-8 bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Nova palavra-passe</h1>
            <p className="text-xs text-muted-foreground">D.Tiba Gráfica</p>
          </div>
        </div>

        {validating ? (
          <p className="text-sm text-muted-foreground">A validar o link…</p>
        ) : done ? (
          <div className="space-y-5">
            <p className="text-sm">A sua palavra-passe foi atualizada com sucesso.</p>
            <Button className="w-full bg-gradient-hero" onClick={() => navigate({ to: "/admin" })}>
              Entrar no painel
            </Button>
          </div>
        ) : !recoveryReady ? (
          <div className="space-y-5">
            <p role="alert" className="text-sm text-destructive">
              Este link expirou ou não é válido. Solicite um novo link de recuperação.
            </p>
            <Button asChild className="w-full bg-gradient-hero">
              <Link to="/forgot-password">Solicitar novo link</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">Nova palavra-passe</Label>
              <Input id="new-password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirmar palavra-passe</Label>
              <Input id="confirm-password" type="password" autoComplete="new-password" minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-gradient-hero" disabled={busy}>
              {busy ? "A guardar…" : "Guardar nova palavra-passe"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}