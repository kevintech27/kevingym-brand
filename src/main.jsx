import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';

const container = document.getElementById('root');

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// The eight routes ship prerendered (see scripts/prerender.js), so the markup
// is already in the document and React attaches to it instead of rebuilding
// it. Calling createRoot on prerendered markup would work, but it throws the
// server output away and repaints, which is a visible flash on the first
// screen.
//
// The fallback branch is not dead code: `npm run dev` serves an empty root,
// and so does spa-fallback.html for any unmatched URL.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
