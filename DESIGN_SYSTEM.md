# 🎨 News Feature - Component Architecture & Styling Guide

## Component Hierarchy

```
App
└── Router
    └── Root
        └── NewsPage
            ├── SocialMediaModal
            ├── Header Section
            │   └── "Share Your Post" Button → BlogSubmissionForm (modal)
            ├── Search & Filter Section
            │   ├── Search Input
            │   └── Category Filter Buttons
            ├── Blog Posts Grid
            │   └── BlogPostCard (x3, paginated)
            │       ├── Category Badge
            │       ├── Title
            │       ├── Excerpt
            │       ├── Author Card
            │       │   ├── Avatar
            │       │   └── Author Info
            │       └── Metadata (Date, Views)
            ├── Pagination Controls
            └── Newsletter Section
                └── NewsletterForm

LandingPage (Updated)
└── FeaturedBlogSection
    └── BlogPostCard (x3)
```

## Component Styling Guide

### BlogPostCard

```
┌────────────────────────────────────┐
│  [Category Badge] Primary/10 bg    │
│                                    │
│  Post Title (2 lines max)          │
│  Post Excerpt (3 lines max)        │
│                                    │
│  ┌─────────────────────────────┐  │
│  │                             │  │
│  │ [Avatar] Author Name        │  │
│  │          Author Title       │  │
│  │                             │  │
│  └─────────────────────────────┘  │
│  [Calendar] Date  [Eye] Views      │
│                                    │
│  Read Article → [Arrow]           │
└────────────────────────────────────┘
      (Hover: y: -4px, border: primary)
```

### NewsPage Header

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ✨ IT Career Insights (badge)                          ║
║                                                          ║
║  Tech Career News & Insights (h1)                      ║
║  (large text with gradient)                            ║
║                                                          ║
║  Descriptive subtitle text (p)                         ║
║                                                          ║
║  ┌──────────────────────┐                             ║
║  │ + Share Your Post    │  (if logged in)             ║
║  └──────────────────────┘                             ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### BlogSubmissionForm Modal

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  Share Your Post                                  [✕]    ║
║  ═══════════════════════════════════════════════════    ║
║                                                           ║
║  Post Title *                                            ║
║  ┌───────────────────────────────────────────────────┐  ║
║  │ Enter an engaging title...       0/100 characters  │  ║
║  └───────────────────────────────────────────────────┘  ║
║                                                           ║
║  Category *                                              ║
║  ┌───────────────────────────────────────────────────┐  ║
║  │ IT Career                                     ▼   │  ║
║  └───────────────────────────────────────────────────┘  ║
║                                                           ║
║  Excerpt *                                               ║
║  ┌───────────────────────────────────────────────────┐  ║
║  │ A short summary...           0/200 characters     │  ║
║  └───────────────────────────────────────────────────┘  ║
║                                                           ║
║  Content *                                               ║
║  ┌───────────────────────────────────────────────────┐  ║
║  │ Write your full blog post...   0/5000 characters  │  ║
║  │                                                    │  ║
║  │                                                    │  ║
║  └───────────────────────────────────────────────────┘  ║
║                                                           ║
║  ┌─────────────┐  ┌──────────────────────────────────┐  ║
║  │ Cancel      │  │ 📤 Publish Post                  │  ║
║  └─────────────┘  └──────────────────────────────────┘  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### SocialMediaModal

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  Join Our Community                           [✕]    ║
║  Follow us for daily career tips and updates         ║
║                                                       ║
║  Stay Connected:                                    ║
║                                                       ║
║  ┌──────────┐  ┌──────────┐                         ║
║  │   👍     │  │    𝕏     │                         ║
║  │ Facebook │  │ Twitter  │                         ║
║  └──────────┘  └──────────┘                         ║
║                                                       ║
║  ┌──────────┐  ┌──────────┐                         ║
║  │   💼     │  │   📸     │                         ║
║  │ LinkedIn │  │Instagram │                         ║
║  └──────────┘  └──────────┘                         ║
║                                                       ║
║  Benefits:                                          ║
║  ✓ Daily career tips & opportunities               ║
║  ✓ Exclusive job listings & updates                ║
║  ✓ Networking with professionals                   ║
║  ✓ Industry insights & trends                      ║
║                                                       ║
║  ┌─────────────────────────────────────────────┐    ║
║  │ Maybe Later                                 │    ║
║  └─────────────────────────────────────────────┘    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### NewsletterForm

