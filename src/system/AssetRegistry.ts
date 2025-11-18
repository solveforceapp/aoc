// src/system/AssetRegistry.ts

// Known static assets (images, icons, etc.)
// NOTE: These paths are placeholders as there's no asset directory provided.
export const ASSETS = {
  logos: {
    solveforce: '/assets/solveforce-logo.svg',
    codex: '/assets/codex-logo.svg',
  },
  backgrounds: {
    cosmos: '/assets/cosmos-bg.png',
  },
  icons: {
    fallback: '/assets/fallback.png'
  }
} as const;

export type AssetCategory = keyof typeof ASSETS;
export type AssetKey<C extends AssetCategory> = keyof (typeof ASSETS)[C];

export function getAsset<C extends AssetCategory>(
  category: C,
  key: AssetKey<C>,
): string {
  const bucket = ASSETS[category];
  const val = (bucket as any)[key];

  if (!val) {
    // Runtime guard: won't crash, but logs and falls back
    console.warn(
      `[AssetRegistry] Missing asset: category="${String(
        category,
      )}" key="${String(key)}"`,
    );
    return '/assets/fallback.png';
  }
  return val;
}
