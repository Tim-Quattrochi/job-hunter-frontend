# Job Hunter Frontend

> A modern job application tracking platform built with Next.js 15 and Tailwind CSS

## Overview

This is the frontend client for the Job Hunter platform, a decoupled SaaS application that helps job seekers streamline their application process with AI-powered job matching and application tracking.

## Tech Stack

- **Framework:** Next.js 15+ (React 19) with App Router
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4
- **UI Library:** Shadcn/UI (built on Tailwind CSS and Radix UI)
- **State Management:** Zustand (to be added in future stories)
- **Authentication:** Stack Auth (to be configured in Story 1.1)
- **API Client:** Native `fetch` API with Server Components and Server Actions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Version 20+ (LTS recommended)
- **npm:** Version 10+ (comes with Node.js 20+)
- **Git:** For version control

## Local Setup

### 1. Clone the repository

```bash
git clone git@github.com:Tim-Quattrochi/job-hunter-frontend.git
cd job-hunter-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in the required values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# Backend API URL (FastAPI server)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Stack Auth credentials (obtain from Stack Auth dashboard)
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key_here
STACK_SECRET_SERVER_KEY=your_secret_key_here
```

#### Where to find Stack Auth credentials

1. Log in to your Stack Auth dashboard at [https://stack-auth.com](https://stack-auth.com)
2. Navigate to your "Job Hunter" project
3. Go to the **API Keys** section
4. Copy the following values:
   - **Project ID** → `NEXT_PUBLIC_STACK_PROJECT_ID`
   - **Publishable Client Key** → `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - **Secret Server Key** → `STACK_SECRET_SERVER_KEY` (keep this secure!)

**Security Note:** Never commit your `.env.local` file. The `STACK_SECRET_SERVER_KEY` should be kept confidential.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the production server (requires build first) |
| `npm run lint` | Runs ESLint to check for code quality issues |

## Project Structure

```plaintext
job-hunter-frontend/
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx            # Root layout (defines global structure)
│   ├── page.tsx              # Home page (/)
│   └── globals.css           # Global styles with Tailwind imports
├── components/               # React components
│   └── ui/                   # Shadcn/UI components (auto-generated)
│       ├── button.tsx        # Button component
│       └── skeleton.tsx      # Skeleton loader component
├── lib/                      # Utility functions and helpers
│   └── utils.ts              # Shadcn/UI utilities (cn helper)
├── types/                    # TypeScript type definitions
├── public/                   # Static assets (images, fonts, etc.)
├── .env.local                # Local environment variables (gitignored)
├── .env.local.example        # Environment variable template
├── components.json           # Shadcn/UI configuration
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Architecture

This frontend is part of a **polyrepo architecture**:

- **Frontend Repository:** [job-hunter-frontend](https://github.com/Tim-Quattrochi/job-hunter-frontend) (this repo)
- **Backend Repository:** `job-hunter-backend` (to be created in Story 0.2)

### Key Architecture Decisions

1. **App Router (Not Pages Router):** Uses Next.js 15+ App Router for better performance and Server Components
2. **Server Components First:** Renders on the server by default; only uses `'use client'` when necessary
3. **TypeScript Strict Mode:** Enforces type safety across the entire codebase
4. **Shadcn/UI Copy-Paste Model:** Components are copied into your project (not installed as dependencies) for full customization

## Development Guidelines

### Adding Shadcn/UI Components

To add new UI components from Shadcn/UI:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add input
```

Components will be added to `components/ui/`.

### TypeScript Configuration

This project uses TypeScript strict mode. Key settings in `tsconfig.json`:

- `strict: true` - Enables all strict type checking options
- Path aliases configured: `@/` points to the root directory

### Tailwind CSS v4

Tailwind CSS v4 is imported directly in `app/globals.css`. There is **no separate `tailwind.config.ts`** file in v4 - all configuration is done via CSS.

## Related Documentation

- [Product Requirements Document (PRD)](../docs/prd.md)
- [Architecture Document](../docs/architecture.md)
- [Story 0.1: Frontend Project Initialization](../docs/stories/0.1.frontend-project-initialization.md)

## Deployment

This project is configured for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to `main` branch

Deployment configuration will be finalized in a future story.

## Next Steps

After initial setup, the following stories will build upon this foundation:

- **Story 0.2:** Backend project initialization (FastAPI)
- **Story 0.3:** Configure services (Neon DB, Stack Auth, Redis)
- **Story 1.1:** User registration and authentication

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved
