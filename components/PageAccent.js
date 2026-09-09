import { Heart, Flower2, Home } from "lucide-react";

export default function PageAccent() {
  return (
    <div className="flex items-center gap-3 text-pine/40 mb-6" aria-hidden="true">
      <Home size={16} strokeWidth={1.5} />
      <span className="w-8 h-px bg-pine/20" />
      <Heart size={16} strokeWidth={1.5} className="text-terracotta/50" />
      <span className="w-8 h-px bg-pine/20" />
      <Flower2 size={16} strokeWidth={1.5} />
    </div>
  );
}
