# AGENTS.md

## Cursor Cloud specific instructions

### Repository overview

This is a multi-project workshop repo ("Cursor SDLC Workshop") containing independent React/Vite sub-projects. There is **no root-level `package.json`** — each sub-project manages its own dependencies. No databases, Docker, or external services are required.

### Key sub-projects

| Project | Path | Port | Package manager |
|---|---|---|---|
| Slides: SDLC Workshop | `slides-sdlc-workshop/` | 5173 (default) | npm |
| Slides: Cursor 101 | `slides_cursor_101/` | 5174 (use `--port`) | npm |
| LinkedOut (teams 1-5) | `linkedout/team_{1-5}/` | 3001-3005 | npm |
| Soft Girl Era Wellness | `projects/soft-girl-era-wellness-deals/base_mvp/` | 5175 (use `--port`) | npm |

The `archive/` directory contains old workshop outputs and can be ignored.

### Running services

All sub-projects use `npm run dev` (Vite). Specify `--host 0.0.0.0` for network access from the browser:

```bash
cd slides-sdlc-workshop && npm run dev -- --host 0.0.0.0
cd linkedout/team_1 && npm run dev -- --host 0.0.0.0
```

### Lint and build

- The two slides projects (`slides-sdlc-workshop`, `slides_cursor_101`) have ESLint configured: `npm run lint`
- The LinkedOut team apps do **not** have a lint script.
- All projects build with `npm run build`.

### Gotchas

- LinkedOut apps use Vite 5 with CJS, which prints a deprecation warning — this is harmless and expected.
- There are no automated tests in any sub-project; verification is done by running the dev server and checking the UI.
- Each LinkedOut team folder has a hardcoded port in `vite.config.js`; do not change these ports when running multiple teams simultaneously.
