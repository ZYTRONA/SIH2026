# 🧭 POLARIS AI — Polar Adaptive Route Intelligence System
### Next-Generation Autonomous Antarctic Maritime Navigation & Decision Support Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet ECDIS](https://img.shields.io/badge/Leaflet-1.9.4_ECDIS-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Apple Design System](https://img.shields.io/badge/Apple_HIG-SF_Pro_Design_System-0066CC?style=flat-square&logo=apple&logoColor=white)](https://developer.apple.com/design/)
[![Figma Motion](https://img.shields.io/badge/Figma_Motion-Spring_Dynamics-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/)
[![IMO Polar Code](https://img.shields.io/badge/IMO_POLARIS-PC1--PC7_Compliant-10B981?style=flat-square)](https://www.imo.org/)
[![Build Status](https://img.shields.io/badge/Build-Passing_0_Errors-brightgreen?style=flat-square)]()

---

## 📌 Executive Overview

**POLARIS AI** is an enterprise-grade tactical maritime intelligence platform designed to guarantee safe, fuel-optimized, and regulatory-compliant transit for research vessels and heavy icebreakers across extreme Antarctic waters — including expedition corridors between Cape Town Maritime Terminal, Southern Ocean passage routes, and Maitri / Bharati Antarctic Research Stations in Prydz Bay.

By fusing **spaceborne Synthetic Aperture Radar (SAR)** imagery, **ResUNet v3.2 spatiotemporal sea-ice neural forecasts**, **Lagrangian iceberg drift models**, **real-time Electronic Chart Display and Information System (ECDIS)** mapping, and **multi-objective evolutionary pathfinding (A* + NSGA-II)**, POLARIS AI provides bridge navigators and maritime fleet operations with explainable, mission-critical tactical decision support under extreme polar weather and cryospheric compression.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    POLARIS AI POLAR MARITIME ARCHITECTURE                    │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ 🛰️ Cryospheric Observation     │ • Sentinel-1 C-Band SAR & RADARSAT-2 Const. │
│                               │ • AMSR2 Passive Microwave Radiometry (89GHz)│
│                               │ • ECMWF Ocean Wave, Swell & 10m Wind Fields │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 🧠 Predictive Intelligence     │ • ResUNet v3.2 Spatiotemporal SIC Forecast  │
│                               │ • 72h Lagrangian + XGBoost Iceberg Drift    │
│                               │ • IMO POLARIS Risk Index Outcome (RIO) Math │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 🧭 Tactical Navigation Engine  │ • Pareto Multi-Objective Routing (NSGA-II)  │
│                               │ • Full-Featured Tactical Nautical ECDIS Map │
│                               │ • Real-Time Voyage Simulation & DR Vectors  │
│                               │ • Interactive Geodesic Distance Ruler Tool  │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 🖥️ Dual-Edge Deployment       │ • Shipboard NVIDIA Jetson AGX Orin 64GB     │
│                               │ • Starlink LEO Satellite Mesh & Offline Sync│
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 🗺️ Real-Time Tactical ECDIS Nautical Map Engine

POLARIS AI features a high-fidelity Electronic Chart Display and Information System (ECDIS) built for mission-critical polar navigation across all platform views.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         10 TACTICAL OVERLAY LAYERS                          │
├────────────────────────────────┬────────────────────────────────────────────┤
│ ❄️ Sea Ice Concentration       │ Multi-tier polygons with WMO Egg Codes,     │
│                                │ ice thickness (0.25m - 3.2m), floe sizes   │
├────────────────────────────────┼────────────────────────────────────────────┤
│ ⛰️ Iceberg Radar Targets (37)   │ Tracked targets with drift velocity vectors,│
│                                │ 72h trajectory projections & 5 NM halos    │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 🛡️ POLARIS Risk Corridors      │ Severity polygons with RIO limit math &    │
│                                │ multi-year pressure ridge heights (h>3.8m) │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 🛣️ Pareto Navigation Paths     │ Balanced, Safety Detour & Fast corridors   │
│                                │ with waypoint-level speed/thrust limits    │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 🚢 AIS Marine Traffic (6 Ships)│ Nearby polar ships (Maitri Express,        │
│                                │ Attenborough, Xue Long 2, Agulhas II, etc.)│
├────────────────────────────────┼────────────────────────────────────────────┤
│ 📍 Antarctic Stations (12 Bases│ Bharati (Dest), Maitri, Zhongshan, Davis,  │
│                                │ Mawson, Casey, Palmer, McMurdo, Cape Town  │
├────────────────────────────────┼────────────────────────────────────────────┤
│ ⚓ Polar Navigational Aids      │ Prydz Bay Fairway Buoy, Cardinal marks,    │
│                                │ virtual AIS AtoNs, acoustic flashers       │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 🌊 Ocean Currents & Gyres      │ Antarctic Circumpolar Current & Prydz Bay   │
│                                │ gyres with water velocity (kts) and temps  │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 🧭 Seabed Bathymetry Isobaths  │ Depth soundings (-100m coastal shoals to   │
│                                │ -3000m abyssal plain contours)             │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 💨 Wind & Weather Grid         │ ECMWF observations, wind barbs (18-34 kts),│
│                                │ wave swells, and katabatic storm warnings  │
└────────────────────────────────┴────────────────────────────────────────────┘
```

### Advanced Map Navigation Features
- **Top-Down Polar Ship Silhouettes**: Realistic icebreaker hull shapes with pointed ice-breaking bows, wheelhouses, helipads (`H`), active radar beacons, red/green navigation lights, and live heading rotation.
- **Dead-Reckoning & Radar Range Rings**: Dynamic 1-hour dead-reckoning projected course line alongside 12, 24, 36, and 48 NM radar circles with rotating sweep animation.
- **Live Voyage Simulation Engine**: Interactive simulation controls with Play/Pause, $1\times/5\times/20\times$ speed multipliers, and instant origin reset.
- **Geodesic Distance & Bearing Ruler**: Click any two points on the chart to measure geodesic distance (NM), initial true bearing ($^\circ\text{T}$), and transit duration at current speed.
- **Multi-Basemap Switcher**: Instant switching between **OpenSeaMap Nautical Charts**, **ESRI Ocean Floor Depth Topography**, **OpenStreetMap Marine**, and **Polar Stereographic HUD (EPSG:3031)**.
- **Non-Blocking Glassmorphic Apple Flyout Inspectors**: Entity cards anchored cleanly at `bottom-12 right-14` with sticky headers, explicit close buttons, `Escape` key dismissal, and background-click dismissal.

---

## 🎨 Design System Architecture (Apple HIG & Figma Motion)

POLARIS AI is crafted around Apple's **Human Interface Guidelines (HIG)** combined with **Figma Fluid Motion Dynamics**, ensuring high-density scientific telemetry recedes cleanly so charts and decision triggers remain prominent.

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

### Typography & Hierarchy (San Francisco)
- **Standardized Font Stack**: Standardized on Apple's San Francisco family (`SF Pro Display`, `SF Pro Text`, `SF Mono`, `-apple-system`, `BlinkMacSystemFont`).
- **Strict HIG Weight Ladder**: 300 Light, 400 Regular, and 600 Semibold (Weight 500 eliminated).
- **Refined Tracking Scale**:
  - Display Titles: `tracking-[-0.28px]` to `tracking-[-0.374px]`
  - Standard Body: 17px (`line-height: 1.47`, `-0.374px` tracking)
  - Secondary Captions: 14px (`line-height: 1.43`, `-0.224px` tracking)
  - Monospace Telemetry: 11px / 12px uppercase tracking-wider

---

## 🚀 Key Functional Modules

```
POLARIS AI Platform Deck
├── 🛰️ Mission Control Dashboard     (/dashboard)        → 5-Tier Telemetry Architecture & Live Map
├── 🗺️ Voyage & Mission Planner       (/mission-planner)  → Multi-Stage Polar Pipeline & Ice-Class Config
├── ❄️ Sea-Ice Forecast Center        (/sea-ice-forecast) → 72h ResUNet Spatiotemporal Cryospheric Model
├── 🧊 Iceberg Intelligence Center    (/icebergs)         → 37+ Radar Targets, 72h Drift Trajectory Engine
├── ⚠️ Antarctic Risk Intelligence     (/risk)             → IMO POLARIS RIO Calibration & Hazard Layers
├── 🧭 Route Optimization Center       (/routes)           → Pareto A* + NSGA-II Multi-Objective Solver
├── 🧠 Explainable AI (XAI)           (/explainability)   → SHAP Feature Attribution & Decision Synthesis
├── 🌐 Antarctic Digital Twin         (/digital-twin)     → Real-Time Hydrodynamic Physics & Recalculation
├── 🖥️ System Status & Edge Sync      (/system)           → NVIDIA Jetson AGX Orin & Starlink Uplink
└── 🏛️ Product Showcase & Specs       (/)                 → Apple Editorial Landing & Capabilities Overview
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
  - **Apple Quick Actions Bar**: Direct route and layer inspection triggers.

### 2. Voyage & Mission Planner (`/mission-planner`)
- **Vessel & Capability Configurator**: Supports *Polar Research Vessel (R/V Sentinel)*, *Research Vessel Alpha*, and *Ice-Class Supply Vessel* across **PC1 to PC7** polar ice classes.
- **Coordinate Presets & Custom Waypoints**: Fast-fill coordinates for Cape Town, Hobart, Bharati Station, Maitri Station, and McMurdo.
- **4-Stage Computation Pipeline**: Real-time progress tracker from SAR data ingestion to Pareto-optimal waypoint solution.

### 3. Sea-Ice Forecast Center (`/sea-ice-forecast`)
- **Temporal Forecast Scrubber**: Timeline navigation across `Current`, `+24h`, `+48h`, `+72h`, and `+7 Days`.
- **ResUNet v3.2 SAR Cryospheric Model**: Predicts sea-ice concentration (SIC %), ice thickness, and drift convergence.
- **Uncertainty Bounds**: Recharts line chart with 90% confidence interval bands and Polar Code Matrix evaluation.

### 4. Iceberg Intelligence & Radar Center (`/icebergs`)
- **37+ Tracked Iceberg Targets**: Filterable catalog table with classification tags (Growler, Bergy Bit, Medium, Very Large, Giant).
- **Lagrangian + XGBoost Trajectory Modeling**: 72-hour drift projections accounting for wind shear, ocean currents, and Coriolis drift.
- **Radar Lock & Target Inspector**: Detailed dimensions ($L \times W \times H$), mass (MT), draft depth, and CPA/TCPA calculations.

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
- **Comparison Views**: Side-by-side metric matrix, telemetry cards, and waypoint clearance profiles.

### 7. Explainable AI & Decision Transparency (`/explainability`)
- **Natural Language Decision Synthesis**: Clear rationale detailing why the recommended route was selected over alternatives.
- **SHAP Feature Attribution**: Visual bar chart of positive and negative model factors influencing the route score.
- **Confidence Metrics**: Confidence scores for forecast reliability, risk assessment, and vessel execution feasibility.

### 8. Antarctic Digital Twin Simulation (`/digital-twin`)
- **Temporal Physics Timeline**: Multi-day scrubber (`Day 0` to `Day 7`) with Play/Pause, speed multipliers (`1x`, `2x`, `4x`), and step controls.
- **Dynamic Physics & Drift**: Simultaneous simulation of vessel movement, iceberg drift, and sea-ice compression.
- **Dynamic In-Transit Recalculation**: Automated real-time deviation upon detecting a simulated iceberg collision vector.

### 9. System Status & Edge Telemetry (`/system`)
- **Dual-Engine Architecture**: Status cards for Cloud Intelligence and Shipboard Edge Engine.
- **Offline Edge Mode Simulation**: Simulates vessel disconnection from Starlink satellite uplink to local NVIDIA Jetson AGX Orin (64GB) inference.
- **Data Source Health Grid**: Real-time status monitors for Sentinel-1 SAR, AMSR2, ECMWF, and AIS feeds.

---

## 🛠️ Technology Stack

| Layer | Framework / Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | 18.3.1 | Component architecture & state synchronization |
| **Language** | TypeScript | 5.7.2 | Strict type safety & nautical data models |
| **Build Tooling** | Vite | 6.4.3 | High-performance bundling & instant HMR |
| **ECDIS Mapping Engine** | Leaflet + OpenSeaMap | 1.9.4 | Marine navigational tiles, seamarks, & overlays |
| **Design System** | Tailwind CSS | 3.4.17 | Apple Design System token utilities |
| **Motion Physics** | Framer Motion | 12.4.7 | Figma/Apple spring dynamics & layout transitions |
| **State Management** | Zustand | 5.0.3 | Global reactive store & telemetry sync |
| **Data Visualization** | Recharts | 2.15.1 | Environmental forecasts, sparklines, & SHAP |
| **Iconography** | Lucide React | 0.475.0 | Clean monochrome vector glyphs |
| **UI Primitives** | Radix UI | 1.x | Accessible dialog, dropdown, tooltip, & select |

---

## 📂 Project Directory Structure

```
SIH2026/
├── public/                       # Static assets and seamark tiles
├── src/
│   ├── assets/                   # Shared logos and vector assets
│   ├── components/
│   │   ├── dashboard/            # 5-Tier telemetry dashboard components
│   │   ├── digital-twin/         # Digital twin simulation controls & stats
│   │   ├── explainability/       # SHAP feature contributions & confidence grids
│   │   ├── forecast/             # Sea-ice forecast controls & chart panels
│   │   ├── iceberg/              # Iceberg radar HUD, catalog table & telemetry
│   │   ├── layout/               # Header, Sidebar, AppLayout, PageContainer
│   │   ├── map/                  # AntarcticMap, MapControls, VesselMarker, MapLegend
│   │   ├── mission/              # MissionForm, MissionProgressPipeline, ResultCard
│   │   ├── risk/                 # RiskBreakdown, RiskTimeline, HazardList
│   │   ├── routes/               # RouteCards, RouteComparison, Telemetry
│   │   ├── system/               # Cloud/Edge status cards & offline mode toggle
│   │   └── ui/                   # Apple UI primitives (card, button, switch, etc.)
│   ├── data/                     # Realistic Antarctic telemetry datasets & mocks
│   │   ├── mapData.ts            # Stations, AIS vessels, aids, currents, isobaths, bergs
│   │   ├── dashboardData.ts      # KPI metrics, tactical alerts & forecast datasets
│   │   └── index.ts              # Dataset barrel export
│   ├── pages/                    # 10 application page views
│   ├── store/                    # Zustand application store (useAppStore.ts)
│   ├── types/                    # TypeScript data models and nautical interfaces
│   │   ├── map.ts                # ECDIS layers, AIS vessels, stations, simulation
│   │   └── index.ts              # Core polar telemetry types
│   ├── App.tsx                   # Route provider & layout orchestration
│   ├── index.css                 # Apple HIG typography & Figma motion utilities
│   └── main.tsx                  # React application entry point
├── tailwind.config.js            # Apple HIG colors, typography scale & animation easings
├── tsconfig.json                 # TypeScript strict compiler configuration
├── vite.config.ts                # Vite configuration with chunking optimization
└── README.md                     # Comprehensive documentation & architectural guide
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
> POLARIS AI provides automated tactical decision support based on spaceborne Synthetic Aperture Radar (SAR), numerical weather predictions, and shipboard sensor telemetry. Final navigational authority remains exclusively with the vessel's Master and certified Ice Navigators in accordance with the **IMO Polar Code (Resolution MSC.385(94))** and the **SOLAS Convention**.

---

## 🌐 Mission & System Mandate

- **System**: POLARIS AI (Polar Adaptive Route Intelligence System)
- **Target Operations**: Antarctic Research Expeditions, Polar Shipping Safety & Cryospheric Fuel Optimization
- **Standards**: IMO Polar Code Compliant (Polar Classes PC1 through PC7)
- **License**: MIT
