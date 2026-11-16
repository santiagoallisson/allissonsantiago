# Design padrão · allissonsantiago.com.br

Tokens e componentes vivem em `assets/site.css`. Comportamentos em `assets/site.js`.
O CSS do Tailwind é gerado: `npm install` e `npm run build` (entrada em `src/input.css`, saída em `assets/tailwind.css`, que vai versionado). Rode o build sempre que alterar classes nos HTML.

## Cores
| Uso | Token | Valor |
|---|---|---|
| Destaque / botão | `--brand-700` (purple-700) | `#8200db` |
| Hover do botão | `--brand-600` | `#9810fa` |
| Destaque no escuro | `--brand-400` | `#c27aff` |
| Superfície | zinc-100 (claro) / zinc-900 (escuro) | `#f4f4f5` / `#18181b` |
| Fundo | white / zinc-950 | `#fff` / `#09090b` |
| Texto | zinc-800, títulos zinc-950, apoio zinc-600 | |

## Tipografia
Estilo do nome "Allisson Santiago": peso leve (300) e letras espaçadas (`tracking-wider`) em títulos, menu e botões (botões em peso normal para legibilidade); texto corrido em peso normal. Família: **Segoe UI**, alternativa **Open Sans**, depois fontes do sistema (`--font-sans`).
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
- **Painel** `.panel` + `rounded-xl`: superfície lisa, cinza do cartão CRM (zinc-100 no claro, zinc-900 no escuro). Usado em apresentação, foto, contato e em construção.
- **Cartão de projeto**: `bg-zinc-100`, `p-6`, `md:col-span-4`, título + descrição + ilustração, seta no hover.
- **Botão primário**: cinza do menu (zinc-800 com texto branco no claro; zinc-100 com texto escuro no escuro), `rounded-lg`, `px-5 py-3`, `text-sm`; fica lilás (purple-400) ao passar o mouse, tocar ou focar.
- **Grade**: `max-w-6xl`, 12 colunas no desktop, `gap-6`. Raio padrão `rounded-xl`.
- **Modo escuro**: classe `dark` no `<html>`, salvo em `localStorage`, respeita o sistema.

## Ordem dos blocos de projeto
1. CRM  2. Fotografia e Edição  3. Maker

## Como adicionar um bloco
Copie um cartão de projeto em `index.html`, troque título, descrição e imagem (512x384, fundo transparente).

## Galeria (fotografia.html)
Rolagem vertical: fotos inteiras (sem corte), coladas uma na outra, coluna de 768 px (a foto horizontal `.shot--wide` chega a 1600 px quando a janela comporta), fundo branco no tema claro e preto no escuro.
Cada foto tem legenda no rodapé (`<figcaption>`, texto sobre degradê escuro). Botão circular de voltar ao topo (canto inferior direito, cinza do menu; lilás ao selecionar) aparece após rolar. O topo da página não usa fundo em degradê: título em cinza do menu.
Fotos em `assets/fotografia/foto-N.jpg` (1400 px no lado maior, sem marca d'água).
Para adicionar uma foto: grave o arquivo e copie um bloco `<figure class="shot">` em `fotografia.html`, trocando arquivo, texto alternativo e legenda.

Proteção contra download (dissuasão, não bloqueio total): escudo transparente sobre cada foto, `pointer-events: none` e `draggable=false`,
menu de contexto/arrastar/copiar bloqueados, `-webkit-touch-callout: none` no celular, atalhos Ctrl+S/P/U bloqueados, resolução reduzida.

## Endereços
Links internos usam endereços limpos (`/sobremim`, `/fotografia`, `/em-construcao`, `/`). O GitHub Pages entrega o arquivo `.html` correspondente.
Ao criar uma página nova, use o mesmo padrão nos links e no `canonical`.

## Café com (c)alma (/cafecomalma)
Página com uma carta sorteada a cada acesso. Frases em `assets/cafe-frases.js` (autor, frase, significado): para adicionar, copie um bloco e cole ao final da lista.
Sorteio no navegador: baralho embaralhado por visitante, sem repetir antes de passar por todas e nunca a mesma em seguida. Clicar na carta gira e mostra o significado.
"Compartilhar no Instagram" gera uma imagem 1080x1920 (Stories) com "Meu momento" em cinza no topo, a carta e o ícone; no celular abre o menu de compartilhamento, no computador baixa o PNG.
O botão de recarregar (ao lado) troca a carta. Ícone do rodapé: SVG inline em cinza, convertido do EPS original.
