# HighLaban - Style Guide & Documentation

## Brand Identity

**HighLaban** - India's Premium Egyptian Dessert Experience

### Brand Values
- Premium, luxurious, authentic
- Rich, creamy Egyptian desserts
- Tradition meets innovation
- Crafted with love and finest ingredients

---

## Color Palette

### Primary Colors
- **Deep Emerald Green**: `#2d8659`
  - Used for: Primary brand color, headings, navigation, buttons
  - Dark variant: `#1f5d3f` (darker backgrounds)
  - Light variant: `#3da374` (hover states, accents)

- **Rich Gold**: `#d4af37`
  - Used for: Accent color, CTAs, highlights, special elements
  - Light variant: `#e8c966` (hover states)

### Neutral Colors
- **Creamy Off-White Background**: `#faf8f3`
  - Used for: Main background, section backgrounds
- **White**: `#ffffff`
  - Used for: Card backgrounds, text on dark backgrounds
- **Text Dark**: `#2c2c2c`
  - Used for: Primary text, headings
- **Text Light**: `#666666`
  - Used for: Secondary text, descriptions
- **Text Lighter**: `#999999`
  - Used for: Tertiary text, placeholders

### CSS Variables
All colors are defined as CSS variables in `styles.css` for easy customization:
```css
--primary-green: #2d8659;
--accent-gold: #d4af37;
--bg-cream: #faf8f3;
--text-dark: #2c2c2c;
--text-light: #666666;
```

---

## Typography

### Font Families

1. **Headings**: `'Playfair Display', serif`
   - Elegant, refined serif font
   - Used for: Main headings, hero headline, section titles, product names
   - Weights: 400 (regular), 600 (semi-bold), 700 (bold)

2. **Body Text**: `'Inter', sans-serif`
   - Modern, clean sans-serif font
   - Used for: Body text, navigation, buttons, descriptions
   - Weights: 300 (light), 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)

### Font Sizes

- **Hero Headline**: `clamp(2.5rem, 8vw, 5rem)` - Responsive, scales with viewport
- **Section Titles**: `clamp(2rem, 5vw, 3.5rem)` - Responsive
- **Product Names**: `1.5rem`
- **Body Text**: `1rem` - `1.1rem`
- **Small Text**: `0.85rem` - `0.95rem`

### Line Heights
- Headings: `1.2`
- Body text: `1.6` - `1.8`

---

## Spacing Guidelines

### Section Padding
- Desktop: `80px` top and bottom
- Mobile: `60px` top and bottom

### Container Max Width
- Main container: `1200px`
- Padding: `20px` on mobile, responsive on larger screens

### Grid Gaps
- Product grid: `2rem`
- Feature cards: `2rem`
- Footer sections: `3rem`

### Element Spacing
- Between sections: `4rem` margin-bottom
- Card padding: `1.5rem` - `2rem`
- Button padding: `14px 32px`

---

## Component Styles

### Buttons

**Primary Button** (Gold)
- Background: `var(--accent-gold)`
- Text: Dark
- Border radius: `50px` (fully rounded)
- Hover: Lighter gold, slight lift with shadow

**Secondary Button** (Outline)
- Background: Transparent
- Border: `2px solid`
- Hover: Filled background, color change

**CTA Buttons**
- Minimum size: `14px 32px` padding
- Font weight: `600`
- Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Cards

**Product Cards**
- Background: White
- Border radius: `20px`
- Shadow: `var(--shadow-sm)` default, `var(--shadow-lg)` on hover
- Hover: `translateY(-8px)` lift effect
- Image aspect ratio: `60%` padding (maintains 5:3 ratio)

**Feature Cards**
- Border: `2px solid var(--primary-green)`
- Border radius: `15px`
- Hover: Border color changes to gold, slight right shift

### Navigation

- Fixed position at top
- Background: `rgba(255, 255, 255, 0.95)` with backdrop blur
- Height: Auto, padding `1rem`
- Logo: `1.75rem`, Playfair Display, bold
- Links: `0.95rem`, medium weight
- Active indicator: Gold underline on hover

---

## Animations & Transitions

### Standard Transition
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Key Animations

