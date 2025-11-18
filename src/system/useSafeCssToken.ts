// src/system/useSafeCssToken.ts
import { useHealth } from './HealthContext';
import { cssClass as rawCss, CssCategory, CssKey } from './CssTokenRegistry';

export function useSafeCssToken() {
  const { reportIssue } = useHealth();

  return <C extends CssCategory>(category: C, key: CssKey<C>): string => {
    const cls = rawCss(category, key);
    if (!cls) {
      reportIssue({
        type: 'MISSING_CSS_TOKEN',
        severity: 'warning',
        message: `Missing CSS token: ${String(category)}.${String(key)}`,
        details: { category, key },
      });
    }
    return cls;
  };
}
