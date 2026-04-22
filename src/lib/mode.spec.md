# Portfolio Mode Manual Test Matrix

## parseMode
- [ ] input: `engineering` => `engineering`
- [ ] input: `research` => `research`
- [ ] input: `invalid` => `engineering`
- [ ] input: `undefined` => `engineering`

## mergeModeIntoQuery
- [ ] preserves unrelated params (`?foo=1` stays)
- [ ] updates only `mode` key
- [ ] normalizes empty search to `?mode=<value>`

## precedence
1. URL mode (valid) wins
2. persisted mode used when URL mode missing
3. default engineering otherwise

## hero behavior
- [ ] engineering: execution-focused description + engineering CTA
- [ ] research: methodology-focused description + research CTA

## accessibility
- [ ] active mode is visible as text near toggle
- [ ] mode change is announced via `aria-live`
- [ ] context chip auto-dismisses and does not block interaction

## motion
- [ ] switch transitions feel instant (~150-250ms)
- [ ] reduced-motion preference disables non-essential transitions

## runtime matrix
- [ ] `/` first load shows engineering lens
- [ ] `/?mode=research` first paint shows research lens
- [ ] `/?mode=engineering&foo=bar` keeps `foo=bar` after toggles
- [ ] toggle does not force scroll-to-top
- [ ] refresh preserves expected mode behavior
- [ ] back/forward keeps UI and URL mode in sync
