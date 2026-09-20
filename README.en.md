<div align="center">

<img src="pokemux-logo-ui.png" width="460" alt="PokeMux">

# PokeMux

**Up to four isolated Poke Idle World accounts, dashboards and local tools in one Windows app.**

[Download for Windows](https://github.com/Diego-ops501/PokeMux/releases/latest) · [Português](README.md) · [License](LICENSE)

</div>

> Independent community project. CAPTCHA and 2FA always require manual completion.

## Credits

**PokeMux** is derived from **[soufoka/PokeGrid-source](https://github.com/soufoka/PokeGrid-source)** and preserves its MIT license, history and credits. The original PokeGrid supplied the four-account grid, isolated sessions, assisted login, Eco mode, dashboards, Hunt Analyzer, history, tier list, Ditto tools and many quality-of-life features.

PokeMux adds a Windows installer and updater, hardened storage and navigation, local overlays, confirmed Poké Ball purchases, optional return to the same hunt, spoken alerts and a repaired bundled IV calculator. Its compact top bar uses the full window width for the game grid. See [NOTICE.md](NOTICE.md) for third-party acknowledgements.

## Highlights

- Hard limit of four persistent, isolated accounts.
- Assisted auto-login with credentials protected by Electron `safeStorage`/Windows DPAPI.
- Dashboard, Simple mode, history, gold/XP/kills metrics, overkill, ETA and hunt recommendations.
- Hunt Analyzer, tier list, Ditto analysis, inventory and IV calculator.
- Windows, popup and Discord alerts; optional local shiny screenshot.
- Offline Windows speech for a live shiny, shiny catch/loss, low supplies and Legendary-quality catches.
- Read-only floating overlay.
- One-shot Poké Ball purchases with account, quantity, total cost and balance confirmation.
- Experimental return to the same hunt after reload, off by default and limited to three attempts.
- Confirmed updates with SHA-512 validation; no silent download or installation.

The app does not solve CAPTCHA, automate 2FA, load arbitrary userscripts, rotate hunts, auto-sell or add refill loops.

## Run from source

```powershell
git clone https://github.com/Diego-ops501/PokeMux.git
cd PokeMux
npm ci
npm test
npm start
```

Build the Windows x64 NSIS installer with `npm run dist`.

## Security

- Sandboxed windows with context isolation and no Node.js access.
- Game panels are restricted to the official game origin.
- Credentials never enter logs, backups or exports.
- The bundled IV helper only loads after login; remote userscripts remain disabled.
- CAPTCHA, Cloudflare Turnstile and 2FA remain manual.

## Documentation and license

- [Manual](MANUAL.md)
- [FAQ](FAQ.md)
- [Changelog](CHANGELOG.md)
- [Third-party notices](NOTICE.md)
- [MIT license](LICENSE)

PokeMux is not affiliated with Poke Idle World, Nintendo, The Pokémon Company or Game Freak.
