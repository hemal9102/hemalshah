# AEO & GEO Strategy Guide (Hemal Shah Portfolio)

This document outlines the theory, architecture, and changes made to optimize the Hemal Shah portfolio for Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and standard SEO.

## 1. The Hidden "Who Am I" Page (`whoami.html`)
Inspired by elite executive profiles (like Rajput Bhavin's `about-ceo`), we created a deeply technical and personal hidden page (`whoami.html`).

### Why is it "hidden"?
- It is intentionally excluded from the main navigation menus (`index.html`, `about.html`, etc.).
- This prevents casual visitors from cluttering their user journey, while acting as a highly professional "secret CV" to send directly to $10k+ enterprise leads.

### Why is it indexable? (`index, follow`)
- Despite being visually hidden, the page contains the meta tag: `<meta name="robots" content="index, follow" />`.
- This ensures that Google bots, ChatGPT Web Browsers, and Perplexity AI crawlers can still find, crawl, and ingest the page.
- When an AI engine scans the web for "Freelance Python AI Engineer in Ahmedabad", it can secretly read this page to gain deep context about Hemal's skills.

## 2. Massive JSON-LD Schema (FAQPage)
We injected a massive `application/ld+json` script tag into the `<head>` of `whoami.html`.

### The Theory:
- **AEO (Answer Engine Optimization):** Generative AI engines (ChatGPT, Gemini, Perplexity) rely heavily on structured data to parse facts. By wrapping Hemal's tech stack (FastAPI, Supabase, pgvector, Docker) and personal philosophy (Bodybuilding, Stoicism) into a precise `FAQPage` schema, we spoon-feed the exact answers to the AI.
- Instead of forcing the AI to guess the context from random HTML `div` tags, it instantly maps Questions to Answers.
- **Result:** If a client asks an AI, "How does Hemal Shah handle web scraping?", the AI directly references the JSON-LD answer: "He deploys high-velocity headless browser scraping pipelines using Playwright, Puppeteer, and httpx."

## 3. WebP Image Optimization
All personal images uploaded in `.jpeg` and `.png` formats were programmatically converted to highly compressed `.webp` formats (`photo1.webp`, WhatsApp screenshots).
- **Core Web Vitals:** Google ranks fast-loading sites higher. `.webp` formats reduce image payload size by up to 80% without losing quality, ensuring the portfolio loads instantly on mobile devices.

## 4. Reverting the Gallery for Clean UI
We initially created a `gallery.html` but reverted those changes in favor of keeping the main site highly focused on professional SaaS work. The personal photos were strategically moved to the `whoami.html` hidden page to maintain maximum professional legitimacy without breaking the core UX of the landing pages.

## Summary of Commits
- Added `whoami.html` with deep-dive technical FAQ and JSON-LD schema.
- Converted personal images to `.webp` and moved to `assets/gallery/`.
- Updated `about.html` and `index.html` to keep the gallery structure clean and hidden.
- Allowed global AI indexing for maximum Generative Engine visibility.
