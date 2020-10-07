var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

var app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000',
  }
));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

/**
 * Rotas principais do app
 */
app.use('/pessoas', routes);

/**
 * Conexão ao Banco de Dados
 */
const DB_CONNECTION = "mongodb+srv://master:clust3r0@d1r3t0@cluster0.voto9.mongodb.net/amigosecreto?retryWrites=true&w=majority";

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');
  
  /**
   * Inicialização do app
   */
  const APP_PORT = process.env.PORT || 8000;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});