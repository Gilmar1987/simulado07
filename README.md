# Simulado07
# Autor: Gilmar Rodrigues Campelo

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


1. `POST http://localhost:3000/api/movies` com body JSON para criar um filme
2. `GET http://localhost:3000/api/movies`
3. `GET http://localhost:3000/api/movies/id:`
4. `PUT http://localhost:3000/api/movies/id:`
5. `DELETE http://localhost:3000/api/movies/id:`


TEste com o Swagger
1. `http://localhost:3000` para acessar a documentação Swagger UI.



Curl

curl -X 'GET' \
  'http://localhost:3000/api/movies' \
  -H 'accept: application/json'
  
Request URL
http://localhost:3000/api/movies
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": 1,
    "title": "Batman: Batmam Liga da Justiça 01 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 2,
    "title": "Batman: Batmam Liga da Justiça 02 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 3,
    "title": "Batman: Batmam Liga da Justiça 03 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 4,
    "title": "Batman: Batmam Liga da Justiça 05 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 5,
    "title": "Batman: Batmam Liga da Justiça 06 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 6,
    "title": "Batman: Batmam Liga da Justiça 07 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  },
  {
    "id": 7,
    "title": "Batman: Batmam Liga da Justiça TESTE 07 ",
    "description": "Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa estragos e caos no povo de Gotham.",
    "year": 2015,
    "genres": "Action, Crime, Drama",
    "image": "https://tmdb.org",
    "video": "https://youtube.com"
  }
]

Response headers
 connection: keep-alive 
 content-length: 1974 
 content-type: application/json; charset=utf-8 
 date: Fri,10 Apr 2026 20:50:56 GMT 
 etag: W/"7b6-lzS6k7FmfpMmF6CJ5Pwf4Rp7PxQ" 
 keep-alive: timeout=5 
 x-powered-by: Express 

Responses
Code	Description
200	
OK