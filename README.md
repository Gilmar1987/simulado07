# Simulado07
# Autor: Gilmar Rodrigues Campelo

API Node.js + Express em TypeScript para gerenciamento de filmes com persistência em MongoDB Atlas.

## Estrutura do projeto

- `src/app.ts` - ponto de entrada da aplicação
- `src/routes/Movies.Router.ts` - rotas da API para filmes
- `src/controllers/Movie.Controllers.ts` - lógica de CRUD com MongoDB
- `src/model/modelMovie.ts` - schema e model Mongoose
- `src/config/dbMongo.ts` - conexão com o MongoDB

## Tecnologias

- Node.js
- Express
- TypeScript
- tsx
- dotenv
- Mongoose
- MongoDB Atlas
- Swagger UI

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

3. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

O servidor deve iniciar em `http://localhost:3000`.

## Banco de Dados

- MongoDB Atlas (cloud)
- A conexão é feita via `MONGODB_URI` definida no `.env`
- Os dados são persistidos no banco, não se perdem ao reiniciar o servidor
- O campo `titleNormalized` garante que títulos duplicados (ex: `Tudo Bem` e `tudobem`) sejam rejeitados
- O campo `isDeleted` e `deletedAt` estão preparados para soft delete
- Timestamps automáticos: `createdAt` e `updatedAt`

## Endpoints

### Documentação Swagger

- `GET /` - Redireciona para a documentação Swagger UI em `/doc`
- `GET /doc` - Documentação interativa Swagger UI

### CRUD de filmes

As rotas são definidas em `src/routes/Movies.Router.ts` e montadas em `src/app.ts` como `/api`.

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
  - Retorna o filme com o ID informado (MongoDB `_id`).

- `PUT /api/movies/:id`
  - Atualiza o filme com o ID informado.
  - Envie apenas os campos que deseja alterar no body JSON.

- `DELETE /api/movies/:id`
  - Remove o filme com o ID informado.

## Como testar no Thunder Client

1. `POST http://localhost:3000/api/movies` com body JSON para criar um filme
2. `GET http://localhost:3000/api/movies`
3. `GET http://localhost:3000/api/movies/:id`
4. `PUT http://localhost:3000/api/movies/:id`
5. `DELETE http://localhost:3000/api/movies/:id`

## Teste com o Swagger

Acesse `http://localhost:3000/doc` para abrir a documentação Swagger UI e testar os endpoints interativamente.

## Curl

```bash
curl -X 'GET' \
  'http://localhost:3000/api/movies' \
  -H 'accept: application/json'
```

## Observações

- Os dados são persistidos no MongoDB Atlas.
- A aplicação usa módulos ES (`"type": "module"` no `package.json`).
- O arquivo `.env` não deve ser commitado. Use `.env.exemplo` como referência.
