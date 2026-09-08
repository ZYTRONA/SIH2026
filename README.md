# 🧭 POLARIS AI — Polar Adaptive Route Intelligence System
### Autonomous Antarctic Maritime Navigation & Decision Support System

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Apple Design System](https://img.shields.io/badge/Apple_HIG-SF_Pro_Design_System-0066CC?style=flat-square&logo=apple&logoColor=white)](https://developer.apple.com/design/)
[![Figma Motion](https://img.shields.io/badge/Figma_Motion-Spring_Dynamics-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/)
[![IMO Polar Code](https://img.shields.io/badge/IMO_POLARIS-PC1--PC7_Compliant-10B981?style=flat-square)](https://www.imo.org/)
[![Build Status](https://img.shields.io/badge/Build-Passing_0_Errors-brightgreen?style=flat-square)]()

---

## 📌 Executive Overview

**POLARIS AI** is an enterprise-grade polar maritime intelligence platform designed to ensure the safe, fuel-optimized, and regulatory-compliant transit of research and supply vessels across Antarctic waters (including corridors between Cape Town, Southern Ocean passage routes, and Maitri / Bharati Antarctic Research Stations).

By fusing **spaceborne Synthetic Aperture Radar (SAR) data**, **ResUNet v3.2 spatiotemporal sea-ice forecasting**, **Lagrangian iceberg trajectory models**, and **multi-objective evolutionary pathfinding (A* + NSGA-II)**, POLARIS AI provides bridge navigators with explainable, real-time tactical decision support under extreme polar operating conditions.

---

## 🎨 Design System Architecture (Apple HIG & Figma Motion)

POLARIS AI is built on the **Apple Design System** combined with **Figma Fluid Motion Physics**, ensuring that high-density telemetry recedes cleanly so mission data and radar charts remain the focal point.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       POLARIS AI DESIGN SPECIFICATION                       │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Apple Human Interface (HIG)    │ • Typography: San Francisco (SF Pro & Mono)│
│                                │ • Canvas: #f5f5f7 Parchment & Pure White   │
│                                │ • Accent: Action Blue (#0066cc, #0071e3)   │
│                                │ • Hairlines: 1px #e0e0e0 (Zero Drop Shadow)│
│                                │ • Utility Cards: rounded-[18px] curvature │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Figma Fluid Motion Engine      │ • Spring Physics (stiffness: 500, damp: 35)│
│                                │ • Interpolated Layouts (layoutId active)   │
│                                │ • Micro-Interactions (whileHover / whileTap)│
│                                │ • Tactile 44px Minimum Touch Targets       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1. Typography & Hierarchy (San Francisco)
- **Font Stack**: Fully standardized on Apple's San Francisco family (`SF Pro Display`, `SF Pro Text`, `SF Mono`, `-apple-system`, `BlinkMacSystemFont`).
- **Forbidden Weights Eliminated**: Strict adherence to the HIG weight ladder (**300 / 400 Normal** and **600 Semibold**; weight 500 is prohibited).
- **Spatial Tracking**:
  - Display Titles: `tracking-[-0.28px]` to `tracking-[-0.374px]`
  - Standard Body: 17px (`line-height: 1.47`, `-0.374px` tracking)
  - Secondary Captions: 14px (`line-height: 1.43`, `-0.224px` tracking)
  - Monospace Telemetry: 11px / 12px uppercase tracking-wider

### 2. Apple Color System Tokens
- **Interactive Action Blue**: `#0066cc` (Primary interactive color on light surfaces)
- **Focus Ring Blue**: `#0071e3` (High-visibility accessibility focus states)
- **Dark Surface Accent**: `#2997ff` (Sky Blue links on OLED dark tiles)
- **Parchment Canvas**: `#f5f5f7` (Signature Apple off-white dashboard canvas)
- **Pearl Surface**: `#fafafc` (Secondary card and table header fills)
- **OLED Dark Tiles**: `#1d1d1f` and `#272729` (Near-black tactical modules)
- **Hairlines**: `#e0e0e0` / `#f0f0f0` (Crisp 1px borders; zero drop shadows)

### 3. Unified Frosted Glass Navigation Bar
- **Unified 56px Header**: Translucent frosted glass (`backdrop-blur-xl bg-white/90 border-b border-[#e0e0e0]`).
- **Telemetry Capsule**: Live mission identifier (`ANT-2417 • RV Polar Sentinel`) with pulsing emerald beacon.
- **Search Command Palette**: Apple-styled search capsule with instant `⌘K` command drawer.
- **Clock & Uplink Telemetry**: UTC synchronized clock chip, alongside interactive Starlink satellite and offline Jetson AGX Orin Edge toggle.
- **Spring Sidebar**: Smooth sliding background indicator pill (`layoutId="sidebarActiveBackground"`) and dedicated manual expand/collapse toggle.

---

## 🚀 Key Functional Modules

```
POLARIS AI Platform Deck
├── 🛰️ Mission Control Dashboard     (/dashboard)      → 5-Tier Telemetry Architecture
├── 🗺️ Voyage & Mission Planner       (/mission-planner) → Multi-Stage Polar Pipeline
├── ❄️ Sea-Ice Forecast Center        (/sea-ice)        → 72h ResUNet Spatiotemporal Engine
├── 🧊 Iceberg Intelligence & Drift   (/icebergs)       → Polar Stereographic Radar HUD
├── ⚠️ Antarctic Risk Intelligence     (/risk)           → IMO POLARIS RIO Calibration
├── 🧭 Route Optimization Center       (/routes)         → Pareto A* + NSGA-II Solver
├── 🧠 Explainable AI (XAI)           (/explainability) → SHAP Feature Attribution
├── 🌐 Antarctic Digital Twin         (/digital-twin)   → Dynamic Physics & Recalculation
├── 🖥️ System Status & Edge Sync      (/system)         → Jetson AGX Orin & Starlink Uplink
└── 🏛️ Public Product Showcase        (/)               → Apple Editorial Landing Page
```

### 1. Mission Control Dashboard (`/dashboard`)
- **Tier 1 — Editorial Header**: SF Pro Display title, live UTC clock, Starlink uplink indicator, and route status pill.
- **Tier 2 — High-Density KPI Grid**: 4 `rounded-[18px]` utility cards displaying Critical Risk Score, Active Iceberg Hazards, Sea-Ice Compression, and Route Clearance Margin with live sparklines.
- **Tier 3 — Situational Awareness Deck**:
  - **Tactical Decision Banner**: Near-black OLED dark card (`bg-[#1d1d1f]`) displaying automated AI collision avoidance vectors and throttle recommendations.
  - **Interactive Antarctic Hydrodynamic Map**: Deep polar map with OpenSeaMap overlay, iceberg hazard heatmaps, radar sweep, and vessel waypoint track.
- **Tier 4 — Navigation Intelligence & Environmental Forecast**:
  - **Navigation Intelligence Panel**: AI route recommendation score, confidence gauge, route delta, and fuel burn metrics.
  - **72-Hour Environmental Forecast Chart**: Interactive Recharts chart tracking sea ice concentration (%), significant wave height (m), and surface wind speed (kts).
- **Tier 5 — Live Risk Feed & Quick Actions**:
  - **Active Tactical Alerts**: Sector-tagged safety notices with real-time risk level color codes.
  - **Apple Quick Actions Bar**: 4-column direct route triggers with spring hover lifts.

### 2. Mission & Voyage Planner (`/mission-planner`)
- **Vessel & Capability Configurator**: Supports *Polar Research Vessel (R/V Sentinel)*, *Research Vessel Alpha*, and *Ice-Class Supply Vessel* across **PC1 to PC7** polar ice classes.
- **Coordinate Presets & Custom Waypoints**: Fast-fill coordinates for Cape Town, Hobart, Bharati Station, Maitri Station, and McMurdo.
- **4-Stage Computation Pipeline**: Real-time visualization from SAR data ingestion to Pareto-optimal waypoint solution.

### 3. Sea-Ice Forecast Center (`/sea-ice`)
- **Temporal Forecast Scrubber**: Instant timeline navigation across `Current`, `+24h`, `+48h`, `+72h`, and `+7 Days`.
- **ResUNet v3.2 SAR Cryospheric Model**: Predicts sea-ice concentration (SIC %), ice thickness, and drift convergence.
- **Uncertainty Bounds**: Recharts line chart with 90% confidence interval bands.

### 4. Iceberg Intelligence & Radar HUD (`/icebergs`)
- **Dual-Mode Polar Radar Display**: Interactive polar stereographic projection (EPSG:3031) with radar sweep animation.
- **32+ Tracked Iceberg Catalog**: Filterable table with classification tags (Growler, Bergy Bit, Medium, Very Large, Giant).
- **Lagrangian + XGBoost Trajectory Modeling**: 72-hour drift projections accounting for wind shear, ocean currents, and Coriolis drift.

### 5. Antarctic Risk Intelligence (`/risk`)
- **IMO POLARIS Regulatory Calculation**:
  $$\text{RIO} = \sum (C_i \times \text{RIV}_i)$$
- **5-Tier Risk Scale**: `0–20 SAFE` (Emerald), `20–40 LOW` (Cyan), `40–60 MODERATE` (Amber), `60–80 HIGH` (Orange), `80–100 CRITICAL` (Rose).
- **Multi-Layer Risk Toggle**: Granular layer filtering for sea ice, icebergs, weather, ocean swell, and bathymetry hazards.

### 6. Route Optimization Center (`/routes`)
- **3 Candidate Routes Comparison**:
  - 🛡️ **SAFE ROUTE**: Minimum polar ice risk, maximum iceberg clearance.
  - ⚡ **FASTEST ROUTE**: High-speed direct transit corridor.
  - ⛽ **FUEL EFFICIENT ROUTE**: Optimized against hydrodynamic resistance.
  - 🎯 **BALANCED (AI Recommended)**: Multi-objective Pareto optimal path.
- **Comparison Views**: Side-by-side metric matrix, telemetry cards, and radar clearance profiles.

### 7. Explainable AI & Decision Transparency (`/explainability`)
- **Natural Language Decision Synthesis**: Clear rationale detailing why the recommended route was selected over alternatives.
- **SHAP Feature Attribution**: Visual bar chart of positive and negative model factors influencing the route score.
- **Confidence Metrics**: Confidence scores for forecast reliability, risk assessment, and vessel execution feasibility.

### 8. Antarctic Digital Twin Simulation (`/digital-twin`)
- **Temporal Physics Timeline**: Multi-day scrubber (`Day 0` to `Day 7`) with Play/Pause, speed multipliers (`1x`, `2x`, `4x`), and step controls.
- **Dynamic Physics & Drift**: Simultaneous simulation of vessel movement, iceberg drift, and sea-ice compression.
- **Dynamic In-Transit Recalculation**: Automated real-time deviation upon detecting a simulated iceberg collision vector.

### 9. System Status & Edge Telemetry (`/system`)
- **Dual-Engine Architecture**: Dual status cards for Cloud Intelligence and Shipboard Edge Engine.
- **Offline Edge Mode Simulation**: Simulates vessel disconnection from Starlink satellite uplink to local NVIDIA Jetson AGX Orin (64GB) inference.
- **Data Source Health Grid**: Real-time status monitors for Sentinel-1 SAR, AMSR2, ECMWF, and AIS feeds.

---

## 🛠️ Technology Stack

| Layer | Framework / Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | 18.3.1 | Component architecture |
| **Language** | TypeScript | 5.7.2 | Strict type safety & interfaces |
| **Build Tooling** | Vite | 6.4.3 | High-performance bundling & HMR |
| **Design System** | Tailwind CSS | 3.4.17 | Apple Design System token utilities |
| **Motion Physics** | Framer Motion | 12.4.7 | Figma/Apple spring dynamics & layout transitions |
| **State Management** | Zustand | 5.0.3 | Global reactive store & telemetry sync |
| **Data Charts** | Recharts | 2.15.1 | Environmental forecasts, sparklines, & SHAP |
| **Iconography** | Lucide React | 0.475.0 | Clean monochrome vector glyphs |
| **UI Primitives** | Radix UI | 1.x | Accessible dialog, dropdown, tooltip, & tabs |
| **Mapping Engine** | Polar SVG + Mapbox GL | 3.10.0 | EPSG:3031 polar projection & OpenSeaMap |

---

## 📂 Project Directory Structure

```
SIH2026/
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # Shared logos and vector assets
│   ├── components/
│   │   ├── dashboard/            # 5-Tier telemetry dashboard components
│   │   ├── digital-twin/         # Digital twin simulation controls & stats
│   │   ├── explainability/       # SHAP feature contributions & confidence grids
│   │   ├── forecast/             # Sea-ice forecast controls & chart panels
│   │   ├── iceberg/              # Iceberg radar HUD, catalog table & telemetry
│   │   ├── layout/               # Header, Sidebar, AppLayout, PageContainer
│   │   ├── map/                  # AntarcticMap, MapControls, MapLegend, ArcticMap
│   │   ├── mission/              # MissionForm, MissionProgressPipeline, ResultCard
│   │   ├── risk/                 # RiskBreakdown, RiskTimeline, HazardList
│   │   ├── routes/               # RouteCards, RouteComparison, Telemetry
│   │   ├── system/               # Cloud/Edge status cards & offline mode toggle
│   │   └── ui/                   # Apple UI primitives (card, button, switch, etc.)
│   ├── data/                     # Realistic Antarctic telemetry datasets & mocks
│   ├── pages/                    # 10 application page views
│   ├── store/                    # Zustand application store (useAppStore.ts)
│   ├── types/                    # TypeScript data models and interfaces
│   ├── App.tsx                   # Route provider & layout orchestration
│   ├── index.css                 # Apple HIG typography & Figma motion utilities
│   └── main.tsx                  # React application entry point
├── tailwind.config.js            # Apple HIG colors, typography scale & animation easings
├── tsconfig.json                 # TypeScript strict compiler configuration
├── vite.config.ts                # Vite configuration with chunking optimization
└── README.md                     # Documentation & architectural guide
```

---

## ⚡ Quick Start & Setup

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-org/polaris-ai.git
cd SIH2026

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Navigate to **`http://localhost:5173`** in your browser.

### 3. Production Build & Verification
```bash
# Type-check and build production bundle
npm run build
```

---

## 🛡️ Safety & Regulatory Compliance

> [!IMPORTANT]
> **MARITIME REGULATORY NOTICE**:  
> POLARIS AI provides automated tactical decision support based on available satellite imagery, numerical weather predictions, and vessel sensor telemetry. Final navigational authority remains exclusively with the vessel's Master and qualified Ice Navigators in accordance with the **IMO Polar Code (Resolution MSC.385(94))** and the **SOLAS Convention**.

---

## 🌐 Mission & System Mandate

- **System**: POLARIS AI (Polar Adaptive Route Intelligence System)
- **Target Operations**: Antarctic Research Expedition Logistics, Marine Safety & Cryospheric Fuel Optimization
- **Standards**: IMO Polar Code Compliant (PC1 through PC7)
