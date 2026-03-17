# Product Requirements Document (PRD)

> **Instructions:** This is your project specification. Fill in the sections below to define what you're building.

---

## Project Overview

**Project Name:** Pythagoras Practice

**One-line Description:** A simple website that serves random right-triangle problems so a learner can practise finding the missing side using the Pythagorean theorem (a² + b² = c²).

**Type:** Web App — **Node.js** with **Express** and **EJS** (server-rendered HTML, no separate frontend framework).

**Audience:** 13-year-old practising the “Pythagoras algorithm” (identify which sides are legs vs hypotenuse, apply a² + b² = c², compute the missing length).

---

## Guidelines

### Keep It Small!
- Your MVP should be buildable in **10 minutes**
- Think "proof of concept" not "production ready"
- If it sounds ambitious, make it simpler
- **Use Cursor to help you plan this!**
- This exercise is about learning the git flow and understanding where Cursor's features fit into the SDLC

### Scope choices for this project
- **No database** — problems generated on the server each request; optional in-memory session later for a streak (stretch).
- **No login** — single learner on the machine is enough.
- **Minimal pages** — one main practice screen (EJS template); optional tiny “how it works” blurb on the same page.

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

---

## Base MVP

> Build the minimal working version of your project first.

**What the MVP includes:**
- **Express** app in `base_mvp/` with `ejs` as the view engine.
- **GET /** — Renders one EJS page with a **single practice problem** per load:
  - e.g. “Legs are 3 and 4. What is the hypotenuse?” **or** “One leg is 5, hypotenuse is 13. What is the other leg?”
  - Use **integer Pythagorean triples** (3-4-5, 5-12-13, 6-8-10, …) so answers are whole numbers and friendly for a 13-year-old.
- **POST /** (or POST `/check`) — User submits their numeric answer; server compares to the correct value (with small tolerance if you use floats); EJS shows **Correct** or **Try again** and can show the **next** problem on the same page (new GET or redirect).
- Very short on-page hint: **c is always the longest side (hypotenuse); legs are a and b.**

**What it does NOT include (stretch goals):**
- User accounts, leaderboard, or database
- Timed mode, difficulty levels, or “streak” (unless you add simple `express-session` later — still no DB)
- Fancy animations; focus on clear numbers and feedback first

---

## Features

> Plan out the features you want to add after the MVP is working. Each feature should be in its own component file to keep things organized.

### Feature 1: Problem variety
- **Description:** Mix question types: (1) two legs → hypotenuse, (2) one leg + hypotenuse → other leg. Optional: shuffle which variable is “unknown.”
- **Files to create:** e.g. `lib/problems.js` — functions that return `{ questionText, answer, type }`.

### Feature 2: Gentle learning mode
- **Description:** Optional checkbox “Show formula on page” (a² + b² = c²) and one worked mini-example in EJS partial.
- **Files to create:** e.g. `views/partials/help.ejs`, query flag or form toggle.

### Feature 3: Session streak (no database)
- **Description:** Count consecutive correct answers in session; show “Streak: 3” on the page.
- **Files to create:** `express-session` in `server.js` / `app.js`; pass `streak` into EJS.

---

## Success Criteria

- [ ] MVP runs locally (`node` + Express; open browser, solve a few problems)
- [ ] At least one PR merged to the original repo
- [ ] Features work without breaking the base app

---

## Suggested `base_mvp` layout (for Cursor)

```
base_mvp/
├── package.json          # express, ejs
├── server.js             # or app.js — listen, routes
├── views/
│   └── index.ejs         # problem + form + feedback
└── lib/
    └── problems.js       # generate triple-based questions (optional for MVP; can inline first)
```
