# Next.js Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth scrolling navigation, dark/light theme support, and a clean, professional design.

## Features

- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Support**: Dark/light mode toggle with next-themes
- **Smooth Navigation**: Scroll-based navigation between sections
- **Performance Optimized**: Uses Turbopack for fast development
- **Accessibility**: Built with accessibility best practices
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide React icons
- **Theme**: next-themes for dark/light mode
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Development**: Turbopack for fast builds

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Layout components
│   │   └── Header.tsx     # Navigation header
│   ├── sections/          # Page sections
│   │   └── Hero.tsx       # Hero section
│   ├── theme/             # Theme components
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   └── ui/                # Reusable UI components
│       └── button.tsx
├── hooks/                 # Custom React hooks
│   ├── use-scroll.ts      # Scroll position hook
│   └── use-theme.ts       # Theme management hook
├── lib/                   # Utility functions
│   ├── constants.ts       # App constants
│   └── utils.ts           # Helper utilities
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Sections

The portfolio includes the following sections:

- **Hero**: Introduction and main call-to-action
- **About**: Personal information and background
- **Experience**: Work history and achievements
- **Skills**: Technical skills and expertise
- **Contact**: Contact information and form

## Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Update navigation in `src/components/layout/Header.tsx`

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles: Use Tailwind classes

### Theme Customization

The theme system supports:

- CSS custom properties for colors
- Automatic dark/light mode detection
- Manual theme toggle
- System preference respect

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms

This Next.js app can be deployed on any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Performance

- Uses Next.js 15 with Turbopack for fast development
- Optimized fonts with `next/font`
- Image optimization with `next/image`
- CSS-in-JS with zero runtime overhead
- Tree-shaking for minimal bundle size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
