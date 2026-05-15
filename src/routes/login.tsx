import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/admin" });
  }, [session, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    else navigate({ to: "/admin" });
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    setBusy(false);
    if (result.error) setErr(String(result.error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
      <Card className="w-full max-w-sm p-8 bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Entrar</h1>
            <p className="text-xs text-muted-foreground">D.Tiba Gráfica</p>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full mb-4" onClick={google} disabled={busy}>
          Continuar com Google
        </Button>

        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="bg-card px-2 relative z-10">ou com email</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-0" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="e">Email</Label>
            <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p">Palavra-passe</Label>
            <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full bg-gradient-hero" disabled={busy}>
            {busy ? "A entrar…" : "Entrar"}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Não tens conta? <Link to="/signup" className="text-primary font-medium">Criar conta</Link>
        </p>
      </Card>
    </div>
  );
}