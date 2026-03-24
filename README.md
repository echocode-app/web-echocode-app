# web-echocode-app

Reskin of the Echocode website built with **Next.js**.
Production domain: [https://echocode.app/](https://echocode.app/)

---

## Live Environments

### 1️⃣ Static Export (SSG-only)

GitHub Pages deployment from `main` branch:

[https://echocode-app.github.io/web-echocode-app/](https://echocode-app.github.io/web-echocode-app/)

* `next build`
* `next export`
* Fully static (no server runtime)
* Suitable for preview / static hosting

---

### 2️⃣ Dynamic Deployment (SSR)

Vercel deployment from `vercel-experiment` branch:

[https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)

* Full **Next.js SSR**
* Supports dynamic routes
* Server-side rendering
* API routes (if enabled)
* Recommended environment for production-like behavior

---

## Tech Stack

* **Next.js**
* React
* TypeScript
* TailwindCSS
* App Router architecture
* Static Export (SSG) support
* SSR-ready configuration

---

## 🌍 Production Domain

Main domain:

[https://echocode.app/](https://echocode.app/)

Production runs on Vercel infrastructure with full SSR support.

---

## 🚀 Branch Strategy

| Branch              | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `main`              | Static export build for GitHub Pages (SSG-only) |
| `vercel-experiment` | Dynamic SSR build for Vercel deployment         |

---

## Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Static export:

```bash
npm run build
npm run export
```

---

## 📌 Notes

* `main` branch must remain compatible with static export.
* Dynamic features should be tested in `vercel-experiment`.
* SSR-only logic should not break static build compatibility unless explicitly intended.

---

## Analytics Integration Docs

- English: [docs/analytics-echocode-app.en.md](/Users/annakotlyar/Desktop/projects/web-echocode-app/docs/analytics-echocode-app.en.md)
- Ukrainian: [docs/analytics-echocode-app.uk.md](/Users/annakotlyar/Desktop/projects/web-echocode-app/docs/analytics-echocode-app.uk.md)
