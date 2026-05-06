import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Simulado 08',
    description: 'Documentação da API de Filmes e Usuários',
    version: '1.0.0',
    contact: {
      name: 'Gilmar Rodrigues Campelo'
    }
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  tags: [
    { name: 'Auth', description: 'Autenticação' },
    { name: 'Movies', description: 'Endpoints de filmes' },
    { name: 'Users', description: 'Endpoints de usuários' }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Informe o token JWT no formato: Bearer <token>'
    }
  },
  security: [{ bearerAuth: [] }],
  definitions: {
    Movie: {
      type: 'object',
      required: ['title', 'description', 'year', 'genres', 'image', 'video'],
      properties: {
        title: { type: 'string', example: 'Batman' },
        description: { type: 'string', example: 'Um filme sobre o Batman' },
        year: { type: 'integer', example: 2008 },
        genres: { type: 'string', example: 'Action, Crime' },
        image: { type: 'string', example: 'https://tmdb.org/batman.jpg' },
        video: { type: 'string', example: 'https://youtube.com/batman' }
      }
    },
    MovieUpdate: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Batman Atualizado' },
        description: { type: 'string', example: 'Descrição atualizada' },
        year: { type: 'integer', example: 2009 },
        genres: { type: 'string', example: 'Action' },
        image: { type: 'string', example: 'https://tmdb.org/batman2.jpg' },
        video: { type: 'string', example: 'https://youtube.com/batman2' }
      }
    },
    User: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'João Silva' },
        email: { type: 'string', example: 'joao@email.com' },
        password: { type: 'string', example: '123456' },
        role: { type: 'string', enum: ['user', 'admin'], example: 'user' }
      }
    },
    UserUpdate: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'João Atualizado' },
        email: { type: 'string', example: 'joao.novo@email.com' },
        password: { type: 'string', example: 'novaSenha123' },
        role: { type: 'string', enum: ['user', 'admin'], example: 'admin' }
      }
    },
    Login: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'joao@email.com' },
        password: { type: 'string', example: '123456' }
      }
    }
  }
};

const outputFile = './swagger-output.json';
// Note que aqui apontei para o seu app.ts dentro da pasta src, 
// baseando-se no seu 'ls' que mostrou uma pasta /src
const endpointsFiles = ['./src/routes/index.ts'];

//swaggerAutogen()(outputFile, endpointsFiles).then(() => {
  //  console.log("✅ Arquivo swagger-output.json gerado!");
//});

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log("✅ Arquivo swagger-output.json gerado!");
});
