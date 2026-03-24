# web-echocode-app

[Українська версія](./README.uk.md)

Static production site: [https://www.echocode.app/](https://www.echocode.app/)  
Dynamic Next.js preview: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)

## Project context

This repository contains two aligned delivery modes for the same Echocode website:

- `main` is the static hosting branch for Namecheap.
- `vercel-experiment` is the dynamic Next.js branch for Vercel.

The UI and product behavior should stay aligned between both branches.  
The difference is the runtime model:

- `main` is kept compatible with static export and manual hosting upload.
- `vercel-experiment` is kept compatible with standard Next.js runtime behavior on Vercel.

## Live environments

- Static production: [https://www.echocode.app/](https://www.echocode.app/)
  This is the Namecheap-hosted version built from the static branch flow.
- Dynamic preview: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)
  This is the Vercel deployment for the dynamic Next.js environment.

## Quick setup

- Node `20.x`
- npm `10+`

## Main commands

- `npm run dev` - start the local Next.js app
- `npm run lint` - run ESLint validation
- `npm run typecheck` - run TypeScript validation
- `npm run build` - create the production build for the current branch mode
- `npm run check` - required validation before merge or manual deploy (`lint + typecheck + build`)

## Branch roles

### `main`

- Static branch for Namecheap hosting
- Must remain compatible with static export behavior
- Live domain: [https://www.echocode.app/](https://www.echocode.app/)
- No automatic deploy is configured
- Deployment is manual: build the static output and upload it to hosting by hand

### `vercel-experiment`

- Dynamic Next.js branch for Vercel
- Keeps the natural Next.js runtime model
- Preview URL: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)
- Useful for validating behavior that should run in a standard Next.js environment

## Deployment notes

### Namecheap / static hosting

- Use `main` for the static hosting flow
- Build with the production `NEXT_PUBLIC_*` environment variables
- Upload the generated static build to hosting manually
- Automatic deploy to Namecheap is not configured

### Vercel / dynamic hosting

- Use `vercel-experiment`
- Deploy through the standard Next.js/Vercel runtime
- Keep runtime-specific behavior here if it should not affect the static branch

## Working rule for both branches

- Visual output should stay consistent between `main` and `vercel-experiment`
- Functional behavior should stay consistent unless the hosting model requires a branch-specific implementation detail
- Static-only compromises belong in `main`
- Dynamic-only runtime behavior belongs in `vercel-experiment`

## Pre-merge checklist

1. `git pull`
2. Install dependencies if needed
3. Make the change
4. If `package.json` changed, update `package-lock.json`
5. Run `npm run check`
6. Review branch-specific implications for static vs dynamic hosting
