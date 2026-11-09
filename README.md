# Game backlog

Track what you're playing, what you've finished, and what's waiting in the pile.

## Features

- Three lists: Playing, Backlog, Completed, with live counts
- Cover images by URL, with a generated cover when there is none
- 1 to 5 star ratings, playtime in hours (with a +1 h quick log), and notes
- Search, platform and minimum-rating filters, and sorting
- Your library is saved in the browser (localStorage), so there is no backend

## Stack

React 19, TypeScript, Vite, ESLint. State uses Context + `useReducer` with a typed action union.

## Run it

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

1. Push this project to a GitHub repository whose default branch is `main`.
2. In the repository, open Settings, then Pages, and set Source to **GitHub Actions**.
3. Every push to `main` builds and deploys the site (see `.github/workflows/deploy.yml`).

## How it's organised

- `src/types.ts` holds the `Game` type, statuses and platforms.
- `src/context/` holds the reducer, the context and the provider that saves to localStorage.
- `src/filters.ts` holds `applyFilters`, a pure function that is easy to unit test.
- `src/components/` holds the UI. `GameCard` is memoized and receives `dispatch` as a prop.

## Ideas for next

- Search games and fetch covers from a public games API
- Export and import the library as JSON
- Tests with Vitest and React Testing Library
