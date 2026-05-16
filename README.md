# MBJ Global Pvt. Ltd. — Enterprise B2B Portal

A premium, high-performance corporate B2B web application engineered for **MBJ Global Pvt. Ltd.** Designed to facilitate international trade, private label partnerships, and institutional sourcing across global markets.

---

## 🏛️ Architecture & Key Features

- **Modern UI/UX Design System**: Built with an elegant corporate aesthetic utilizing curated color palettes (`Agro Green`, `Golden Wheat`, `Corporate Navy`) and sophisticated glassmorphism backdrop-filter effects.
- **Advanced Animation Choreography**: Features custom, synchronized two-step animation engines for both company tab switching and product category filtering, ensuring silky smooth transitions with zero layout shift or DOM jumping.
- **Interactive Global Reach Map**: Incorporates a mathematically calibrated equirectangular map projection with responsive aspect-ratio locking (`2 / 1`) to guarantee absolute geographical accuracy for international trade markers (India, UK, UAE, Singapore).
- **Enterprise Inquiry Engine**: Fully interactive lead generation form equipped with instant accessibility feedback (`aria-busy`), simulated asynchronous processing, and smooth success confirmation states.
- **Fully Responsive**: Optimized for seamless navigation across all viewports, featuring a dedicated slide-down mobile navigation menu and touch-friendly interactive components.

---

## 📁 Project Structure

```text
mbj-trade-frontend/
├── index.html       # Semantic HTML5 single-page application markup
├── styles.css       # Vanilla CSS3 styling, design tokens, and keyframe animations
├── script.js        # Vanilla JavaScript logic, event handling, and animation choreography
└── README.md        # Technical documentation and project overview
```

---

## 🛠️ Technology Stack

- **Core**: HTML5 & Vanilla JavaScript (ES6+). No heavy framework overhead.
- **Styling**: Vanilla CSS3 with custom CSS variables, Flexbox/Grid layouts, and responsive media queries.
- **Typography**: Hosted Google Fonts (*Inter* for clean UI readability, *Playfair Display* for premium editorial headers).
- **Iconography**: Lucide Icons dynamically rendered via CDN for crisp, scalable vector graphics.

---

## 🚀 Local Development & Preview

The application is fully static and requires no complex build pipelines or package installations.

### Option 1: Direct File Inspection
Open `index.html` directly in any modern web browser.

### Option 2: Local HTTP Server (Recommended)
To preview with full network feature simulation, run a lightweight local HTTP server from the root directory:

```bash
# Using Python 3
python -m http.server 4173

# Using Node.js (npx)
npx serve .
```

Then navigate to:
```text
http://localhost:4173/
```

---

## 📄 License & Copyright

&copy; 2026 MBJ Global Pvt. Ltd. All Rights Reserved. Confidential and proprietary enterprise software.
