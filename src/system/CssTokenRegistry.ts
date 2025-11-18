// src/system/CssTokenRegistry.ts

export const CSS_TOKENS = {
  buttons: {
    primary:
      'px-3 py-1.5 rounded-md border border-amber-400 text-amber-300 hover:bg-amber-400/10 font-mono text-xs',
    danger:
      'px-3 py-1.5 rounded-md border border-red-400 text-red-300 hover:bg-red-400/10 font-mono text-xs',
    engineFuchsia: "bg-transparent border-fuchsia-800 hover:bg-fuchsia-700/50 hover:border-fuchsia-400 hover:text-white text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]",
    engineRed: "bg-transparent border-red-800 hover:bg-red-700/50 hover:border-red-400 hover:text-white text-red-300 shadow-[0_0_10px_rgba(255,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]",
    engineViolet: "bg-transparent border-violet-800 hover:bg-violet-700/50 hover:border-violet-400 hover:text-white text-violet-300 shadow-[0_0_10px_rgba(138,43,226,0.3)] hover:shadow-[0_0_20px_rgba(138,43,226,0.6)]",
    engineGray: "bg-transparent border-gray-500 hover:bg-gray-700/50 hover:border-gray-300 hover:text-white text-gray-300 shadow-[0_0_10px_rgba(150,150,150,0.2)] hover:shadow-[0_0_20px_rgba(200,200,200,0.5)]",
    engineAmber: "bg-transparent border-amber-800 hover:bg-amber-700/50 hover:border-amber-400 hover:text-white text-amber-300 shadow-[0_0_10px_rgba(255,193,7,0.3)] hover:shadow-[0_0_20px_rgba(255,193,7,0.6)]",
  },
  panels: {
    base: 'border rounded-lg bg-black/40 p-4',
    highlight: 'border-emerald-500/50 bg-black/40 p-4',
  },
} as const;

export type CssCategory = keyof typeof CSS_TOKENS;
export type CssKey<C extends CssCategory> = keyof (typeof CSS_TOKENS)[C];

export function cssClass<C extends CssCategory>(
  category: C,
  key: CssKey<C>,
): string {
  const bucket = CSS_TOKENS[category];
  const val = (bucket as any)[key];
  if (!val) {
    console.warn(
      `[CssTokenRegistry] Missing CSS token: category="${String(
        category,
      )}" key="${String(key)}"`,
    );
    return ''; // or a minimal safe fallback
  }
  return val;
}
