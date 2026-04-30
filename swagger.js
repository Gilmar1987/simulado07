import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Simulado07',
    description: 'Documentação da API de Filmes',
  },
  host: 'localhost:3000',
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
