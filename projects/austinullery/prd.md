# Product Requirements Document (PRD)

> **Instructions:** This is your project specification. Fill in the sections below to define what you're building.

---

## Project Overview

**Project Name:** Home AI Assistant

**One-line Description:** A simple **single-page** home assistant web app with a unified dashboard, **placeholder modules** for Energy, Security, and Climate Control, and a **chat-style assistant**—all powered by **stubbed local data** (no real devices or providers in Phase 1).

**Type:** Web app (SPA in `base_mvp/`; vanilla HTML/CSS/JS or a small framework—see Open Questions)

---

## Guidelines

### Keep It Small!
- Your MVP should be buildable in **10 minutes**
- Think "proof of concept" not "production ready"
- If it sounds ambitious, make it simpler
- **Use Cursor to help you plan this!**
- This exercise is about learning the git flow and understanding where Cursor's features fit into the SDLC

### Good Project Ideas

**Pong** — classic paddle-and-ball game
- _Example features:_ scoreboard, sound effects, difficulty/speed settings

**Memory Card Match** — flip cards to find matching pairs
- _Example features:_ move counter, timer, win animation/confetti

**Drawing Pad** — simple canvas you can sketch on
- _Example features:_ color picker, brush size slider, eraser tool

**Typing Speed Game** — type a passage and measure your words per minute
- _Example features:_ WPM display, accuracy tracker, difficulty levels

**Trivia Quiz** — multiple choice questions with score tracking
- _Example features:_ timer per question, category selector, results summary screen

### Bad Project Ideas (Too Big!)
- Anything with a database — tell Cursor to avoid this
- Anything requiring authentication
- Anything with multiple pages/screens
- Anything that "needs" an API

### Workshop note (how this PRD maps to the rules above)

Phase 1 is still **one deployed page** (SPA): navigation swaps **views** in the DOM—**no separate routes to different HTML files**, **no backend**, **no auth**, **no external APIs**. Data = **static JSON** shipped with the app. That keeps the spirit of the workshop constraints while matching your information architecture.

---

## Phase 1 product specification (your full brief)

### Overview

Build a simple home AI assistant web app that provides a **single interface** for understanding what’s happening in the home. Phase 1 is explicitly a **front-end prototype** with **placeholder modules** for **Energy**, **Security**, and **Climate Control**. These modules **do not** connect to real providers/devices yet; the goal is **information architecture**, **core UX**, and an **extensible structure** so integrations can be added later.

### Problem statement

I want a single assistant-style interface for home understanding, but today data and controls are fragmented across different apps. Before investing in integrations, I want to validate **UX** and **product structure** with a simple web app that:

- Presents a clear **home dashboard**
- Provides **placeholder modules** for key domains (energy, security, climate)
- Supports a **conversational UI pattern** (stubbed/demo data)
- Establishes **scalable navigation + data model** for future connectors

### Phase 1 goal (this PRD)

Deliver a simple web app front end with:

- Placeholder modules: **Energy**, **Security**, **Climate Control**
- **Stubbed/demo data** powering basic charts and example insights
- A basic **chat/assistant UI** that answers a small set of **scripted or templated** questions against the stubbed data

**No** real device/provider connections in Phase 1.

### Goals

- **Validate UX:** dashboard layout, navigation, module structure, assistant interaction pattern
- **Establish extensible boundaries:** modules, data contracts, “connector” interfaces (documented only)
- **Polished demo** that can later be wired to real integrations

### Non-goals (Phase 1)

- Connecting to utilities (e.g., SCE) or devices (Ring/Nest)
- Authentication to third-party providers
- Production-grade analytics, anomaly detection, or optimization
- Automated device control

### Target user

- A **single household resident** (initially) exploring a unified home assistant concept

### Success metrics (Phase 1)

- **Usability:** user can navigate modules and understand what would connect later in **under ~2 minutes**
- **Demo quality:** fast load, cohesive look; placeholder charts/insights render correctly
- **Extensibility:** adding a new placeholder module (e.g., **Air Quality**) is straightforward without redesign

### Core UX (Phase 1)

#### Information architecture

- **Home Dashboard**
- **Modules (placeholders)**
  - Energy (placeholder)
  - Security (placeholder)
  - Climate Control (placeholder)
- **Assistant (chat)**
- **Settings**
  - **Connections** — disabled / “coming soon”
  - **Privacy & data** — copy only

#### Home Dashboard

- **Summary cards** for each module (Energy / Security / Climate)
- **“What’s new”** feed (demo events)
- **Suggested questions** (prompt chips)

#### Module pages (placeholders)

Each module page includes:

- **Header:** what this module will connect to later + **“Coming soon”**
- **Example visualizations** using stubbed data
- **Example insights** (static or computed from stubbed data)
- **CTA:** “Connect in a future phase” (disabled)

**Energy (examples)**

- Daily usage chart (demo)
- Peak hours heatmap (demo)
- Example insight: *“Afternoons are highest usage”*

**Security (examples)**

- Timeline of motion events (demo)
- Example insight: *“Most events happen 2–4pm”*

**Climate Control (examples)**

- Temperature over time (demo)
- HVAC runtime blocks (demo)
- Example insight: *“Runtime spikes on warmer days”*

#### Assistant (chat)

