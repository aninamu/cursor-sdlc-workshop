# Product Requirements Document (PRD)

## Soft Girl Era Wellness Deals — Map Discovery Web App

**Version:** 1.0  
**Last updated:** April 2026  
**Document type:** PRD for a simple consumer web application

---

## 1. Executive summary

**Product name (working):** Soft Girl Era Wellness Deals (internal shorthand: “SG Deals”)

**One-line description:** A lightweight web app that uses the visitor’s current location to surface nearby workout-class and wellness-treatment deals—especially first-time and seasonal offers—aimed at people in their “soft girl era,” and displays those offers on an interactive map.

**Product type:** Responsive web app (mobile-first). No native apps in v1.

**Core value:** Reduce friction from “I want to treat myself” to “here’s what’s near me, with a real deal,” in a calm, aesthetic-first experience—not a generic coupon aggregator.

---

## 2. Problem statement

People exploring wellness (pilates, restorative movement, matcha or tea rituals, massage, facials, and similar services) often:

- Miss **intro offers**, **first-visit** pricing, and **limited-time** promotions because they are scattered across studio sites, email lists, and social posts.
- Want results **near where they are now**, not city-wide lists that require mental filtering.
- Prefer **map-based discovery** when comparing distance vs. vibe vs. offer.

The product addresses discovery and **deal awareness** for a specific lifestyle framing (“soft girl era”)—gentle, intentional self-care—without requiring accounts for the first version.

---

## 3. Goals and non-goals

### 3.1 Goals

| Goal | Measure (v1) |
|------|----------------|
| Location-aware discovery | User can allow location and see pins within a configurable radius |
| Deal relevance | List + map emphasize first-time, seasonal, and limited promos where data exists |
| Map-first UX | Default or co-primary view is a map with selectable pins |
| Trust & clarity | Each pin/summary shows venue name, category, deal summary, distance, and link or CTA |

### 3.2 Non-goals (v1)

- User accounts, saved favorites sync, or social login
- In-app booking or payment
- Guaranteed real-time inventory (studios change schedules; app shows **best-effort** offers)
- Full coverage of every city worldwide on day one

---

## 4. Target audience

**Primary:** Adults (18–45) who identify with or enjoy the “soft girl” aesthetic—prioritizing gentle routines, mindful movement, skincare, and small rituals—and who are deal-conscious but not price-only shoppers.

**Secondary:** Visitors to a city looking for a single wellness or class experience with a promo.

**Assumptions:** Users are comfortable granting **browser geolocation** (with a clear fallback if denied).

---

## 5. User stories

1. **As a user**, I want to **see deals near my current location** so I can choose something I can actually get to today.
2. **As a user**, I want **workout classes** (e.g., pilates, barre, yoga) and **wellness treatments** (e.g., massage, facial, body treatments) in one place so I don’t juggle multiple apps.
3. **As a user**, I want **first-time / seasonal / limited** offers called out so I don’t miss intro pricing.
4. **As a user**, I want a **map view** with pins I can tap to see deal summaries and open details or the venue link.
5. **As a user**, if I **deny location**, I want to **enter a neighborhood or city** (text search or map center) so the app still works.

---

## 6. Functional requirements

### 6.1 Location

- **FR-L1:** Request coarse or precise geolocation via browser API after user action (e.g., “Find deals near me”), not silently on load.
- **FR-L2:** If permission is denied or unavailable, support **manual place search** (city, neighborhood, or address) to center the map.
- **FR-L3:** Display approximate **distance** from the user’s resolved point to each result (e.g., miles/km).

### 6.2 Deal discovery and categories

- **FR-D1:** Support a **taxonomy** of categories with examples:
  - **Movement / classes:** pilates, yoga, barre, dance-based fitness, stretching / mobility (labels configurable).
  - **Wellness / treatments:** massage, facials, body treatments, acupuncture (if in scope), **matcha or tea ceremony** experiences when listed as bookable experiences.
