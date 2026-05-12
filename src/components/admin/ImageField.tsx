import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  aspect?: string;
};

export function ImageField({ label, value, onChange, aspect = "aspect-video" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    if (f.size > 4 * 1024 * 1024) {
      alert("Imagem muito grande (máx 4MB). Use uma menor ou cole uma URL.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(f);
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
            value={value.startsWith("data:") ? "(imagem enviada do dispositivo)" : value}
            onChange={(e) => onChange(e.target.value)}
            disabled={value.startsWith("data:")}
          />
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload className="w-4 h-4 mr-1" /> Upload
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
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