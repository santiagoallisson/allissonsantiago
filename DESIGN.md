# Design padrão · allissonsantiago.com.br

Tokens e componentes vivem em `assets/site.css`. Comportamentos em `assets/site.js`.
Todas as páginas usam Tailwind (CDN, versão fixada) + esses dois arquivos.

## Cores
| Uso | Token | Valor |
|---|---|---|
| Destaque / botão | `--brand-700` (purple-700) | `#8200db` |
| Hover do botão | `--brand-600` | `#9810fa` |
| Destaque no escuro | `--brand-400` | `#c27aff` |
| Brilho dos cartões | pink-300 / indigo-200 / purple-200 | `#fda5d5` / `#c7d2fe` / `#e9d5ff` |
| Véu do brilho | purple-100 a 50% (claro), purple-900 a 75% (escuro) | |
| Superfície | zinc-100 (claro) / zinc-900 (escuro) | `#f4f4f5` / `#18181b` |
| Fundo | white / zinc-950 | `#fff` / `#09090b` |
| Texto | zinc-800, títulos zinc-950, apoio zinc-600 | |

## Tipografia
Família: **Segoe UI**, alternativa **Open Sans**, depois fontes do sistema (`--font-sans`).
Segoe UI é a fonte do perfil no Instagram, mas é proprietária e só existe no Windows;
por isso Open Sans (humanista, muito próxima) cobre Mac, Android e iOS.

| Elemento | Estilo |
|---|---|
| Logo | 24px, light (300), tracking-widest |
| H1 / H2 de seção | 36px, semibold (600) |
| Título de cartão (H3) | 18px, semibold |
| Texto corrido | base, leading-relaxed, **justificado** (`.justify`) |
| Descrição de cartão / lista | 14px, zinc-600 |

## Componentes
- **Cartão com brilho** `.glow` + `rounded-xl`: apresentação, foto, contato, em construção.
- **Cartão de projeto**: `bg-zinc-100`, `p-6`, `md:col-span-4`, título + descrição + ilustração, seta no hover.
- **Botão primário**: `bg-purple-700`, branco, `rounded-lg`, `px-5 py-3`, `text-sm font-semibold`.
- **Grade**: `max-w-6xl`, 12 colunas no desktop, `gap-6`. Raio padrão `rounded-xl`.
- **Modo escuro**: classe `dark` no `<html>`, salvo em `localStorage`, respeita o sistema.

## Ordem dos blocos de projeto
1. CRM  2. Fotografia e Edição  3. Maker

## Como adicionar um bloco
Copie um cartão de projeto em `index.html`, troque título, descrição e imagem (512x384, fundo transparente).
