/**
 * NODE API : Server
 * ----------------------------------------------------------------------
 * Ponto de entrada da aplicação, responsável por carregá-la e executá-la
 * usando Express.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
import Utilities from "./core/Utilities";

// Carregando variáveis de ambiente do `.env` (IMPORTANTE)
// ----------------------------------------------------------------------
require("dotenv").config();

// Bibliotecas
// ----------------------------------------------------------------------
import express from "express";
import mongoose from "mongoose";

// Imports locais
// ----------------------------------------------------------------------
import PathList from "src/core/PathList";
import Salt from "src/core/Salt";
import Logger from "src/core/Logger";
import ResponseTemplate from "src/core/ResponseTemplate";
import ResponseError from "src/core/ResponseError";
import Routes from "src/routes/Routes";

// Inicializando Security Salt
new Salt(PathList.API_DATA);

// Parâmetros da aplicação
// ----------------------------------------------------------------------

/**
 * Porta em que a aplicação será executada.
 *
 * @type {Number}
 */
const app_port = process.env.PORT || 3000;

// Mongoose + MongoDB
// ----------------------------------------------------------------------
// TODO: Conexão com MongoDB usando Mongoose

// Inicializando Express, definindo rotas
// ----------------------------------------------------------------------
const app = express();

// Permitindo que o app receba dados de formulários ou JSON via requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rotas
app.use("/api", Routes);

// Servindo pasta de upload
app.use("/upload", express.static("upload"));

// Definindo caminho raíz
app.all("/", (req, res) => {
  // Montando resposta
  let response = new ResponseTemplate(
    200,
    {
      title: "NODE API @ localhost",
      message: "Don't worry, be Appy!"
    },
    (process.env.NODE_ENV === "development") ? req.headers : null
  );
  
  res.set({
    'Content-Type': 'application/json'
  });
  res.status(200).send(response);
});

// Catch-all para rotas não declaradas
app.all(/^\/(.+)/, (req, res) => {
  // Montando erro e resposta
  let error = new ResponseError(
    404
  );
  
  let response = new ResponseTemplate(
    error.code,
    error,
    (process.env.NODE_ENV === "development") ? req.headers : null
  );
  
  res.set({
    'Content-Type': 'application/json'
  });
  res.status(404).send(response);
});

// Executando
// ----------------------------------------------------------------------
const server = app.listen(
  app_port,
  () => {
    // Endereço e porta
    const { port } = server.address();
  
    // Indicador de ambiente
    if (process.env.NODE_ENV === "development") {
      Logger(`AMBIENTE DE DESENVOLVIMENTO`, "red", null, true);
      Logger(`--------------------------------------------------`, "red");
    } else if (process.env.NODE_ENV === "test") {
      Logger(`AMBIENTE DE TESTES`, "yellow");
      Logger(`--------------------------------------------------`, "red");
    } else {
      Logger(`AMBIENTE DE PRODUÇÃO`, "green");
      Logger(`--------------------------------------------------`, "red");
    }
    
    // Exibindo endereços
    Logger(`Executando NODE API em:`,"yellow");
    for (let address of Utilities.ownAddressList()) {
      Logger(
        `http://${address}:${port}`,
        "cyan"
      );
    }
  }
);

// Export
// ----------------------------------------------------------------------

// Exportando uma instância da aplicação
// Este tipo de ação é necessário para que possamos executar testes nele
export default server;
