# Simulado 08
# Autor: Gilmar Rodrigues Campelo

API Node.js + Express em TypeScript para gerenciamento de filmes e usuários com persistência em MongoDB Atlas.

## Estrutura do projeto

```
src/
├── app.ts                        - ponto de entrada da aplicação
├── config/
│   └── dbMongo.ts                - conexão com o MongoDB
├── routes/
│   ├── index.ts                  - centralizador de rotas
│   ├── movie.router.ts           - rotas da API para filmes
│   └── user.router.ts            - rotas da API para usuários
├── controllers/
│   ├── movie.controllers.ts      - controller de filmes
│   └── user.controllers.ts      - controller de usuários
├── services/
│   ├── movie.service.ts          - regras de negócio de filmes
│   └── user.service.ts           - regras de negócio de usuários
├── repositories/
│   ├── movie.repository.ts       - acesso ao banco para filmes
│   └── user.repository.ts        - acesso ao banco para usuários
├── model/
│   ├── movieModel.ts             - schema e model Mongoose de filmes
│   └── userModel.ts              - schema e model Mongoose de usuários
├── schemas/
│   ├── movieSchema.ts            - validação Zod para filmes
│   └── user.Schema.ts            - validação Zod para usuários
└── middlewares/
    └── error.handler.ts          - middleware global de tratamento de erros
```

## Tecnologias

- Node.js
- Express 5
- TypeScript
- tsx
- dotenv
- Mongoose
- MongoDB Atlas
- Swagger UI
- Zod
- bcrypt

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto (use `.env.exemplo` como base):

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?appName=<appName>
```

3. Gere a documentação Swagger:

```bash
npm run swagger
```

4. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

O servidor deve iniciar em `http://localhost:3000`.

## Arquitetura

A aplicação segue o padrão de camadas:

- **Controller** — recebe a requisição, valida com Zod e delega ao service
- **Service** — contém as regras de negócio (verificação de duplicatas, hash de senha, etc.)
- **Repository** — acesso direto ao banco de dados via Mongoose
- **Middleware** — tratamento global de erros centralizado em `error.handler.ts`

Os erros são propagados automaticamente pelo Express 5 (sem `try/catch` nos controllers) e tratados pelo `globalErrorHandler`.

## Banco de Dados

- MongoDB Atlas (cloud)
- A conexão é feita via `MONGODB_URI` definida no `.env`
- Os dados são persistidos no banco, não se perdem ao reiniciar o servidor
- Timestamps automáticos: `createdAt` e `updatedAt`

### Model Movie
- `title` — título original
- `titleNormalized` — título sem espaços em maiúsculas (ex: `"Tudo Bem"` → `"TUDOBEM"`), garante unicidade independente de espaços e capitalização
- `description`, `year`, `genres`, `image`, `video` — campos obrigatórios
- `isDeleted` / `deletedAt` — soft delete
- Filtragem automática de registros deletados via `pre(/^find/)`

### Model User
- `name`, `email` — campos obrigatórios
- `password` — armazenado com hash bcrypt, `select: false` (não retornado nas queries)
- `role` — `"user"` ou `"admin"`, padrão `"user"`
- `isDeleted` / `deletedAt` — soft delete
- Filtragem automática de registros deletados via `pre(/^find/)`

## Validações Zod

### Movie
- `title` — string, mínimo 2 caracteres
- `description` — string, mínimo 10 caracteres
- `year` — número inteiro, mínimo 1888
- `genres` — string, mínimo 5 caracteres
- `image` — URL válida
- `video` — URL válida

### User
- `name` — string, entre 2 e 100 caracteres
- `email` — email válido
- `password` — string, entre 6 e 100 caracteres
- `role` — `"user"` ou `"admin"`, padrão `"user"`

## Tratamento de Erros

Centralizado em `src/middlewares/error.handler.ts`:

| Situação | Status |
|---|---|
| Erro de validação Zod | 400 |
| ID inválido (CastError) | 400 |
| Duplicata no banco (código 11000) | 409 |
| Movie/User already exists | 409 |
| Movie/User not found | 404 |
| Outros erros | 500 |

## Endpoints

### Documentação Swagger

- `GET /` — redireciona para `/doc`
- `GET /doc` — documentação interativa Swagger UI

### Movies `/api/movies`

- `POST /api/movies` — cria um novo filme

```json
{
  "title": "Batman",
  "description": "Um filme sobre o Batman",
  "year": 2008,
  "genres": "Action, Crime",
  "image": "https://tmdb.org/batman.jpg",
  "video": "https://youtube.com/batman"
}
```

- `GET /api/movies` — lista todos os filmes (exceto deletados)
- `GET /api/movies/:id` — retorna o filme pelo `_id`
- `PUT /api/movies/:id` — atualiza campos do filme (envie apenas os campos a alterar)
- `DELETE /api/movies/:id` — soft delete (marca `isDeleted: true`)

### Users `/api/users`

- `POST /api/users` — cria um novo usuário (senha é hasheada automaticamente)

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "role": "admin"
}
```

- `GET /api/users` — lista todos os usuários (exceto deletados, sem senha)
- `GET /api/users/email/:email` — busca usuário pelo email
- `GET /api/users/:id` — busca usuário pelo `_id`
- `PUT /api/users/:id` — atualiza campos do usuário (senha é re-hasheada se enviada)
- `DELETE /api/users/:id` — soft delete (marca `isDeleted: true`)

## Como testar no Thunder Client

**Criar filme:**
```
POST http://localhost:3000/api/movies
Content-Type: application/json
```

**Criar usuário admin:**
```
POST http://localhost:3000/api/users
Content-Type: application/json
body: { "name": "Admin", "email": "admin@email.com", "password": "123456", "role": "admin" }
```

**Atualizar senha:**
```
PUT http://localhost:3000/api/users/:id
Content-Type: application/json
body: { "password": "novaSenha123" }
```

## Swagger

Acesse `http://localhost:3000/doc` para testar os endpoints interativamente.

Para regenerar a documentação após alterações nas rotas:

```bash
npm run swagger
```

## Curl

```bash
curl -X 'GET' \
  'http://localhost:3000/api/movies' \
  -H 'accept: application/json'
```

## Observações

- Os dados são persistidos no MongoDB Atlas
- A aplicação usa módulos ES (`"type": "module"` no `package.json`)
- O arquivo `.env` não deve ser commitado — use `.env.exemplo` como referência
- Express 5 propaga erros de funções `async` automaticamente para o middleware global
- A senha nunca é retornada nas respostas da API (`select: false` no schema)