```
┌──────────────────────────────────────────────────┐
│ Stay Updated                                     │
│ Get the latest IT career insights delivered    │
│ straight to your inbox                         │
│                                                 │
│  ┌────────────────────────────┐  ┌──────────┐ │
│  │ 📧 Enter your email        │  │Subscribe │ │
│  └────────────────────────────┘  └──────────┘ │
│                                                 │
│  ✓ Successfully subscribed! Check email.      │
│  (or error message if validation fails)       │
│                                                 │
│  We respect your privacy. Unsubscribe at any │
│  time.                                         │
└──────────────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
- **Primary (Indigo)**: `#4f46e5` - Used for main actions, borders, badges
- **Accent (Blue)**: `#0ea5e9` - Used for secondary actions, gradients
- **Background (Dark)**: `#030213` - Main dark background
- **Surface (Dark)**: `#0a0a1a` - Card backgrounds
- **Border**: `#ffffff` at 5-10% opacity

### Gradient Examples

```
Primary Gradient:   from-primary via-accent to-primary
                    (Indigo → Blue → Indigo)

Card Gradient:      from-primary/5 via-transparent to-accent/5
                    (Subtle accent on edges)

Social Gradients:   
  - Facebook:       from-blue-600 to-blue-400
  - Twitter:        from-slate-700 to-slate-500
  - LinkedIn:       from-blue-700 to-blue-500
  - Instagram:      from-pink-600 to-purple-600
```

## Animation Details

### Framer Motion Animations

**Blog Cards (Grid)**
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ delay: index * 0.1 }}
whileHover={{ y: -4 }}
```

**Modal Entrance**
```typescript
initial={{ scale: 0.95, opacity: 0, y: 20 }}
animate={{ scale: 1, opacity: 1, y: 0 }}
exit={{ scale: 0.95, opacity: 0, y: 20 }}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
```

**Button Interactions**
```typescript
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ type: "spring" }}
```

## Responsive Breakpoints

```
Mobile (< 768px)
├── Single column layout
├── Full-width inputs
├── Stacked buttons
└── Collapsed navigation

Tablet (768px - 1024px)
├── 2-column grid
├── Side-by-side filters
└── Flexible spacing

Desktop (> 1024px)
├── 3-column grid
├── Wide containers
├── Optimized spacing
└── Hover effects enabled
```

## Typography Hierarchy

```
h1 (Page Title)
├── size: text-5xl md:text-6xl
├── weight: font-black (900)
├── tracking: tracking-tighter
└── gradient text: from-primary via-accent to-primary

h2 (Section Titles)
├── size: text-4xl md:text-5xl
├── weight: font-black (900)
└── tracking: tracking-tight

h3 (Card Titles)
├── size: text-xl
├── weight: font-bold (700)
└── color: group-hover:text-primary

p (Body Text)
├── size: text-base md:text-lg
├── weight: font-medium (500)
└── color: text-gray-300

span (Meta/Labels)
├── size: text-xs
├── weight: font-semibold (600)
└── tracking: tracking-widest
```

## Hover & Interaction Effects

| Element | Hover Effect | Tap Effect |
|---------|--------------|-----------|
| Blog Card | `y: -4px` + Border highlight | Subtle scale |
| Title | Text color → primary | None |
| Button | `scale: 1.02` + shadow glow | `scale: 0.98` |
| Social Icon | `scale: 1.1` + gradient shift | `scale: 0.95` |
| Input | Border → primary/50 | Focus ring |
| Link | Gap expands + color change | None |

## Dark Mode Support

The entire feature is optimized for dark mode using Tailwind's `dark:` prefix:

```
Light Mode  → Light backgrounds, dark text
Dark Mode   → Dark backgrounds (#030213), light text
            → Gradient accents for contrast
```

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ Alt text for images (avatars)
- ✅ Color contrast compliance
- ✅ Focus states on form inputs
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Error message clarity
- ✅ Loading indicators

## Performance Optimizations

- 🚀 Lazy loading of images
- 🚀 Pagination prevents DOM bloat
- 🚀 Memoized components where needed
- 🚀 Debounced search input
- 🚀 CSS-in-JS only for critical styles
- 🚀 Optimized re-renders with React.memo

---

**Design System Version: 1.0**
