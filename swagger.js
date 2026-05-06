import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Simulado 08',
    description: 'Documentação da API de Filmes e Usuários',
  },
  host: 'localhost:3000',
  basePath: '/api',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Informe o token JWT no formato: Bearer <token>'
    }
  },
  security: [{ bearerAuth: [] }],
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