1. **Fade In Up**: Elements fade in and slide up on scroll
2. **Parallax**: Hero background moves at different speed
3. **Hover Lift**: Cards lift on hover with shadow increase
4. **Scale**: Buttons scale down slightly on click
5. **Slide In**: Side elements slide in from left/right

### Animation Timing
- Fade in: `0.6s - 0.8s` ease-out
- Hover transitions: `0.3s`
- Stagger delays: `0.1s` increments for grid items

---

## Responsive Breakpoints

### Mobile First Approach

- **Default**: Mobile styles (up to 640px)
- **Tablet**: `640px - 968px`
- **Desktop**: `968px+`

### Key Responsive Changes

**Mobile (< 640px)**
- Single column layouts
- Stacked navigation menu (hamburger)
- Full-width buttons
- Reduced padding and margins
- Smaller font sizes

**Tablet (640px - 968px)**
- 2-column grids where appropriate
- Horizontal navigation
- Adjusted spacing

**Desktop (968px+)**
- Multi-column grids (3-4 columns)
- Full navigation visible
- Maximum container width: `1200px`

---

## Image Guidelines

### Placeholder Structure
Currently using CSS placeholders with descriptive text. When replacing:

1. **Hero Image/Video**
   - Format: WebP or optimized JPG
   - Size: 1920x1080px minimum
   - Content: Dessert being served/spooned, creamy textures
   - Aspect ratio: 16:9

2. **Product Images**
   - Format: WebP
   - Size: 800x600px
   - Content: High-quality close-ups of desserts
   - Aspect ratio: 4:3
   - Lazy loading: Implement with `data-src` attribute

3. **About/Story Images**
   - Format: WebP
   - Size: 1200x800px
   - Content: Storefront, team, preparation process
   - Aspect ratio: 3:2

### Image Optimization
- Use WebP format for better compression
- Implement lazy loading for below-fold images
- Provide alt text for accessibility
- Use `srcset` for responsive images

---

## Content Guidelines

### Brand Taglines
- "India's Premium Egyptian Dessert Experience"
- "Creamy. Dreamy. HighLaban."
- "Smooth. Silky. Authentic."
- "Authenticity You Can Taste."
- "Egypt's Sweetest Secret — Now in India."
- "Made with Love, Crafted with Tradition."

### Tone of Voice
- Premium and luxurious
- Warm and inviting
- Authentic and traditional
- Modern and innovative
- Descriptive and sensory

### Product Descriptions
- Focus on texture: "creamy", "silky", "smooth"
- Highlight ingredients: "finest", "premium", "authentic"
- Emphasize experience: "unforgettable", "delightful", "indulgent"

---

## Accessibility

### Best Practices Implemented
- Semantic HTML5 elements
- ARIA labels for icons
- Alt text placeholders for images
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast ratios
- Responsive text sizes

### To Add
- Skip to main content link
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences

---

## Performance

### Optimization Techniques
- CSS variables for efficient theming
- Smooth scroll behavior
- Intersection Observer for animations
- Lazy loading ready (structure in place)
- Minimal JavaScript dependencies
- Efficient CSS selectors

### Recommendations
- Minify CSS and JavaScript for production
- Use CDN for fonts (already implemented)
- Implement image lazy loading
- Add service worker for offline support
- Optimize images before upload

---

## Browser Support

### Target Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- CSS Grid with flexbox fallback
- Modern CSS with vendor prefixes where needed
- JavaScript feature detection for advanced features

---

## File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling and theme
├── script.js           # Interactions and animations
└── STYLE_GUIDE.md      # This document
```

---

## Next Steps

### Content Updates
1. Replace placeholder images with high-quality photography
2. Update store locations with real addresses
3. Add real contact information
4. Implement newsletter backend integration

### Enhancements
1. Add Google Maps integration for store locator
2. Implement product detail modals
3. Add shopping cart functionality (if e-commerce)
4. Create blog section for recipes/stories
5. Add customer testimonials section
6. Implement social media feed integration

### Technical
1. Set up build process (minification, optimization)
2. Add analytics tracking
3. Implement SEO meta tags
4. Add structured data (Schema.org)
5. Set up form handling backend
6. Add error pages (404, etc.)

---

## Contact & Support

For questions about this style guide or website structure, refer to the code comments or update this document as the brand evolves.

**Remember**: Consistency is key. Always refer to this guide when making design decisions to maintain brand integrity.

