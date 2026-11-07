<p align="center">
  <img src="public/favicon.svg" alt="ClaudeAndVSCode logo" width="96" height="96" />
</p>

<h1 align="center">ClaudeAndVSCode.com</h1>

<p align="center">
  Friendly, practical guides for setting up and getting the most out of <strong>Claude inside Visual Studio Code</strong>.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-animations-e8552f" />
  <img alt="Responsive" src="https://img.shields.io/badge/responsive-mobile%20%7C%20tablet%20%7C%20desktop-f08a24" />
</p>

---

## About

ClaudeAndVSCode.com is an independent community site that helps people get started with AI-assisted coding.
It explains how to install and set up Claude Code in VS Code, gives practical tips, and answers common questions
in plain English.

## Features

- **Home page**
  - Animated header that types itself out
  - Auto-playing carousel you can swipe, with mock VS Code screens
  - Features grid
  - Setup guide with a switch between the VS Code extension and the terminal (CLI), plus copyable commands
  - Pro tips, an FAQ that expands, and a call-to-action banner
- **About page:** why the site exists, a timeline and the site's principles
- **Contact page:** form with validation that opens the visitor's email app, addressed to `hello@claudeandvscode.com`
- **Warm, light design:** a looping video background under a soft cream overlay, with frosted-glass cards
- **Animations:** slide-ins, fade-ins, expanding sections, typing headers and page transitions
- **Fully responsive:** a hamburger menu on mobile and layouts that stack
- **Accessible:** respects the "reduce motion" system setting and uses semantic HTML and ARIA labels
- **Original logo:** code brackets around an animated spark

## Tech stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev/) | UI components |
| [Vite](https://vite.dev/) | Dev server and production build |
| [React Router](https://reactrouter.com/) | Page navigation (`/`, `/about`, `/contact`) |
| [Framer Motion](https://motion.dev/) | Animations and transitions |
| Plain CSS | Styling with CSS variables (no CSS framework) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (includes `npm`)
- [Git](https://git-scm.com/)

### Run it locally

```bash
git clone https://github.com/finxpert88/claudeandvscode.git
cd claudeandvscode
npm install
npm run dev
```

Then open **http://localhost:5173**.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server with live reload |
| `npm run build` | Create an optimised production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
├── public/
│   ├── favicon.svg              # Logo / browser tab icon
│   └── videos/
│       └── warm-abstract.mp4    # Background video
├── src/
│   ├── components/
│   │   ├── Accordion.jsx        # Expanding FAQ
│   │   ├── Carousel.jsx         # Home page carousel + mock screens
│   │   ├── CodeBlock.jsx        # Code snippet with copy button
│   │   ├── Footer.jsx           # Footer + social links
│   │   ├── Icons.jsx            # Social media SVG icons
│   │   ├── Logo.jsx             # Site logo
│   │   ├── Navbar.jsx           # Top navigation + mobile menu
│   │   ├── Reveal.jsx           # Scroll-triggered fade/slide-in wrapper
│   │   ├── TypingText.jsx       # Typewriter effect
│   │   └── VideoBackground.jsx  # Full-screen looping video
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx                  # Routes + page transitions
│   ├── main.jsx                 # Entry point
│   └── styles.css               # All styling and colour theme
├── index.html
├── vite.config.js
├── GITHUB-INSTRUCTIONS.md       # Step-by-step guide to Git & GitHub for this project
└── package.json
```

## Customising

| To change… | Edit |
|---|---|
| Colours and theme | The CSS variables at the top of [`src/styles.css`](src/styles.css) |
| Background video | Replace [`public/videos/warm-abstract.mp4`](public/videos/warm-abstract.mp4) (or change the path in [`VideoBackground.jsx`](src/components/VideoBackground.jsx)) |
| Social media links | The `socials` list in [`src/components/Footer.jsx`](src/components/Footer.jsx) |
| Contact email | `EMAIL` in [`src/pages/Contact.jsx`](src/pages/Contact.jsx) and the links in [`Footer.jsx`](src/components/Footer.jsx) |
| Carousel slides | The `slides` list in [`src/components/Carousel.jsx`](src/components/Carousel.jsx) |
| Setup steps, tips and FAQ | The lists at the top of [`src/pages/Home.jsx`](src/pages/Home.jsx) |

## Working with Git & GitHub

New to Git? See **[GITHUB-INSTRUCTIONS.md](GITHUB-INSTRUCTIONS.md)** for a beginner-friendly guide to committing,
pushing and pulling changes. The short version:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

## Deployment

The site builds to static files (`npm run build` → `dist/`), so it can be hosted for free on services like
Vercel, Netlify or Cloudflare Pages. See
[section 7 of GITHUB-INSTRUCTIONS.md](GITHUB-INSTRUCTIONS.md#7-optional-making-the-site-live-on-the-internet).

## Contact

Questions, ideas or corrections: **[hello@claudeandvscode.com](mailto:hello@claudeandvscode.com)**

## Credits

- Background video: ["Abstract Orange Background"](https://mixkit.co/free-stock-video/abstract-orange-background-101021/)
  from [Mixkit](https://mixkit.co/), used under the Mixkit Free License.
- Fonts: [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via Google Fonts.

## Disclaimer

ClaudeAndVSCode.com is an independent community project and is **not affiliated with, endorsed by, or sponsored by
Anthropic or Microsoft**. "Claude" is a trademark of Anthropic, and "Visual Studio Code" is a trademark of Microsoft.

---

<p align="center">© 2026 ClaudeAndVSCode.com. All rights reserved.</p>
