# Simulado07

API Node.js + Express em TypeScript para gerenciamento de filmes.

## Estrutura do projeto

- `src/app.ts` - ponto de entrada da aplicação
- `src/routes/movies.ts` - rotas da API para filmes
- `src/controllers/Movie.Controllers.ts` - lógica de CRUD em memória

## Tecnologias

- Node.js
- Express
- TypeScript
- tsx
- dotenv

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

O servidor deve iniciar em `http://localhost:3000`.

## Endpoints

### Rota de status

- `GET /`
- Retorna uma mensagem de confirmação de que a API foi carregada.

### CRUD de filmes

As rotas são definidas em `src/routes/movies.ts` e montadas em `src/app.ts` como `/api`, portanto o caminho completo é `http://localhost:3000/api/movies`.

- `POST /api/movies`
  - Cria um novo filme.
  - Body JSON esperado:

```json
{
  "title": "Título do filme",
  "description": "Descrição do filme",
  "year": 2026,
  "genres": "Ação",
  "image": "imagem.jpg",
  "video": "video.mp4"
}
```

- `GET /api/movies`
  - Lista todos os filmes.

- `GET /api/movies/:id`
  - Retorna o filme com o ID informado.

- `PUT /api/movies/:id`
  - Atualiza o filme com o ID informado.
  - Envie apenas os campos que deseja alterar no body JSON.

- `DELETE /api/movies/:id`
  - Remove o filme com o ID informado.

## Observações

- Os dados são armazenados em memória (`src/controllers/Movie.Controllers.ts`).
- Ao reiniciar o servidor, a lista de filmes volta ao estado inicial vazio.
- A aplicação usa módulos ES (`"type": "module"` no `package.json`).

## Como testar no Thunder Client

1. `GET http://localhost:3000/`
2. `POST http://localhost:3000/api/movies` com body JSON para criar um filme
3. `GET http://localhost:3000/api/movies`
4. `GET http://localhost:3000/api/movies/1`
5. `PUT http://localhost:3000/api/movies/1`
6. `DELETE http://localhost:3000/api/movies/1`
