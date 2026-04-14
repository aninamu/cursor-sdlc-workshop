# Soft Girl Era Wellness Deals — base MVP

Demo map + list app for Los Angeles–area seed deals (see `src/data/deals.json`).

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Place search uses the **Nominatim** API. In development, requests go through the Vite proxy (`/api/nominatim`) with a descriptive `User-Agent`. For production static hosting, search calls `https://nominatim.openstreetmap.org` directly; ensure your deployment complies with [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).
