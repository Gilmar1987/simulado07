import express from 'express';
import 'dotenv/config';
import router from './routes/movies';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Simulado07 Carregada com Sucesso! 🚀');
});
// Importando as rotas

app.use('/api', router);

// ESTA PARTE É ESSENCIAL:
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  //Passar data e hora atual
  console.log(`Data e hora atual: ${new Date().toLocaleString()}`);
  console.info('API Simulado07 iniciada....'); // Log de informação
});
