---
name: Core Commerce System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#4d556b'
  on-tertiary: '#ffffff'
  tertiary-container: '#656d84'
  on-tertiary-container: '#eef0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
The brand personality is authoritative yet accessible, designed to support high-velocity e-commerce and complex data management. It targets both end-consumers seeking a frictionless shopping experience and merchants requiring a powerful admin interface. 

The design style is **Corporate / Modern** with a focus on high-contrast clarity and scalability. It leverages a rigorous grid system and functional minimalism to ensure that product content and business data remain the focal point. The emotional response should be one of reliability, precision, and institutional trust.

## Colors
The palette is rooted in "Professional Blue" (#2563EB) for primary actions and "Slate" (#475569) for secondary structural elements. 

- **Primary:** Used for critical path actions, brand moments, and active states.
- **Secondary/Slate:** Used for iconography, secondary labels, and UI framing.
- **Neutral/Surface:** A range of cool grays that provide depth without introducing visual noise.
- **Status:** Standardized semantic colors (Success: #10B981, Warning: #F59E0B, Error: #EF4444) are used across both light and dark modes to maintain functional consistency.

## Typography
The system utilizes **Inter** for core readability and **Geist** for technical or data-heavy labels. 

- **Headlines:** Use tight letter-spacing and bold weights to establish a clear hierarchy.
- **Body:** Optimized for long-form reading in product descriptions and documentation.
- **Labels:** Geist’s monospaced influence is used for SKUs, prices, and table headers to ensure numerical alignment and technical clarity.

## Layout & Spacing
The system employs a **12-column fluid grid** for the storefront and a **fixed-sidebar/fluid-content** model for the admin dashboard. 

- **Spacing Rhythm:** Based on a 4px baseline grid. All margins and paddings must be multiples of 4.
- **Grid:** 24px (1.5rem) gutters provide ample breathing room between product tiles.
- **Admin Layout:** Uses a 280px fixed sidebar. In data-heavy views, density can be increased by reducing internal cell padding from `md` to `sm`.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and crisp **Low-contrast outlines**. 

- **Level 0 (Base):** The main background color.
- **Level 1 (Surface):** White (Light) or Slate-800 (Dark) cards with a 1px border (#E2E8F0 / #334155).
- **Level 2 (Overlay):** Used for dropdowns and modals. These utilize a soft ambient shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to separate from the surface.
- **Focus States:** High-visibility 2px Professional Blue outlines with a 2px offset for accessibility.

## Shapes
The shape language is **Soft** but disciplined. 

- **Standard Elements:** 0.25rem (4px) corner radius for buttons and inputs to maintain a professional, sharp aesthetic.
- **Containers:** 0.5rem (8px) for product cards and modals to provide a slight visual softening.
- **Interactive States:** Subtle background shifts on hover rather than aggressive shape changes.

## Components
- **Buttons:** Primary buttons are solid Professional Blue with white text. Secondary buttons use a 1px Slate border. 
- **Product Cards:** Full-width image at the top, followed by `label-sm` for category, `headline-md` for title, and `label-md` for price. Use a 1px border with no shadow on base state, adding a subtle shadow on hover.
- **Data Tables:** High-density rows with 1px bottom borders. Headers use `label-sm` with a subtle gray background. Numeric columns must use Geist for tabular lining.
- **Input Fields:** 1px border with `text-secondary` placeholder. On focus, the border transitions to Professional Blue with a soft 2px glow.
- **Chips:** Used for order status (e.g., "Shipped", "Pending"). Pill-shaped with low-opacity background tints of the semantic status colors.
- **Navigation:** Top-tier navigation uses `label-md` with 16px spacing. Active states are indicated by a 2px bottom bar in Professional Blue.