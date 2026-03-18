# Wellington e Dyanna Nascimento

Landing page estática para apresentar o trabalho de Wellington e Dyanna em Gurinhém, no Agreste da Paraíba, com foco em confiança, clareza narrativa e apoio financeiro/relacional.

## Stack

- React 19
- Vite 7
- Tailwind CSS v4
- Vercel
- Vitest + Testing Library

## Scripts

```bash
npm install
npm run dev
npm run test
npm run lint
npm run build
npm run preview
```

## Onde editar conteúdo

O ponto principal de edição da landing é [`src/content/site.ts`](./src/content/site.ts).

Lá ficam:

- SEO e social preview
- hero
- stats
- seção "Quem somos"
- Pix / WhatsApp / compartilhar
- footer

As coleções continuam separadas e são consumidas por `site.ts`:

- [`src/content/initiatives.ts`](./src/content/initiatives.ts)
- [`src/content/updates.ts`](./src/content/updates.ts)

## Convenções de assets

Arquivos publicados pela landing ficam em `public/images/`.

Assets usados pela página hoje:

- `hero-desktop.jpg`
- `hero-mobile.jpg`
- `frente-igreja-card.jpg`
- `frente-lumine-card.jpg`
- `casa-1-optimized.jpg`
- `og-cover.jpg`

Diretrizes:

- hero desktop: até `350 KB`
- hero mobile: até `200 KB`
- imagens de seção: até `180 KB` sempre que possível
- capa social: `1200x630`
- manter nomes estáveis para evitar mudanças em componentes

Se entrar uma foto nova, substitua o arquivo otimizado correspondente em vez de mudar o caminho no código.

## SEO

Os metadados do HTML são preenchidos a partir de `site.ts` via `transformIndexHtml` no `vite.config.ts`.

Isso controla:

- `title`
- `description`
- canonical
- Open Graph
- Twitter card
- JSON-LD

## Deploy

O projeto está preparado para Vercel com:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`

Arquivo: [`vercel.json`](./vercel.json)
