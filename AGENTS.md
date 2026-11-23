# Project AI Agent Skills & Guidelines

This project (`Portfolio 2`) is configured with the **Agentic Awesome Skills** (AAS) library (3,100+ curated AI coding agent skills).

## 🚀 Active Skills (`.agents/skills/`)

A curated set of 37 skills tailored for modern web, interactive design, and portfolio development is currently active:

### 🌟 Portfolio & Visual Design
- `interactive-portfolio` — Procedures for portfolios that land jobs and clients, converting visitors into opportunities.
- `frontend-design` — Production UI layouts, visual harmony, and design systems.
- `ui-ux-pro-max` — Advanced UI/UX workflows and polish.
- `high-end-visual-design` — Premium visual aesthetics and modern web design patterns.
- `scroll-experience` — Interactive scrolling, parallax, and storytelling effects.
- `3d-web-experience` — Three.js, WebGL, and 3D web interactions.
- `canvas-design` — HTML5 Canvas animations and visual effects.
- `algorithmic-art` — Generative art and interactive creative coding.
- `ui-review` — Design audit and visual QA.
- `write-design-md` — Writing clear design specs and documentation.

### 🌐 Frontend & Web Engineering
- `frontend-developer` — Production React, Next.js, and web application architecture.
- `build-ui` — Component-driven interface development.
- `shadcn` — Best practices for shadcn/ui, Radix primitives, and Tailwind styling.
- `tailwind-patterns` — Clean utility-first CSS and responsive design patterns.
- `react-patterns` & `react-best-practices` — Component lifecycles, hooks, and state management.
- `nextjs-app-router-patterns` & `nextjs-best-practices` — App Router, SSR, Server Components, and metadata.
- `typescript-expert` — Type safety, strict configs, and advanced TypeScript patterns.
- `javascript-pro` & `nodejs-best-practices` — Modern JS/Node runtime patterns.
- `frontend-api-integration-patterns` — Fetching, caching, optimistic updates, and error handling.
- `seo-audit` & `form-cro` — Search visibility and conversion rate optimization.
- `ui-states`, `ui-a11y`, `accessibility-compliance-accessibility-audit` — Accessible states, WCAG compliance, screen readers.
- `browser-automation` — Automated browser testing and workflows.

### 🛠️ Core Engineering & Quality
- `concise-planning` — Plan changes systematically before executing.
- `systematic-debugging` — Debug from evidence instead of guessing.
- `test-driven-development` — Red-green-refactor workflow.
- `lint-and-validate` — Code cleanliness, linting, and automated checks.
- `git-pushing` — Safe version control practices.

---

## 🧰 Skill Library & Management

The complete library of **3,100+ skills** is stored locally in `.agents/skills_library/`.

You can view, search, and activate any skill or bundle using the provided helper:

```powershell
# List all active skills
.\activate-skills.ps1 -ListActive

# Search the entire library of 3,100+ skills
.\activate-skills.ps1 -Search "animation"
.\activate-skills.ps1 -Search "portfolio"

# List all editorial bundles (e.g. Web Wizard, Indie Game Dev, Security, Python)
.\activate-skills.ps1 -ListBundles

# Activate a specific bundle
.\activate-skills.ps1 -Bundle "Web Wizard"
.\activate-skills.ps1 -Bundle "AAS Python Development"

# Activate an individual skill from the library
.\activate-skills.ps1 -Skill "framer-motion"

# Reset and replace active skills with a new bundle
.\activate-skills.ps1 -Bundle "Essentials" -Clear
```
