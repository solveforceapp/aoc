// src/system/useSafeAsset.ts
import { useHealth } from './HealthContext';
import { getAsset as rawGetAsset, AssetCategory, AssetKey } from './AssetRegistry';

export function useSafeAsset() {
  const { reportIssue } = useHealth();
  
  return <C extends AssetCategory>(category: C, key: AssetKey<C>): string => {
    const path = rawGetAsset(category, key);
    if (path === '/assets/fallback.png') {
      reportIssue({
        type: 'MISSING_ASSET',
        severity: 'warning',
        message: `Missing asset: ${String(category)}.${String(key)}`,
        details: { category, key },
      });
    }
    return path;
  };
}
