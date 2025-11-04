# AnyDebate AI Design System

> **Version:** 1.0.0  
> **Last Updated:** January 2025  
> **Status:** Active

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Component Architecture](#component-architecture)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Best Practices](#best-practices)
10. [Common Patterns](#common-patterns)

---

## Overview

The AnyDebate AI design system is built on **Tailwind CSS v4** with **shadcn/ui** components, using **OKLCH color space** for superior color consistency across light and dark themes. The system prioritizes:

- **Mobile-first responsive design**
- **Semantic design tokens** for theme consistency
- **Accessibility** (WCAG 2.1 AA compliance)
- **Component composability** with Radix UI primitives
- **Type safety** with TypeScript and CVA (Class Variance Authority)

### Technology Stack

- **CSS Framework:** Tailwind CSS v4 (with `@theme inline` configuration)
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Color Space:** OKLCH (perceptually uniform)
- **Fonts:** Geist Sans & Geist Mono
- **Utility Function:** `cn()` (clsx + tailwind-merge)
- **Animation:** Framer Motion + tw-animate-css

---

## Design Principles

### 1. Mobile-First Approach

All layouts and components are designed for mobile devices first, then progressively enhanced for larger screens.

\`\`\`tsx
// ✅ Correct: Mobile-first responsive design
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <div className="w-full md:w-1/2">Content</div>
</div>

// ❌ Wrong: Desktop-first approach
<div className="flex flex-row gap-8 sm:flex-col sm:gap-4">
  <div className="w-1/2 sm:w-full">Content</div>
</div>
\`\`\`

### 2. Semantic Design Tokens

Always use semantic color tokens instead of direct colors to ensure theme consistency.

\`\`\`tsx
// ✅ Correct: Semantic tokens
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ Wrong: Direct colors
<div className="bg-white text-black border-gray-200">
  <h1 className="text-blue-600">Title</h1>
  <p className="text-gray-500">Description</p>
</div>
\`\`\`

### 3. Component Composability

Components are built with composition in mind, using the `cn()` utility for flexible styling.

\`\`\`tsx
// ✅ Correct: Composable with cn()
<Button className={cn("w-full", isLoading && "opacity-50")}>
  Submit
</Button>

// ❌ Wrong: Inline styles or string concatenation
<Button style={{ width: "100%", opacity: isLoading ? 0.5 : 1 }}>
  Submit
</Button>
\`\`\`

---

## Color System

### Design Token Architecture

The color system uses **CSS custom properties** defined in `app/globals.css` and mapped to Tailwind utilities via `@theme inline`.

#### Token Structure

\`\`\`css
:root {
  /* Semantic color tokens */
  --background: oklch(0.98 0 0);           /* Page background */
  --foreground: oklch(0.15 0 0);           /* Primary text */
  --card: oklch(0.95 0 0);                 /* Card backgrounds */
  --card-foreground: oklch(0.15 0 0);      /* Card text */
  --primary: oklch(0.15 0 0);              /* Primary actions */
  --primary-foreground: oklch(0.98 0 0);   /* Text on primary */
  --muted: oklch(0.92 0 0);                /* Muted backgrounds */
  --muted-foreground: oklch(0.45 0 0);     /* Muted text */
  --border: oklch(0.88 0 0);               /* Border color */
  --ring: oklch(0.6 0 0);                  /* Focus rings */
  /* ... more tokens */
}

.dark {
  /* Dark theme overrides */
  --background: oklch(0.04 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.7 0.15 240);          /* Blue accent in dark */
  /* ... more tokens */
}
\`\`\`

### Available Color Tokens

| Token | Usage | Light Theme | Dark Theme |
|-------|-------|-------------|------------|
| `background` | Page/app background | `oklch(0.98 0 0)` | `oklch(0.04 0 0)` |
| `foreground` | Primary text color | `oklch(0.15 0 0)` | `oklch(0.95 0 0)` |
| `card` | Card/panel backgrounds | `oklch(0.95 0 0)` | `oklch(0.06 0 0)` |
| `card-foreground` | Text on cards | `oklch(0.15 0 0)` | `oklch(0.95 0 0)` |
| `primary` | Primary brand color | `oklch(0.15 0 0)` | `oklch(0.7 0.15 240)` |
| `primary-foreground` | Text on primary | `oklch(0.98 0 0)` | `oklch(0.04 0 0)` |
| `secondary` | Secondary actions | `oklch(0.92 0 0)` | `oklch(0.1 0 0)` |
| `muted` | Muted backgrounds | `oklch(0.92 0 0)` | `oklch(0.08 0 0)` |
| `muted-foreground` | Muted text | `oklch(0.45 0 0)` | `oklch(0.6 0 0)` |
| `accent` | Accent backgrounds | `oklch(0.88 0 0)` | `oklch(0.12 0 0)` |
| `destructive` | Error/danger states | `oklch(0.577 0.245 27.325)` | `oklch(0.6 0.2 25)` |
| `border` | Border color | `oklch(0.88 0 0)` | `oklch(0.12 0 0)` |
| `input` | Input backgrounds | `oklch(0.92 0 0)` | `oklch(0.08 0 0)` |
| `ring` | Focus ring color | `oklch(0.6 0 0)` | `oklch(0.7 0.15 240)` |

### Sidebar-Specific Tokens

| Token | Usage |
|-------|-------|
| `sidebar` | Sidebar background |
| `sidebar-foreground` | Sidebar text |
| `sidebar-primary` | Sidebar active state |
| `sidebar-accent` | Sidebar hover state |
| `sidebar-border` | Sidebar borders |

### Chart Colors

Five chart colors are provided for data visualization:

\`\`\`tsx
// Usage in charts
<Bar dataKey="value" fill="hsl(var(--chart-1))" />
<Line dataKey="value" stroke="hsl(var(--chart-2))" />
\`\`\`

### Usage Examples

\`\`\`tsx
// Background and text
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Muted text</p>
</div>

// Cards
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription className="text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
</Card>

// Buttons
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Action
</Button>

// Focus states
<input className="border-input focus:ring-ring focus:ring-2" />
\`\`\`

---

## Typography

### Font System

The design system uses **Geist Sans** for UI text and **Geist Mono** for code.

#### Font Configuration

\`\`\`css
/* globals.css */
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
\`\`\`

\`\`\`tsx
// layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
\`\`\`

### Font Classes

\`\`\`tsx
// Sans-serif (default)
<p className="font-sans">UI text</p>

// Monospace
<code className="font-mono">Code snippet</code>
\`\`\`

### Typography Scale

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Captions, labels |
| `text-sm` | 0.875rem (14px) | 1.25rem | Body text (small) |
| `text-base` | 1rem (16px) | 1.5rem | Body text (default) |
| `text-lg` | 1.125rem (18px) | 1.75rem | Large body text |
| `text-xl` | 1.25rem (20px) | 1.75rem | Subheadings |
| `text-2xl` | 1.5rem (24px) | 2rem | Headings |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Large headings |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Hero text |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasis |
| `font-semibold` | 600 | Headings, buttons |
| `font-bold` | 700 | Strong emphasis |

### Line Height Best Practices

\`\`\`tsx
// ✅ Correct: Readable line heights
<p className="text-base leading-relaxed">
  Body text with comfortable line height (1.625)
</p>

<h1 className="text-3xl leading-tight">
  Heading with tighter line height (1.25)
</h1>

// ❌ Wrong: Too tight for body text
<p className="text-base leading-none">
  Hard to read body text
</p>
\`\`\`

### Text Utilities

\`\`\`tsx
// Text balance (optimal line breaks)
<h1 className="text-balance">
  Long heading that breaks optimally
</h1>

// Text pretty (avoid orphans)
<p className="text-pretty">
  Paragraph text with better line breaks
</p>

// Truncation
<p className="truncate">Very long text that gets cut off...</p>
<p className="line-clamp-3">Text limited to 3 lines...</p>
\`\`\`

---

## Spacing & Layout

### Spacing Scale

Tailwind's spacing scale is based on `0.25rem` (4px) increments:

| Class | Value | Pixels |
|-------|-------|--------|
| `p-1` / `m-1` | 0.25rem | 4px |
| `p-2` / `m-2` | 0.5rem | 8px |
| `p-3` / `m-3` | 0.75rem | 12px |
| `p-4` / `m-4` | 1rem | 16px |
| `p-6` / `m-6` | 1.5rem | 24px |
| `p-8` / `m-8` | 2rem | 32px |
| `p-12` / `m-12` | 3rem | 48px |

### Layout Method Priority

**Use in this order:**

1. **Flexbox** (for most layouts)
2. **CSS Grid** (for complex 2D layouts)
3. **Absolute positioning** (only when necessary)

#### Flexbox Examples

\`\`\`tsx
// Horizontal layout with gap
<div className="flex items-center gap-4">
  <Icon />
  <span>Text</span>
</div>

// Vertical stack
<div className="flex flex-col gap-6">
  <Section1 />
  <Section2 />
</div>

// Space between
<div className="flex items-center justify-between">
  <Logo />
  <Navigation />
</div>
\`\`\`

#### Grid Examples

\`\`\`tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <Item />
  <Item />
</div>
\`\`\`

### Container Patterns

\`\`\`tsx
// Page container
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <Content />
</div>

// Max-width constraint
<div className="max-w-7xl mx-auto">
  <Content />
</div>

// Full-height layout
<div className="flex flex-col h-screen">
  <Header />
  <main className="flex-1 overflow-auto">
    <Content />
  </main>
  <Footer />
</div>
\`\`\`

### Border Radius

\`\`\`css
/* globals.css */
:root {
  --radius: 0.75rem; /* 12px */
}
\`\`\`

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | `calc(var(--radius) - 4px)` | Small elements |
| `rounded-md` | `calc(var(--radius) - 2px)` | Buttons, inputs |
| `rounded-lg` | `var(--radius)` | Cards, panels |
| `rounded-xl` | `calc(var(--radius) + 4px)` | Large containers |
| `rounded-full` | `9999px` | Circles, pills |

---

## Component Architecture

### The `cn()` Utility

All components use the `cn()` utility function for className merging:

\`\`\`tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
\`\`\`

**Benefits:**
- Merges Tailwind classes intelligently (no conflicts)
- Supports conditional classes
- Type-safe with TypeScript

\`\`\`tsx
// Usage
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // Allow external overrides
)} />
\`\`\`

### Component Variants (CVA)

Components use **Class Variance Authority** for type-safe variants:

\`\`\`tsx
// Example: Button component
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// Usage
<Button variant="outline" size="lg">Click me</Button>
\`\`\`

### Component Composition Pattern

\`\`\`tsx
// Card component structure
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>
      <Button>Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
\`\`\`

### Data Slots

Components use `data-slot` attributes for styling hooks:

\`\`\`tsx
// Component definition
<div data-slot="card-header" className="...">
  {children}
</div>

// Styling based on slots
<Card className="[&_[data-slot=card-header]]:border-b">
  <CardHeader>...</CardHeader>
</Card>
\`\`\`

---

## Responsive Design

### Breakpoint System

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Mobile-First Patterns

\`\`\`tsx
// ✅ Correct: Mobile-first
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>
  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
    <Sidebar className="w-full md:w-64" />
    <Main className="flex-1" />
  </div>
</div>

// ❌ Wrong: Desktop-first
<div className="p-8 md:p-6 sm:p-4">
  <h1 className="text-4xl md:text-3xl sm:text-2xl">Title</h1>
</div>
\`\`\`

### Responsive Utilities

\`\`\`tsx
// Hide/show at breakpoints
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Item />
</div>

// Responsive text alignment
<p className="text-center md:text-left">Text</p>
\`\`\`

### Container Queries

Use `@container` for component-level responsiveness:

\`\`\`tsx
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    <Item />
  </div>
</div>
\`\`\`

---

## Accessibility

### Focus States

All interactive elements have visible focus indicators:

\`\`\`tsx
// Default focus ring
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Button
</button>

// Custom focus styles
<input className="focus:border-primary focus:ring-2 focus:ring-primary/20" />
\`\`\`

### Screen Reader Support

\`\`\`tsx
// Visually hidden text
<span className="sr-only">Screen reader only text</span>

// ARIA labels
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// ARIA descriptions
<input aria-describedby="email-help" />
<p id="email-help" className="text-sm text-muted-foreground">
  We'll never share your email
</p>
\`\`\`

### Reduced Motion

\`\`\`css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\`\`\`

### Color Contrast

All color combinations meet **WCAG 2.1 AA** standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

---

## Best Practices

### 1. Always Use Semantic Tokens

\`\`\`tsx
// ✅ Correct
<div className="bg-card text-card-foreground border-border">
  <p className="text-muted-foreground">Text</p>
</div>

// ❌ Wrong
<div className="bg-white text-black border-gray-200 dark:bg-gray-900 dark:text-white">
  <p className="text-gray-500 dark:text-gray-400">Text</p>
</div>
\`\`\`

### 2. Prefer Tailwind Scale Over Arbitrary Values

\`\`\`tsx
// ✅ Correct
<div className="p-4 gap-6 rounded-lg">

// ❌ Wrong
<div className="p-[16px] gap-[24px] rounded-[12px]">
\`\`\`

### 3. Use Gap Instead of Margin for Spacing

\`\`\`tsx
// ✅ Correct
<div className="flex gap-4">
  <Item />
  <Item />
</div>

// ❌ Wrong
<div className="flex">
  <Item className="mr-4" />
  <Item />
</div>
\`\`\`

### 4. Mobile-First Responsive Design

\`\`\`tsx
// ✅ Correct
<div className="w-full md:w-1/2 lg:w-1/3">

// ❌ Wrong
<div className="w-1/3 lg:w-1/2 md:w-full">
\`\`\`

### 5. Compose with cn()

\`\`\`tsx
// ✅ Correct
<Button className={cn("w-full", isLoading && "opacity-50", className)}>

// ❌ Wrong
<Button className={`w-full ${isLoading ? 'opacity-50' : ''} ${className}`}>
\`\`\`

### 6. Use Component Variants

\`\`\`tsx
// ✅ Correct
<Button variant="outline" size="sm">Click</Button>

// ❌ Wrong
<Button className="border bg-transparent h-8 px-3">Click</Button>
\`\`\`

---

## Common Patterns

### Layout Patterns

#### Two-Column Layout

\`\`\`tsx
<div className="flex flex-col md:flex-row gap-6">
  <aside className="w-full md:w-64 shrink-0">
    <Sidebar />
  </aside>
  <main className="flex-1 min-w-0">
    <Content />
  </main>
</div>
\`\`\`

#### Three-Column Layout (Dual Sidebar)

\`\`\`tsx
<div className="flex h-screen">
  {/* Main navigation sidebar */}
  <aside className="w-64 border-r border-border">
    <DashboardSidebar />
  </aside>
  
  {/* Secondary sidebar */}
  <aside className="w-80 border-r border-border">
    <FiltersSidebar />
  </aside>
  
  {/* Main content */}
  <main className="flex-1 min-w-0 overflow-auto">
    <Content />
  </main>
</div>
\`\`\`

#### Full-Height Scrollable Layout

\`\`\`tsx
<div className="flex flex-col h-screen">
  <header className="border-b border-border">
    <Header />
  </header>
  <main className="flex-1 min-h-0 overflow-auto">
    <Content />
  </main>
</div>
\`\`\`

### Card Patterns

#### Basic Card

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
\`\`\`

#### Card with Action

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
\`\`\`

### Form Patterns

\`\`\`tsx
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="you@example.com"
      className="w-full"
    />
    <p className="text-sm text-muted-foreground">
      We'll never share your email
    </p>
  </div>
  
  <div className="flex gap-4">
    <Button type="submit" className="flex-1">
      Submit
    </Button>
    <Button type="button" variant="outline">
      Cancel
    </Button>
  </div>
</form>
\`\`\`

### Modal/Dialog Patterns

\`\`\`tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### Loading States

\`\`\`tsx
// Skeleton loading
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-2/3" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-32 w-full" />
  </CardContent>
</Card>

// Spinner loading
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin" />
  Loading...
</Button>
\`\`\`

### Empty States

\`\`\`tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No items found</h3>
  <p className="text-muted-foreground mb-4">
    Get started by creating your first item
  </p>
  <Button>
    <Plus className="h-4 w-4" />
    Create Item
  </Button>
</div>
\`\`\`

---

## Special Effects

### Glass Effect

\`\`\`tsx
<div className="glass-effect rounded-lg p-6">
  Content with glass morphism effect
</div>
\`\`\`

### Grid Pattern Background

\`\`\`tsx
// Subtle grid
<div className="grid-pattern min-h-screen">
  <Content />
</div>

// Large grid
<div className="grid-pattern-large min-h-screen">
  <Content />
</div>

// Dashboard grid
<div className="dashboard-grid min-h-screen">
  <Content />
</div>
\`\`\`

### Metric Card

\`\`\`tsx
<div className="metric-card rounded-lg p-6">
  <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
  <p className="text-3xl font-bold">1,234</p>
</div>
\`\`\`

---

## Migration Guide

### From Direct Colors to Semantic Tokens

\`\`\`tsx
// Before
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  <p className="text-gray-500 dark:text-gray-400">Text</p>
</div>

// After
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Text</p>
</div>
\`\`\`

### From Arbitrary Values to Scale

\`\`\`tsx
// Before
<div className="p-[20px] gap-[16px] rounded-[8px]">

// After
<div className="p-5 gap-4 rounded-lg">
\`\`\`

### From Margin to Gap

\`\`\`tsx
// Before
<div className="flex">
  <div className="mr-4">Item 1</div>
  <div className="mr-4">Item 2</div>
  <div>Item 3</div>
</div>

// After
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

---

## Troubleshooting

### Issue: Colors not updating in dark mode

**Solution:** Ensure you're using semantic tokens, not direct colors:

\`\`\`tsx
// ❌ Wrong
<div className="bg-white text-black">

// ✅ Correct
<div className="bg-background text-foreground">
\`\`\`

### Issue: Tailwind classes not applying

**Solution:** Use `cn()` utility to merge classes properly:

\`\`\`tsx
// ❌ Wrong
<div className={`base-class ${conditionalClass}`}>

// ✅ Correct
<div className={cn("base-class", conditionalClass)}>
\`\`\`

### Issue: Layout breaking on mobile

**Solution:** Follow mobile-first approach:

\`\`\`tsx
// ❌ Wrong
<div className="flex-row md:flex-col">

// ✅ Correct
<div className="flex-col md:flex-row">
\`\`\`

### Issue: Focus ring not visible

**Solution:** Use `focus-visible:` instead of `focus:`:

\`\`\`tsx
// ❌ Wrong
<button className="focus:ring-2">

// ✅ Correct
<button className="focus-visible:ring-2 focus-visible:ring-ring">
\`\`\`

---

## Resources

- **Tailwind CSS v4 Docs:** https://tailwindcss.com/docs
- **shadcn/ui Components:** https://ui.shadcn.com
- **Radix UI Primitives:** https://www.radix-ui.com
- **OKLCH Color Picker:** https://oklch.com
- **CVA Documentation:** https://cva.style

---

## Changelog

### Version 1.0.0 (January 2025)
- Initial design system documentation
- OKLCH color system implementation
- Tailwind CSS v4 migration
- Mobile-first responsive patterns
- Accessibility guidelines
