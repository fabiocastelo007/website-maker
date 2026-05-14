import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";

export function Preloader({ visible }: { visible: boolean }) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 500);
    return () => clearTimeout(t);
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "linear-gradient(135deg, #0b0b12 0%, #15151f 100%)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <img
            src={logoImg}
            alt="D.Tiba"
            className="relative h-24 w-auto object-contain animate-[preloader-pulse_1.6s_ease-in-out_infinite]"
          />
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 bg-primary animate-[preloader-bar_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes preloader-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}