- **FR-D2:** Tag deals with **deal types**, including at minimum:
  - First-time / new client
  - Seasonal / holiday
  - Limited-time / expiring
  - Intro package / trial class (where applicable)
- **FR-D3:** Allow **filtering** by category and deal type (simple toggles or chips in v1).
- **FR-D4:** Show **expiration or validity** when known (date range or “through [date]”).

### 6.3 Map view

- **FR-M1:** Render results as **pins** on a map; clustering optional for dense areas (nice-to-have).
- **FR-M2:** Selecting a pin opens a **card** or **side panel** with: name, category, deal headline, distance, and primary CTA.
- **FR-M3:** Map **recenters** when the user changes location or search.
- **FR-M4:** Respect **reduced motion** preferences where the map library allows (no gratuitous animation).

### 6.4 Supplementary list view (recommended)

- **FR-S1:** Provide a **list sorted by distance** (default) with the same cards as the map detail for consistency.
- **FR-S2:** Sync selection between list and map when feasible (selecting list item highlights pin).

---

## 7. Content and data strategy

Deal data in v1 typically comes from one or a combination of:

- **Partner or curated feed** (CSV/JSON maintained by the team)—fastest path for demos and pilots.
- **Third-party places APIs** (e.g., business listings) plus **manual deal overlay**—better coverage, more integration work.
- **Affiliate or aggregator APIs** where terms allow—requires legal review.

**Requirement:** The PRD assumes **structured records** with at least: `id`, `title`, `venue_name`, `lat`, `lng`, `categories[]`, `deal_types[]`, `headline`, `terms_summary`, `valid_through` (optional), `source_url`, `distance` (computed).

**“Soft girl era” positioning** is primarily **UX copy, imagery, and filtering defaults** (e.g., prioritizing restorative categories)—not a hard algorithmic classifier in v1 unless explicitly scoped.

---

## 8. Non-functional requirements

| Area | Requirement |
|------|-------------|
| **Privacy** | Explain what location is used for; no selling of location data; minimize retention of precise coordinates server-side if a backend is added |
| **Performance** | Initial interactive map within a few seconds on mid-tier mobile on 4G (target, to be validated) |
| **Accessibility** | Keyboard-accessible list; map alternatives (list-first path); sufficient contrast for text |
| **Security** | No injection of unsanitized HTML in deal copy; sanitize or render as plain text / safe components |

---

## 9. MVP scope (suggested)

**In scope**

- Geolocation + fallback manual search
- One metro or **seed dataset** of real or realistic demo deals
- Category + deal-type filters
- Map + list with shared detail pattern
- External link for booking or venue site

**Out of scope for MVP**

- Accounts and persistence across devices
- Push notifications
- Payments

---

## 10. Success metrics (initial)

- **Activation:** % of sessions where location or manual search succeeds
- **Engagement:** average pins opened per session; filter usage
- **Outcome proxy:** outbound clicks to venue or booking URLs (“CTA clicks”)

---

## 11. Open questions

1. **Data source of truth** for v1: curated only vs. API + curation?
2. **Geographic launch** (single city vs. multi-city): affects clustering and performance.
3. **Legal:** wording for “deal” when prices are indicative; affiliate disclosures if applicable.
4. **Matcha ceremony** availability is niche—confirm whether to merge under “tea / ritual experiences” or separate filter.

---

## 12. Glossary

- **Soft girl era:** Product positioning—gentle, intentional, aesthetic-forward self-care; not a technical system component.
- **Deal types:** Tags such as first-time customer, seasonal promotion, limited-time offer.
- **Wellness treatments:** Services typically booked by appointment (massage, facial, etc.), as distinguished from drop-in classes.

---

## Document history

| Version | Date | Notes |
|---------|------|--------|
| 1.0 | 2026-04-14 | Initial PRD for new `projects/soft-girl-era-wellness-deals/` app concept |
