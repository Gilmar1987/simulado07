import express from 'express';
import 'dotenv/config';
import router from './routes/movies.Router.js';

import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../swagger-output.json' with { type: 'json' };
import  connectDB from './config/dbMongo.js';

connectDB(); // Conecta ao MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// 1. Configuração da Rota do Swagger
// Acesse http://localhost:3000/doc para testar os endpoints
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rota de teste
app.get('/', (req, res) => {
   /* #swagger.ignore = true */
  res.redirect('/doc'); // Redireciona para a documentação do Swagger
});
// Importando as rotas

app.use('/api', router, (req, res) => {
  
  res.send('Rota de filmes acessada com sucesso !!! 🎬');
});

connectDB(); // Conecta ao MongoDB

// ESTA PARTE É ESSENCIAL:
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  //Passar data e hora atual
  console.log(`Data e hora atual: ${new Date().toLocaleString()}`);
  console.info('API Simulado07 iniciada ....'); // Log de informação
});
