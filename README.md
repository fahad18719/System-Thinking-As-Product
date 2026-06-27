System Entanglement Scanner
By Fahad Najam · Silicon & Soul  
© 2026 Fahad Najam Consulting
A self-diagnostic tool that helps people measure how much energy is being consumed by inherited social contracts — family, relationships, culture, and internal conditioning.
No backend. No tracking. No framework dependencies. Drops into any static host in under a minute.
---
File structure
```
system-scanner/
├── index.html        # Entry point
├── css/
│   └── style.css     # All styles
└── js/
    ├── questions.js  # Question data, tier labels, insight copy
    └── scanner.js    # Rendering, state, scoring, results
```
---
Deploy options
GitHub Pages (simplest)
Push this folder to a GitHub repository
Go to Settings → Pages
Set source to `main` branch, root folder
Your URL: `https://yourusername.github.io/your-repo-name`
Drop into existing site
Copy the three files maintaining the folder structure, link to `index.html` from wherever you want.
Netlify / Vercel
Drag and drop the `system-scanner` folder into the Netlify deploy UI. Done.
---
Customization
Change the questions
Edit `js/questions.js`. Each phase has an `id`, `label`, `color`, and array of `questions`. Each question has:
```js
{
  id: 'q1',           // unique, no spaces
  text: '...',        // the question
  sub: '...',         // scale description shown below
  low: '...',         // left label (score = 0)
  high: '...'         // right label (score = 10)
}
```
Adding or removing questions will auto-adjust scoring — the max is always `phases × questions_per_phase × 10`.
Change tier labels
Edit the `TIERS` array in `questions.js`. Each tier has a `max` (percentage ceiling), `label`, and `desc`.
Change branding
Site name and byline: `index.html` header section
Footer link: `index.html` footer
Colors: CSS variables at the top of `style.css`
Fonts: swap the Google Fonts import in `index.html` and update `--font-display` / `--font-body`
Phase accent colors
Each phase has a `color` hex in `questions.js` used for the breakdown bars. Change freely.
---
What the score means
The tool scores 0–100% entanglement based on the sum of all slider values divided by the theoretical maximum. The inverse (100 − score) is displayed as "available energy."
Tiers:
0–25% → Clear signal
26–45% → Some drag
46–65% → Significant pull
66–80% → Deep entanglement
81–100% → Maximum gravity
The heaviest-scoring phase drives the primary insight card shown in results.
---
No dependencies
No npm, no build step, no bundler
Google Fonts loaded via CDN (optional — remove the `<link>` tags and update font variables if you want zero external calls)
Works offline after first load if fonts are cached
---
License
© 2026 Fahad Najam Consulting. All rights reserved.  
Tool may be shared freely. Do not remove attribution.
