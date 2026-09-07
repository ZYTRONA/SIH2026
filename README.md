# 🧭 POLARIS AI — Polar Adaptive Route Intelligence System
### Smart India Hackathon 2026 | Antarctic Maritime Navigation Decision Support

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![IMO Polar Code](https://img.shields.io/badge/IMO_POLARIS-PC1--PC7_Compliant-10B981?style=flat-square)](https://www.imo.org/)
[![Status](https://img.shields.io/badge/Build-Passing_0_Errors-brightgreen?style=flat-square)]()

---

## 📌 Executive Summary

**POLARIS AI** is an advanced polar navigation intelligence platform engineered to ensure the safe, fuel-efficient, and regulatory-compliant passage of research and supply vessels across the Southern Ocean and Antarctic waters (e.g., between Cape Town, Southern Ocean corridors, and Bharati / Maitri Antarctic Research Stations).

By fusing **spaceborne SAR satellite data**, **high-resolution hydrodynamic models**, **spatiotemporal sea-ice AI forecasting**, and **multi-objective evolutionary pathfinding**, POLARIS AI provides navigators with explainable, real-time tactical decision support in extreme high-latitude operational environments.

---

## 🚀 Key Functional Modules

```
POLARIS AI Command Deck
├── 🛰️ Mission Control Dashboard     (/dashboard)
├── 🗺️ Mission & Voyage Planner       (/mission-planner)
├── ❄️ Sea-Ice Forecast Center        (/sea-ice)
├── 🧊 Iceberg Intelligence & Drift   (/icebergs)
├── ⚠️ Antarctic Risk Intelligence     (/risk)
├── 🧭 Route Optimization Center       (/routes)
├── 🧠 Explainable AI (XAI)           (/explainability)
├── 🌐 Antarctic Digital Twin         (/digital-twin)
└── 🖥️ System Status & Edge Sync      (/system)
```

### 1. Mission Control Dashboard (`/dashboard`)
- **6 Real-Time Telemetry KPIs**: Risk Index Outcome (RIO), Ice Concentration, Nearest Iceberg Distance, Wind/Swell Vectors, Fuel Consumption Rate, and Route ETA.
- **Polar Stereographic Tactical Map**: Dynamic visualization centered on high-latitude Antarctic coordinates (EPSG:3031) with smooth pan/zoom and vector overlays.
- **72-Hour Environmental Dynamics Forecast**: Live multi-series Recharts graph tracking ice concentration, RIO safety margins, and wave height.
- **Active Hazard Alerts Queue**: Color-coded maritime notices prioritizing immediate incursion risks.

### 2. Mission & Voyage Planner (`/mission-planner`)
- **Vessel & Polar Code Configuration**: Supports *Research Vessel Alpha*, *Polar Research Vessel*, and *Ice-Class Supply Vessel* across **PC1 through PC7** ice-class capabilities.
- **Dynamic Waypoint Selection**: Configurable origin and destination coordinates (e.g., Southern Ocean `60.10°S, 58.20°E` to Bharati Station `69.41°S, 76.19°E`).
- **Multi-Stage AI Computation Pipeline**: Interactive 4-stage pipeline visualization (*Data Ingestion → Spatiotemporal Forecasting → Risk Assessment → Pareto Optimization*).

### 3. Sea-Ice Forecast Center (`/sea-ice`)
- **Temporal Forecast Scrubber**: Instant toggling across `Current`, `+24h`, `+48h`, `+72h`, and `+7 Days`.
- **ResUNet v3.2 Spatiotemporal Model**: Predicts sea-ice concentration (SIC %), ice thickness, and drift convergence/divergence.
- **Uncertainty Quantification**: Recharts chart displaying predicted concentration trends alongside 90% confidence intervals.

### 4. Iceberg Intelligence & Drift Tracking (`/icebergs`)
- **Comprehensive 32+ Iceberg Database**: Tracked via Sentinel-1 Synthetic Aperture Radar (SAR) and optical imaging.
- **Lagrangian + XGBoost Trajectory Modeling**: Predicts 72-hour drift vectors considering surface currents, Coriolis force, and wind shear.
- **Target Lock & Incursion Warnings**: Deep-dive side panel (e.g., target `IB-023` — length 1.8 km, velocity 0.42 m/s, collision probability 7.4%).

### 5. Antarctic Risk Intelligence (`/risk`)
- **IMO POLARIS Standard Implementation**: Calibrated Risk Index Outcome (RIO) calculation:
  $$\text{RIO} = \sum (C_i \times \text{RIV}_i)$$
- **5-Tier Risk Scale**: `0–20 SAFE` (Emerald), `20–40 LOW` (Cyan), `40–60 MODERATE` (Amber), `60–80 HIGH` (Orange), `80–100 CRITICAL` (Rose).
- **Interactive Multi-Layer Risk Toggle**: Individual filtering of *Sea-Ice Risk*, *Iceberg Risk*, *Weather Risk*, *Ocean Risk*, and *Bathymetry Risk*.

### 6. Route Optimization Center (`/routes`)
- **4 Distinct Candidate Routes**:
  - 🛡️ **SAFE ROUTE**: `1,342 km` | `45h 12m` | `88.2 m³ fuel` | `Risk: 12 / 100`
  - ⚡ **FASTEST ROUTE**: `1,214 km` | `38h 40m` | `84.7 m³ fuel` | `Risk: 41 / 100`
  - ⛽ **FUEL EFFICIENT ROUTE**: `1,280 km` | `42h 10m` | `79.4 m³ fuel` | `Risk: 26 / 100`
  - 🎯 **BALANCED ROUTE (AI Recommended)**: `1,274 km` | `41h 52m` | `82.6 m³ fuel` | `Risk: 24 / 100`
- **Multi-Metric Comparison View**: Comprehensive comparison via Matrix Table, Grouped Bar Charts, and Polar Radar Chart.
- **A\* + NSGA-II Evolutionary Algorithm**: Pareto-optimal multi-objective solver balancing transit time, fuel burn, and ice risk.

### 7. Explainable AI & Decision Transparency (`/explainability`)
- **"Why did POLARIS recommend this route?"**: Clear, transparent natural language reasoning for master navigators.
- **SHAP (SHapley Additive exPlanations)**: Local additive feature contribution breakdown for the machine learning risk model.
- **Confidence Metrics**: Spatiotemporal Forecast (89%), Risk Assessment (86%), Route Feasibility (87%).
- **Alternative Route Rejection Analysis**: Clear explanation of why alternative routes (e.g., the Fastest Route) were rejected due to unacceptable RIO structural risk.

### 8. Antarctic Digital Twin Simulation (`/digital-twin`)
- **8-Day Multi-Day Simulation Timeline**: Scrubber across `Day 0` to `Day 7` with Play, Pause, Reset, and Speed multiplier controls (`1x`, `2x`, `4x`).
- **Dynamic Physics & Drift**: Vessel progresses along the route while icebergs drift and sea-ice concentration dynamically evolves.
- **4-Step Dynamic Route Recalculation Flow**:
  1. *Normal Transit* → 2. *Hazard Detected (`IB-023` incursion)* → 3. *AI Recalculating* → 4. *Safer Corridor Engaged (`WP-Bravo-Alt`)*.

### 9. System Status & Edge Telemetry (`/system`)
- **Cloud Intelligence Engine**: Monitors data processing, AI forecast engines, and optimization solvers.
- **Shipboard Edge Engine**: Simulates onboard **NVIDIA Jetson AGX Orin (64GB)** edge computing device with local 48 GB cryospheric cache.
- **Interactive Offline Mode Toggle**: Simulates transition to shipboard local inference when satellite connectivity is lost.
- **End-to-End Visual Architecture Pipeline**: From raw satellite/AIS down to the bridge display.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18.3, TypeScript 5.7, Vite 6.1 |
| **Styling & UI** | Tailwind CSS 3.4, Lucide Icons, Framer Motion |
| **State Management** | Zustand 5.0 (Reactive telemetry & cross-component sync) |
| **Data Visualization** | Recharts 2.15 (Uncertainty bands, radar, dynamic bar charts) |
| **Mapping Engine** | Polar Stereographic SVG engine + Mapbox GL JS (EPSG:3031 projection with graceful offline fallback) |
| **AI / Mathematical Models** | ResUNet v3.2 (SAR Sea-Ice), Lagrangian + XGBoost (Drift), A* + NSGA-II (Routing), SHAP (XAI) |

---

## 📂 Project Structure

```
SIH2026/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Shared images & vectors
│   ├── components/
│   │   ├── dashboard/          # Mission control widgets, KPIs & forecast charts
│   │   ├── digital-twin/       # Digital twin timeline, stats & route recalculation
│   │   ├── explainability/     # SHAP feature contributions, confidence & rejection cards
│   │   ├── forecast/           # Sea-ice timeline controls, charts & ResUNet insights
│   │   ├── iceberg/            # Iceberg catalog table, telemetry & trajectory charts
│   │   ├── layout/             # AppLayout, Header, Sidebar, PageContainer, Safety Footer
│   │   ├── map/                # AntarcticMap, markers, risk overlays, vector layers
│   │   ├── mission/            # Mission form, 4-stage pipeline & result cards
│   │   ├── risk/               # Risk score breakdown, scale legend & hazard list
│   │   ├── routes/             # Route cards, comparison view, radar & algorithm specs
│   │   └── system/             # Cloud/Edge status cards, architecture flow & offline toggle
│   ├── data/                   # Realistic Antarctic datasets & hydrodynamic mocks
│   ├── pages/                  # 9 Main application pages
│   ├── services/               # Navigation, mission & forecast service layers
│   ├── store/                  # Global Zustand store (useAppStore.ts)
│   ├── types/                  # Strict TypeScript definitions & interfaces
│   ├── App.tsx                 # Root router & route definitions
│   └── main.tsx                # React DOM root entrypoint
├── package.json
├── tailwind.config.js          # Dark Antarctic command center theme palette
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite configuration with Rollup chunking
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/polaris-ai.git
cd SIH2026
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 3. Production Build & Verification
```bash
npm run build
```
Executes TypeScript type-checking (`tsc -b`) and bundles optimized production assets via Vite.

---

## 🛡️ Safety & Regulatory Compliance Notice

> **IMPORTANT SAFETY NOTICE**:  
> POLARIS AI provides decision-support recommendations based on available environmental and vessel data. Final navigation decisions remain with the vessel's qualified operator in compliance with the **International Maritime Organization (IMO) Polar Code** and international safety regulations.

---

## 🏆 Smart India Hackathon 2026

- **Project Name**: POLARIS AI (Polar Adaptive Route Intelligence System)
- **Domain**: High-Latitude Maritime Navigation & AI Decision Support
- **Focus Area**: Antarctic Research Expedition Logistics, Marine Safety & Fuel Optimization
