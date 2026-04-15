# AGENTS.md

## Cursor Cloud instructions for this repository

### Repository overview
This is a multi-project workshop repo ("Cursor SDLC Workshop") containing independent React/Vite sub-projects.

- There is **no root-level `package.json`**.
- Run npm commands **inside each sub-project directory only**.
- No databases, Docker, or external services are required.

> **Important:** Do not run `npm install`, `npm run dev`, or `npm run build` at `/workspace`.

### Projects at a glance

| Project | Path | Default Port | Package Manager | Notes |
|---|---|---:|---|---|
| Slides: SDLC Workshop | `slides-sdlc-workshop/` | 5173 | npm | Has lint |
| Slides: Cursor 101 | `slides_cursor_101/` | 5174 | npm | Start with `--port 5174`; has lint |
| LinkedOut team apps | `linkedout/team_{1-5}/` | 3001-3005 | npm | No lint script; ports hardcoded |
| Soft Girl Era Wellness | `projects/soft-girl-era-wellness-deals/base_mvp/` | 5175 | npm | Start with `--port 5175` |

The `archive/` directory contains old outputs and should generally be ignored.

### Quick start commands (run in the target project directory)

| Action | Command |
|---|---|
| Install deps | `npm install` |
| Start dev server | `npm run dev -- --host 0.0.0.0` |
| Build | `npm run build` |
| Lint (slides only) | `npm run lint` |

Examples:
```bash
cd slides-sdlc-workshop && npm install && npm run dev -- --host 0.0.0.0
cd slides_cursor_101 && npm install && npm run dev -- --host 0.0.0.0 --port 5174
cd linkedout/team_1 && npm install && npm run dev -- --host 0.0.0.0
```

### Validation expectations (no automated tests in repo)
When making changes, prefer this verification checklist:

1. App starts successfully (`npm run dev`)
2. Build succeeds (`npm run build`)
3. Lint succeeds where available (`slides-sdlc-workshop`, `slides_cursor_101`)
4. UI behavior is manually verified for the changed area

### Known gotchas
- LinkedOut apps use Vite 5 with CJS and may print a deprecation warning; this is expected.
- LinkedOut apps do **not** include a lint script.
- LinkedOut ports are hardcoded in each `vite.config.js`; do not change them unless explicitly requested.
- If a port is already in use, stop the conflicting process or run only the intended app.

### Scope boundaries
- Avoid editing `archive/` unless explicitly requested.
- Keep changes localized to the relevant sub-project.
- Do not introduce cross-project assumptions (each app is independent).
