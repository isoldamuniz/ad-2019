const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: "https://ad2019f.herokuapp.com",
    origin: "http://localhost:3000",
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

/**
 * Rotas principais do app
 */
app.use("/pessoas", routes);

const { PORT } = process.env;
const { DB_CONNECTION } = process.env;

console.log("Iniciando conexão ao MongoDB...");
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

connection.once("open", () => {
  connectedToMongoDB = true;
  console.log("Conectado ao MongoDB");

  /**
   * Inicialização do app
   */
  app.listen(PORT || 8000, () => {
    console.log(`Servidor iniciado na porta ${PORT || 8000}`);
  });
});