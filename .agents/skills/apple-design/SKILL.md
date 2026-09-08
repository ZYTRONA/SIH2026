---
name: apple-design
description: >-
  Use this skill whenever designing, building, or styling user interfaces, pages, or components
  following Apple's Design System. Enforces edge-to-edge alternating tiles, SF Pro typography,
  Action Blue (#0066cc) interactive color, 18px utility cards, 2-tier navigation, and strict constraints.
---

# Apple Design System Specification & Implementation Guide

A photography-first, museum-gallery design language where UI chrome recedes so data and product imagery can speak. Edge-to-edge product tiles alternate light and dark canvases, framed by SF Pro Display headlines with negative letter-spacing and a single **Action Blue (`#0066cc`)** interactive accent color.

---

## 1. Color System

### Brand & Interactive Accent
- **Action Blue (`#0066cc`)**: The single brand-level interactive color for all primary pill CTAs ("Learn more", "Buy", "Plan Route"), text links, and focus rings.
- **Focus Blue (`#0071e3`)**: Focus ring outline on interactive elements (`outline: 2px solid #0071e3`).
- **Sky Link Blue (`#2997ff`)**: Used exclusively on dark tiles for in-copy links and callouts.
- **Strict Rule**: *No second accent color exists.*

### Surfaces & Canvases
- **Pure White (`#ffffff`)**: Dominant canvas for utility cards, store tiles, and light product sections.
- **Parchment (`#f5f5f7`)**: Signature Apple off-white. Default canvas for dashboard surfaces, alternating tiles, and dense link footers.
- **Pearl Surface (`#fafafc`)**: Near-white fill for secondary ghost capsules.
- **Near-Black Tile 1 (`#272729`)**: Primary dark tile surface.
- **Near-Black Tile 2 (`#2a2a2c`)**: Micro-step lighter dark tile for adjacent separation.
- **Near-Black Tile 3 (`#252527`)**: Deep dark tile for video frames and bottom stacks.
- **Pure Black (`#000000`)**: Reserved strictly for the 44px global nav bar and true void overlays.
- **Translucent Gray (`rgba(210, 210, 215, 0.64)`)**: 44px circular control chips.

### Hairlines
- **Hairline (`#e0e0e0`)**: 1px border on store utility cards and configurator chips.
- **Soft Divider (`#f0f0f0`)**: Internal card separators.

---

## 2. Typography & Hierarchy (SF Pro)

### Type Scale Ladder
| Token | Size | Weight | Line Height | Tracking | Application |
|---|---|---|---|---|---|
| `hero-display` | 56px | 600 | 1.07 | `-0.28px` | Homepage hero headlines |
| `display-lg` | 40px | 600 | 1.10 | `0px` | Product tile headlines |
| `display-md` | 34px | 600 | 1.47 | `-0.374px` | Section titles |
| `lead` | 28px | 400 | 1.14 | `+0.196px` | Product tile subcopy |
| `tagline` | 21px | 600 | 1.19 | `+0.231px` | Sub-tile tagline & sub-nav category |
| `body-strong` | 17px | 600 | 1.24 | `-0.374px` | Emphasized text |
| `body` | 17px | 400 | 1.47 | `-0.374px` | Standard body paragraphs |
| `dense-link` | 17px | 400 | 2.41 | `0px` | Dense footer & utility link columns |
| `caption` | 14px | 400 | 1.43 | `-0.224px` | Secondary text & button labels |
| `caption-strong` | 14px | 600 | 1.29 | `-0.224px` | Emphasized captions |
| `fine-print` | 12px | 400 | 1.00 | `-0.12px` | Legal fine-print & nav links |

### Strict Typographic Rules
1. **Negative Letter-Spacing**: Display sizes (≥17px) carry slight negative tracking (`-0.28px` to `-0.374px`) for the signature "Apple tight" cadence.
2. **Body Copy at 17px**: Body paragraphs run at 17px (`line-height: 1.47`), not 16px.
3. **Weight 500 is FORBIDDEN**: The weight ladder is strictly **300 / 400 / 600 / 700**. Mid-weight copy uses 600.

---

## 3. Component Grammars

### A. Buttons & Micro-Interactions
- **Primary Action Pill (`btn-apple-primary`)**: Action Blue (`#0066cc`), white text, full pill `rounded-full`, padding 11px × 22px, `active:scale-95`.
- **Secondary Ghost Pill (`btn-apple-secondary`)**: Transparent background, Action Blue text, 1px solid `#0066cc` border, `rounded-full`, `active:scale-95`.
- **Dark Utility Button (`btn-apple-dark-utility`)**: Near-Black (`#1d1d1f`) fill, white text, 14px, `rounded-[8px]`, padding 8px × 15px, `active:scale-95`.
- **Circular Icon Button (`btn-apple-icon`)**: 44px × 44px circle, translucent gray fill, `rounded-full`, `active:scale-95`.

### B. Cards & Containers
- **Store Utility Card (`apple-card`)**: Pure white background, 1px `#e0e0e0` hairline, `rounded-[18px]`, padding 24px, **zero drop shadow**.
- **Dark Product Tile (`apple-tile-dark`)**: Near-Black (`#272729`) background, pure white headlines, `#cccccc` secondary copy, `rounded-[18px]`.
- **Frosted Sub-Nav (`frosted-subnav`)**: 52px height, `backdrop-blur-md bg-[#f5f5f7]/80 border-b border-[#e0e0e0]`.

---

## 4. Top Navigation Architecture

1. **Global Nav (44px)**: Pinned black bar (`#000000`), 12px white text, discrete brand glyph, search shortcut (`⌘K`), UTC clock, and user avatar.
2. **Frosted Sub-Nav (52px)**: Sticks directly below global nav, parchment frosted glass (`#f5f5f7`/80), 21px tagline category title, telemetry breadcrumb, and persistent Action Blue pill CTA.

---

## 5. Do's and Don'ts

### Do
- Use Action Blue (`#0066cc`) for every interactive element on light surfaces and Sky Link Blue (`#2997ff`) on dark surfaces.
- Use `active:scale-95` on all buttons and interactive chips.
- Set cards to `rounded-[18px]` with 1px `#e0e0e0` hairlines.
- Keep the global nav bar at 44px pure black (`#000000`).

### Don't
- **Never add drop shadows to cards, buttons, or text** (shadow is reserved only for physical product/vessel imagery).
- **Never introduce decorative CSS gradients**.
- **Never use font-weight 500** or 16px body copy.