- Chat UI with **suggested prompts**
- Phase 1 behavior: **scripted** and/or **templated Q&A** over stubbed JSON (no LLM API required)
- Answers should feel **grounded** (reference chart/time window shown in the UI)

### Product requirements

#### Functional requirements (Phase 1)

| ID | Requirement |
|----|----------------|
| **FR1** | Web app with navigation: Dashboard, Modules (sub-nav or hub), Assistant, Settings |
| **FR2** | Placeholder module pages for **Energy**, **Security**, **Climate** with **consistent layout** |
| **FR3** | **Stubbed data layer** (static JSON) powering demo charts/widgets |
| **FR4** | Assistant chat UI responding to **predefined prompts** using stubbed data |
| **FR5** | Settings includes **Connections (coming soon)** placeholders |

#### Non-functional requirements (Phase 1)

| ID | Requirement |
|----|----------------|
| **NFR1** | Fast load; **responsive** layout for **laptop-sized** screens |
| **NFR2** | Clear **demo/placeholder** labeling (no implication of live connections) |
| **NFR3** | **Clean component/module structure** for future connector wiring |

### Architecture (Phase 1)

- **Front end:** single-page web app (framework choice open)
- **Data:** local **stubbed JSON** representing unified **home telemetry**
- **Connector interface:** define an **abstract connector contract** (TypeScript types or JSDoc + empty implementations)—**no real integrations yet**

**Suggested conceptual model (stubbed)**

- `Home`
- `ModuleStatus` (per module): `connected: false`, `lastUpdated`, `summary`
- `TimeSeriesMetric`: `metricName`, timestamps, values
- `Event`: `timestamp`, `type`, `sourceModule`, `attributes`

### Future phases (out of scope for Phase 1)

- **Phase 2:** One real data source (likely **Energy** first) via a connector implementation
- **Phase 3:** Second connector (Security or Climate) + cross-domain summaries
- **Phase 4:** Recommendations, guided actions, optional automations with explicit user approval

### Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Placeholder feels “too fake” | Realistic demo data + coherent narratives across modules |
| UI ignores integration constraints | Define **connector contracts** and **data shapes** early (stubbed) |

### Open questions

- **Framework:** vanilla vs. small framework (preference for workshop speed vs. structure)?
- **Assistant:** fully scripted in Phase 1 vs. **lightly data-driven** from stubbed JSON (both OK; second is more extensible)?
- **Visual style:** minimal vs. dashboard-heavy vs. assistant-first?

---

## Base MVP

> Build the minimal working version of your project first.

**Workshop-first slice (~10 minutes — do this first):**

- One **SPA shell**: top nav or tabs (Dashboard | Energy | Assistant | Settings can be **stub links**; only **Dashboard + Energy** need real content first).
- **`data/demo.json`** (or split files) with minimal `ModuleStatus` + one `TimeSeriesMetric` series for energy.
- **Dashboard:** three **summary cards** (Energy live-ish; Security/Climate “offline / coming soon” copy).
- **Energy module view:** one **simple chart** (CSS/bar divs or canvas/svg—keep trivial) + **one insight string** derived from stub data in JS.
- **Assistant:** **prompt chips** + **3–5 canned answers** that reference the **same numbers** shown on screen.

**Full Phase 1 prototype (after the slice works):**

- Complete **Security** and **Climate** placeholder pages (layouts + stub charts + insights).
- **“What’s new”** demo feed on Dashboard.
- **Settings:** Connections (disabled) + Privacy copy-only section.
- **Connector contract** file(s): documented shapes + noop/stub “connector” exports.
- **NFR pass:** placeholder labeling, laptop-responsive layout, cohesive styling.

**What it does NOT include (Phase 1):**

- Real utilities, devices, OAuth, or cloud APIs
- Server-side persistence or database
- Automated control of hardware

---

## Features

> Plan out the features you want to add after the MVP is working. Each feature should be in its own component file to keep things organized.

### Feature 1: Security placeholder module
- **Description:** Module page with motion **event timeline** (demo), summary insight, disabled “Connect” CTA; data from stub JSON.
- **Files to create:** e.g. `base_mvp/js/views/security.js`, extend `data/` schema + `js/charts/` or inline render helpers

### Feature 2: Climate Control placeholder module
- **Description:** Temperature **time series** + **HVAC runtime blocks** (demo) + insight; same layout shell as Energy/Security.
- **Files to create:** e.g. `base_mvp/js/views/climate.js`, stub series in `data/`

### Feature 3: Settings + connector contract scaffolding
- **Description:** Settings view with **Connections (coming soon)** and **Privacy** copy; `js/connectors/types.js` (or `.ts` if you add tooling) documenting the future connector interface; noop `createStubConnector()`.
- **Files to create:** e.g. `base_mvp/js/views/settings.js`, `base_mvp/js/connectors/contract.js`

---

## Success Criteria

**Workshop checklist**

- [ ] MVP runs locally
- [ ] At least one PR merged to the original repo
- [ ] Features work without breaking the base app

**Phase 1 criteria (from your brief)**

- [ ] User can navigate **Dashboard → each module → Assistant → Settings** and understand **what would connect later** quickly
- [ ] Stubbed charts/insights render consistently; **demo/placeholder** labeling is obvious
- [ ] Adding a **new placeholder module** (e.g., Air Quality) is a **small, localized change** (data + one view + nav entry)
