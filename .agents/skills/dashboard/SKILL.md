---
name: dashboard
description: >-
  Use this skill when designing, building, refactoring, or optimizing mission-critical
  tactical dashboards, KPI metric grids, real-time alert monitors, hydrodynamic marine
  charts, and situational awareness interfaces in POLARIS AI.
---

# Tactical Dashboard & Situational Awareness Design

This skill defines the architectural patterns, component anatomy, and state workflows for building high-performance, real-time tactical cockpits and telemetry dashboards.

---

## 1. Dashboard Layout Anatomy

A standard tactical dashboard consists of 5 modular tiers arranged with a strict visual hierarchy:

```text
┌────────────────────────────────────────────────────────────────────────┐
│  Tier 1: Page Header & Live Status Pill (UTC Sync, Connection State)  │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 2: Tactical Decision & Priority Recommendation Banner            │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 3: 6-Column High-Density KPI Metric Grid with Sparklines         │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 4: Split Content Area (8 Cols: Interactive Map / Chart           │
│                              4 Cols: AI Intelligence & Summary Panel)  │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 5: Quick Action Controls & Real-Time Alert Drawer                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Dashboard Components

### A. KPI Metric Cards (`KPICard.tsx`)
- **Dimensions & Radius**: `rounded-[18px]` utility cards with 1px hairline border (`#e0e0e0`).
- **Typography**:
  - Value: 24px–28px Semibold tabular numbers.
  - Label: 12px Medium uppercase/caption text.
  - Subtitle / Trend: Pill badge with semantic status colors (safe: emerald, warning: amber, critical: rose).
- **Embedded Sparkline**: Compact SVG sparkline showing historical variance across past intervals.

### B. Tactical Decision Banner (`TacticalDecisionBanner.tsx`)
- **Purpose**: Immediately communicates the primary active navigation corridor, voyage origin/destination, active waypoint, and distance to nearest hazard.
- **Surface**: High-contrast near-black tile (`#272729`) or accented color panel.
- **Action**: Direct Action Blue pill button to inspect alternative Pareto paths.

### C. Situational Map Chart (`AntarcticMap.tsx`)
- **Projections**: Polar stereographic (EPSG:3031) or Web Mercator (EPSG:3857).
- **Layer System**: Sea-ice concentration heatmap, tracked iceberg markers, AIS vessel position, and multi-objective Pareto paths.
- **Controls**: Full-screen toggle, zoom controls, coordinate readout, and layer visibility toggles.

### D. Navigation Intelligence Panel (`NavigationIntelligencePanel.tsx`)
- **Anatomy**:
  - Circular AI Confidence Indicator (0–100%).
  - Key Deltas: Fuel savings (`%` & tons), travel time reduction, safety index score, and ice exposure rating.
  - Deep-dive link to route optimization and explainable AI pages.

---

## 3. Data Flow & Real-Time Update Protocol

1. **State Management**: Use Zustand slices (`useAppStore`) for centralized dashboard telemetry.
2. **Polling & Simulation Timers**:
   - Live UTC clock ticks every 1000ms.
   - Satellite / AIS telemetry poll interval: 30s.
   - Offline fallback: When `isOffline === true`, immediately load cached local cryospheric radar feeds.
3. **Responsive Breakpoints**:
   - `< 640px` (Mobile): 2-column KPI grid, stacked map and intelligence panel.
   - `640px – 1024px` (Tablet): 3-column KPI grid.
   - `> 1024px` (Desktop): 6-column KPI grid, 8:4 split map and panel.

---

## 4. Verification Checklist

- [ ] All timestamps displayed in Universal Time Coordinated (UTC).
- [ ] No layout shift when real-time data refreshes.
- [ ] Interactive buttons meet minimum 44px touch targets.
- [ ] Accessible color contrasts on both light and dark tiles.
