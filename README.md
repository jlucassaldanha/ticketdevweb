# 🎟️ TicketDevWeb

Este é o repositório do **Front-End da TicketDev**, uma plataforma de venda, gerenciamento e validação de ingressos de cinema.

Ele consome a API Rest construída em Node que esta em produção em [TicketDevApi](https://ticketdevapi.onrender.com/api-docs), e o repositório em [TicketDevApiRepo](https://github.com/jlucassaldanha/ticketdevapi) 

## Aviso sobre lentidão

Devido a aplicação em produção estar publicada na plataforma Render utilizando o Free Tier, há certa lentidão no primeiro acesso após um tempo de inatividade.

---
## Aviso sobre construção

Este projeto ainda esta em construção, por isso não se assuste caso bata de frente com uma página incompleta ou que não existe.

---

## 🚀 Tecnologias e Stack

O projeto foi construído utilizando as melhores práticas e ferramentas do ecossistema React/Next.js moderno:

* **Framework:** [Next.js](https://nextjs.org/) (App Router & Server Actions)
* **Gerenciamento de Estado & Cache:** [TanStack Query (React Query)](https://tanstack.com/query)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes de UI:** [Shadcn UI](https://ui.shadcn.com/) / Base UI
* **Validação de Formulários:** Zod & React Hook Form
* **Linguagem:** TypeScript

## 🚀 Como Executar o Front-End

### Pré-requisitos
*   **Node.js (v20 ou v22+)**
*   **Back-end da TicketDev** rodando (localmente ou via Docker na porta `3000` ou pela API publicada em `https://ticketdevapi.onrender.com`)

### Passo a Passo Local:
1.  Navegue até a pasta do projeto front-end no terminal:
    ```bash
    cd ticketdevwebapp
    ```
2.  Instale todas as dependências do ecossistema:
    ```bash
    npm install
    ```
3.  Configure o arquivo de variáveis de ambiente **`.env.local`** na raiz do front-end:
    ```bash
    NEXT_PUBLIC_API_URL="http://localhost:3000" # ou "https://ticketdevapi.onrender.com"
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

O front-end estará disponível em: **`http://localhost:3000`** ou **`http://localhost:3001`**

---
