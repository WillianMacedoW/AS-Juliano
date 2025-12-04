# Mini E-commerce em React

Aplicação completa de mini e-commerce construída com **React + Vite**, **React Router v6**, **Context API**, **TailwindCSS** e **JSON Server**. O projeto implementa catálogo de produtos, carrinho global com regras de estoque, cadastro/edição e páginas dedicadas, seguindo a arquitetura solicitada.

## Funcionalidades principais
- Listagem de produtos com busca via JSON Server e destaque para itens esgotados.
- Detalhes do produto com botão de adicionar ao carrinho respeitando o estoque disponível.
- Carrinho global usando Context API, com aumento/diminuição de quantidade, remoção e total geral.
- Formulário reutilizável de cadastro e edição com validações (campos obrigatórios, preço/estoque ≥ 0) e foco automático no primeiro erro via `useRef`.
- Rotas protegidas contra erros (404) e navegação principal com header fixo.

## Pré-requisitos
- Node.js 18+ e npm instalados.

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API simulada (JSON Server) em um terminal separado:
   ```bash
   npm run serve:api
   ```
   O endpoint padrão ficará em `http://localhost:3001/products`.
3. Inicie o front-end:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação no endereço exibido pelo Vite (geralmente `http://localhost:5173`).

## Rotas disponíveis
- `/` — Home com listagem de produtos.
- `/produto/:id` — Detalhes do produto.
- `/carrinho` — Carrinho de compras com ajustes de quantidade.
- `/cadastro` — Cadastro de novo produto.
- `/editar/:id` — Edição de produto existente.
- `*` — Página 404 com link para Home.

## Estrutura de pastas
```
src/
  components/   # Componentes reutilizáveis (Header, ProductCard, FormProduct, etc.)
  context/      # CartContext e provider global
  hooks/        # Hook customizado useFetch
  pages/        # Páginas de rota (Home, ProductDetails, CartPage, Create/Edit, NotFound)
  App.jsx       # Definição das rotas
  main.jsx      # Bootstrap do React
```

## Dados iniciais da API
O arquivo `db.json` já inclui produtos de exemplo que populam o catálogo. Ajuste ou adicione novos itens conforme necessário.

## Scripts úteis
- `npm run dev` — Inicia o servidor de desenvolvimento do Vite.
- `npm run build` — Gera a build de produção.
- `npm run serve:api` — Sobe o JSON Server em `http://localhost:3001`.

## Tecnologias
- React + Vite
- React Router DOM v6
- Context API
- Hooks (useState, useEffect, useContext, useRef, useNavigate, useParams)
- TailwindCSS
- JSON Server (API fake)
