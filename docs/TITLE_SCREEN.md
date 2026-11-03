# Title screen · 2026-10-17

The home menu frames the existing animated tavern with a title, primary navigation and a separate prologue card. It keeps the current hero editor, settings, saved-world resume and both prologue entry points. No models, story rules or save formats change.

Authored files: `dist/cinematic-menu.js`, `dist/cinematic-menu.css`. Home-specific selectors include both `cinematic-active` and `data-cinema-route=home` to override the older landscape home layout without affecting settings or editor screens. Decorative embers use CSS only and disappear with reduced motion or animations disabled. Portrait screens scroll; landscape separates navigation and the prologue card.

`tests/menu-browser.cjs` checks 390px portrait and 852px / 1366px landscape, including non-overlapping navigation and chapter, settings, existing editor and save isolation. Linux Chromium verification does not establish physical-device performance.
