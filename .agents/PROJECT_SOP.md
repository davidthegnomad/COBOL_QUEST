# Project SOP — cobol-quest

> Next.js 14 web application — an interactive COBOL learning platform with Monaco editor.
> **Self-Evolving**: Agents update this file when processes change. See Self-Evolution Protocol.

---

## Environment Setup

```bash
# Navigate to project
cd 05_apps_and_extensions/in-development/cobol-quest

# Install dependencies
npm install

# Environment variables
# cp .env.example .env (if applicable)
```

## Development

```bash
# Start dev server
npm run dev

# Project runs at: http://localhost:3000
```

### Key Directories
| Directory | Purpose |
|-----------|---------|
| `app/` or `pages/` | Next.js routes and pages |
| `components/` | React components |
| `public/` | Static assets |

### Key Dependencies
- **Framework**: Next.js 14, React 18, TypeScript 5
- **UI**: Tailwind CSS v3, Framer Motion, Lucide React, tailwind-merge, clsx
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Image**: Sharp (image optimization)

### Code Conventions
- Next.js App Router (14.x patterns)
- TypeScript strict
- Tailwind CSS + tailwind-merge for styling
- ESLint with Next.js config

## Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Pre-Commit Checklist
- [ ] No linter errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] SESSION_STATE.md is updated

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Deployment Targets
| Environment | Platform | Branch/Trigger |
|-------------|----------|----------------|
| Production | Vercel / Static export | TBD |

### Post-Deploy Checklist
- [ ] Verify deployment is live
- [ ] Test Monaco editor loads correctly
- [ ] Check error monitoring
- [ ] Update SESSION_STATE.md

## Troubleshooting

### Common Issues
| Issue | Fix |
|-------|-----|
| Monaco editor blank | Ensure @monaco-editor/react is loaded client-side (use dynamic import with ssr: false) |
| Sharp install error | Install platform-specific sharp binary: `npm install sharp --platform=linux` |
| Build fails with image error | Check next.config.js image domains config |

### Emergency Procedures
- **Rollback**: Redeploy previous commit via hosting platform
- **Logs**: Next.js server console, browser devtools
- **Escalation**: Report to `02_ai_engineering/gnomad-swarm-core/`

---

*This SOP is a living document. Update it whenever processes change.*
