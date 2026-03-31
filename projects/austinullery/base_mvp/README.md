# Base MVP

This folder is where your project code lives.

## What to Build
- A minimal, working version of your project
- Should run locally and do *something* visible
- Keep it simple — 10 minutes max!

### Good Examples
- A Chrome extension with one button that does one thing
- A web page with basic HTML/CSS/JS
- A simple CLI script

### Run locally

The app loads `data/demo.json` with `fetch()`, so open it through a **local server** (not `file://`):

```bash
cd projects/<your-github-username>/base_mvp
python3 -m http.server 8765
```

Then visit **http://localhost:8765/** in your browser.

### Instructions

1. Tell Cursor to read the `prd.md` in your project folder
2. Tell Cursor to generate the base MVP here
3. Tell Cursor to run it locally and verify it works

### After You're Done

> **Ask Cursor:** "Commit all my changes with the message 'Base MVP scaffold', push to my fork, and open a PR to the original repo"
