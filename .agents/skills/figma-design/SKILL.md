---
name: figma-design
description: >-
  Use this skill whenever designing, building, or styling user interfaces, components, or marketing
  pages using the Figma Design System. Enforces confident monochrome frames, oversized hand-cut pastel
  color blocks (lime, lilac, cream, mint, pink, navy), pill-shaped CTAs (50px), and monospace eyebrows.
---

# Figma Design System Specification & Implementation Guide

A confident black-and-white editorial frame interrupted by oversized, hand-cut pastel color blocks. The canvas is rigorously monochrome — pure white surfaces, pure black ink, and pill-shaped CTAs — while each story section drops the page into a saturated lime, lavender, cream, mint, pink, or navy panel that reads like a sticky note on a clean desk.

---

## 1. Color System

### Monochrome Foundations
- **Primary Ink (`#000000`)**: Dominant text, primary button fill, icons, and hero framing.
- **Pure White Canvas (`#ffffff`)**: Clean background surface for cards and pages.
- **Surface Soft (`#f7f7f5`)**: Subtle neutral off-white fill for secondary containers.
- **Hairlines (`#e6e6e6` / `#f1f1f1`)**: 1px structural grid and card borders.

### Signature Pastel Color Blocks
Each story block or featured module drops into a distinct pastel color panel:

| Token | Hex | Intended Purpose |
|---|---|---|
| **Block Lime** | `#dceeb1` | Primary features, AI engine showcases, active telemetry |
| **Block Lilac** | `#c5b0f4` | Explainability, neural networks, machine learning specs |
| **Block Cream** | `#f4ecd6` | Mission parameters, protocols, documentation summaries |
| **Block Mint** | `#c8e6cd` | Success confirmations, safety compliance, verification |
| **Block Pink** | `#efd4d4` | Warnings, critical risk windows, hazard alerts |
| **Block Coral** | `#f3c9b6` | Community, collaboration, live multi-agent sync |
| **Block Navy** | `#1f1d3d` | High-contrast dark modules, shipboard edge computing |
| **Accent Magenta**| `#ff3d8b` | Cursor markers, interactive multiplayer pins |

---

## 2. Typography & Taxonomy Hierarchy

### Font Families
- **Display & Body**: `figmaSans`, `"Plus Jakarta Sans"`, `Inter`, `sans-serif`.
- **Eyebrow & Telemetry**: `figmaMono`, `"JetBrains Mono"`, `"SF Mono"`, `monospace`.

### Type Scale Ladder
| Role | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| `display-xl` | 86px | 340 (Light) | `-1.72px` | Massive hero headlines |
| `display-lg` | 64px | 340 (Light) | `-0.96px` | Section hero headers |
| `headline` | 26px | 540 (Medium) | `-0.26px` | Panel titles & cards |
| `body-lg` | 20px | 330 | `-0.14px` | Lead editorial paragraphs |
| `body` | 18px / 16px | 320 / 400 | `-0.26px` | Standard body copy |
| `eyebrow` | 11px | 600 (Mono) | `+0.06em` | Uppercase taxonomy tags (`figma-eyebrow`) |

---

## 3. Component Grammars

### A. Pill Buttons (`rounded-[50px]`)
- **Primary Pill (`btn-figma-primary`)**: Black background (`#000000`), white text, `min-h-[44px]`, px-5 py-2.5, `rounded-[50px]`, `hover:bg-neutral-800`, `active:scale-[0.98]`.
- **Secondary Pill (`btn-figma-secondary`)**: White background (`#ffffff`), black text, 1px border `#e6e6e6`, `rounded-[50px]`, `hover:bg-[#f7f7f5]`.
- **Circular Icon Button (`btn-figma-icon`)**: 40px × 40px circle, `#f7f7f5` background, 1px `#e6e6e6` border.

### B. Color-Block Sections
- **Oversized Hand-Cut Blocks**: `rounded-[24px]` containers with full pastel background (e.g. `bg-[#dceeb1]`), internal padding 32px–48px, bold headline, and high-contrast black chips.

### C. Hairline Cards (`figma-card`)
- **Card**: Pure white background, `border border-[#e6e6e6]`, `rounded-2xl` (16px), padding 20px–24px, subtle elevation `box-shadow: 0 4px 16px rgba(0,0,0,0.04)`.

### D. Marquee Ribbon
- Continuous black horizontal strip (`bg-black text-white h-9`), uppercase monospace tags separated by bullet dots (`&bull;`), continuous ticker or pulse.

---

## 4. Layout & Spacing Rules

- **Base Spacing Unit**: 8px (margins: 16px, 24px, 32px, 48px, 96px section padding).
- **Container Max-Width**: `1440px` (or `max-w-7xl` centered).
- **Rhythm**: White canvas hero &rarr; Colored pastel block &rarr; White card grid &rarr; Deep Navy edge block &rarr; Clean white footer.
