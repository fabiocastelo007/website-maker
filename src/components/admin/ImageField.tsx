import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BUCKET = "site-images";

function extractStoragePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return url.slice(i + marker.length);
}

export async function deleteStorageImageIfOwned(url?: string | null) {
  if (!url) return;
  const path = extractStoragePath(url);
  if (!path) return;
  try {
    await supabase.storage.from(BUCKET).remove([path]);
  } catch (e) {
    console.warn("Falha ao apagar imagem do storage", e);
  }
}

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  aspect?: string;
};

export function ImageField({ label, value, onChange, aspect = "aspect-video" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const onFile = async (f: File) => {
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx 8MB).");
      return;
    }
    setUploading(true);
    try {
      const ext = f.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, f, { cacheControl: "31536000", upsert: false, contentType: f.type });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      await deleteStorageImageIfOwned(value);
      onChange(data.publicUrl);
      toast.success("Imagem carregada.");
    } catch (e: any) {
      toast.error(e.message || "Falha no upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onClear = async () => {
    await deleteStorageImageIfOwned(value);
    onChange("");
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-3">
        <div className={`${aspect} w-32 shrink-0 rounded-lg border bg-muted overflow-hidden flex items-center justify-center`}>
          {value ? (
            <img src={value} alt="" className="w-full h-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">sem imagem</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Cole uma URL https://… ou faça upload"
            value={value.startsWith("data:") ? "(imagem antiga em base64 — substitua)" : value}
            onChange={(e) => onChange(e.target.value)}
            disabled={value.startsWith("data:")}
          />
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}
              {uploading ? "A enviar…" : "Upload"}
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={onClear}>
                <X className="w-4 h-4 mr-1" /> Limpar
              </Button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}