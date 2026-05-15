import { Headset } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/244950272121"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 transition-transform group-hover:scale-105">
        <Headset className="w-6 h-6" />
      </span>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground text-background text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Falar connosco
      </span>
    </a>
  );
}