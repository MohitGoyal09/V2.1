import { PortfolioMode } from '@/stores/modeStore';

const DEFAULT_MODE: PortfolioMode = 'engineering';
const VALID_MODES: ReadonlySet<PortfolioMode> = new Set([
  'engineering',
  'research',
]);

export function parseMode(value: string | null | undefined): PortfolioMode {
  if (!value) return DEFAULT_MODE;
  return VALID_MODES.has(value as PortfolioMode)
    ? (value as PortfolioMode)
    : DEFAULT_MODE;
}

export function mergeModeIntoQuery(
  search: string,
  mode: PortfolioMode,
): string {
  const params = new URLSearchParams(search);
  params.set('mode', mode);
  return `?${params.toString()}`;
}
