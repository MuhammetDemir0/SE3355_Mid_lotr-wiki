# LOTR Wiki

A comprehensive Lord of the Rings web encyclopedia built with React, Tailwind CSS, and The One API.

## Features

- Books library with chapter lists and detail pages
- Characters database with search, race filtering, and pagination
- Movies catalog with detail pages and quote sections
- Interactive mixed quiz (quotes, release-year facts, and character photos)
- Middle-earth map page with region significance notes
- Responsive, modern UI for desktop and mobile

## Tech Stack

- React (Create React App)
- React Router DOM
- Tailwind CSS
- The One API (https://the-one-api.dev)
- Testing Library + Jest

## Project Structure

```text
lotr-wiki/
+�� public/
-   +�� index.html
-   +�� manifest.json
-   L�� ...
+�� src/
-   +�� components/
-   -   +�� Navbar.jsx
-   -   +�� SearchBar.jsx
-   -   +�� CharacterCard.jsx
-   -   L�� LoadingSpinner.jsx
-   +�� pages/
-   -   +�� Home.jsx
-   -   +�� BooksList.jsx
-   -   +�� BookDetail.jsx
-   -   +�� CharactersList.jsx
-   -   +�� CharacterDetail.jsx
-   -   +�� MoviesList.jsx
-   -   +�� MovieDetail.jsx
-   -   +�� Quiz.jsx
-   -   L�� MiddleEarthMap.jsx
-   +�� services/
-   -   L�� lotrService.js
-   +�� App.js
-   +�� index.js
-   L�� ...
+�� package.json
+�� tailwind.config.js
L�� postcss.config.js
```

## Setup and Run

### Requirements

- Node.js 14+
- npm

### Install dependencies

```bash
npm install
```

Optional: create a `.env` file from `.env.example` and set `REACT_APP_LOTR_API_KEY` if you want live The One API requests.

### Start development server

```bash
npm start
```

### Run tests

```bash
npm test -- --watchAll=false
```

### Build for production

```bash
npm run build
```

## Main Pages

- Home: project overview and quick navigation
- Books: list of books and chapter details
- Characters: searchable/filterable character listings with detail pages
- Movies: film listings with production stats and quote highlights
- Quiz: 10-question mixed challenge with scoring and result feedback
- Map: static Middle-earth map with lore summaries

## API Endpoints Used

- GET /book
- GET /book/{id}
- GET /book/{id}/chapter
- GET /character
- GET /character/{id}
- GET /character/{id}/quote
- GET /movie
- GET /movie/{id}
- GET /movie/{id}/quote

## Notes

- The app includes fallback/mock data so pages remain usable when API requests fail.
- Ensure API access rules and token handling match your deployment environment.

## Author

Muhammet Demir
