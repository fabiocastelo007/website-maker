import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/admin",
        data: { full_name: name },
      },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setDone(true);
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    setBusy(false);
    if (result.error) setErr(String(result.error));
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
        <Card className="w-full max-w-sm p-8 bg-card text-center">
          <h2 className="text-lg font-bold mb-2">Verifica o teu email</h2>
          <p className="text-sm text-muted-foreground">
            Enviámos um link de confirmação para <strong>{email}</strong>.
          </p>
          <Button className="mt-4" onClick={() => navigate({ to: "/login" })}>Ir para login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
      <Card className="w-full max-w-sm p-8 bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Criar conta</h1>
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
            <Label htmlFor="n">Nome</Label>
            <Input id="n" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="e">Email</Label>
            <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p">Palavra-passe</Label>
            <Input id="p" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full bg-gradient-hero" disabled={busy}>
            {busy ? "A criar…" : "Criar conta"}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Já tens conta? <Link to="/login" className="text-primary font-medium">Entrar</Link>
        </p>
      </Card>
    </div>
  );
}