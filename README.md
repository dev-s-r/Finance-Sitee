# WealthLab — Financial Calculators

A modern, fully static financial calculator platform built with **React + Vite + Tailwind CSS**, deployed on GitHub Pages.

## Features

- **7 Calculators**: SIP, EMI, FD, Lumpsum, CAGR, Inflation Impact, Savings Goal
- **Dark Mode Default** with light mode toggle
- **Real-time calculations** — updates as you move sliders
- **Interactive charts** powered by Recharts
- **LocalStorage** — saves your inputs across sessions
- **Mobile-first** responsive design
- **No backend** — fully static, GitHub Pages ready

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Recharts
- Lucide React (icons)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## GitHub Pages Deployment

The app is configured with base path `/Finance-Site/` in `vite.config.js`.

```bash
npm run deploy
```

Or use GitHub Actions to auto-deploy the `dist/` folder.

## Project Structure

```
Finance-Site/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CalculatorCard.jsx
│   │   ├── CalculatorLayout.jsx
│   │   ├── InputSlider.jsx
│   │   ├── InputField.jsx
│   │   ├── ResultCard.jsx
│   │   ├── ChartComponent.jsx
│   │   └── InsightBox.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SIPCalculator.jsx
│   │   ├── EMICalculator.jsx
│   │   ├── FDCalculator.jsx
│   │   ├── LumpSumCalculator.jsx
│   │   ├── CAGRCalculator.jsx
│   │   ├── InflationCalculator.jsx
│   │   └── SavingsGoalCalculator.jsx
│   ├── utils/
│   │   ├── format.js
│   │   ├── localStorage.js
│   │   └── calculators/
│   │       ├── sipCalculator.js
│   │       ├── emiCalculator.js
│   │       ├── fdCalculator.js
│   │       ├── lumpSumCalculator.js
│   │       ├── cagrCalculator.js
│   │       ├── inflationCalculator.js
│   │       └── savingsGoalCalculator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Disclaimer

This project is for educational purposes only and should not be relied upon for financial decisions.

## License

MIT License
