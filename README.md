# BuJo True Digital
Bullet Journal em React + Vite com Supabase para persistência e Tailwind/shadcn para UI.

## Rodando localmente
```sh
npm install
npm run dev
```

## Variáveis de ambiente (Supabase)
Crie um `.env.local` na raiz com:
```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```
Sem essas variáveis o app roda em modo somente leitura e mostra alerta.

### Tabelas esperadas
`projects`
- id (uuid, pk, default uuid_generate_v4)
- name (text)
- created_at (timestamp, default now)

`tasks`
- id (uuid, pk, default uuid_generate_v4)
- content (text)
- type (text) -- 'task' | 'event' | 'note'
- status (text) -- 'open' | 'done' | 'canceled' | 'migrated'
- date_str (text) -- ISO YYYY-MM-DD
- project_id (uuid, fk -> projects.id, null allowed)
- created_at (timestamp, default now)

### SQL rápido (rodar no SQL Editor do Supabase)
```sql
create extension if not exists "uuid-ossp";

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  type text not null check (type in ('task','event','note')),
  status text not null check (status in ('open','done','canceled','migrated')),
  date_str text not null,
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz default now()
);
```
Se RLS estiver ativo, crie políticas de leitura/escrita para o role `anon`/`authenticated` conforme seu uso.

## Scripts úteis
- `npm run dev` – modo dev
- `npm run build` – build de produção
- `npm run lint` – lint com ESLint
- `npm test` – testes (Vitest + RTL)
