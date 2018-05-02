/**
 * NODE API : Routes/Api/Routes
 * ----------------------------------------------------------------------
 * Gerencia e define todas as rotas dentro de `/api`.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import { Router } from "express";

// Imports locais
import ResponseTemplate from "src/core/ResponseTemplate";
import ResponseError from "src/core/ResponseError";

// Importando rotas
import HealthcheckRoute from "src/routes/api/HealthcheckRoute";

// Inicia router
const Routes = Router();

// Define rotas da API
Routes.use("/healthcheck", HealthcheckRoute);

/**
 * Catch-all para rotas não declaradas.
 *
 * Diferente da forma como são declaradas no `server.js`, este catch-all
 * precisa vir antes da rota "raíz", para evitar problemas com respostas.
 *
 * IMPORTANTE:
 * Caso queria retornar um erro 404 para rotas inexistentes, é importante
 * que cada rota tenha um catch-all destes (sim, um em cada rota).
 */
Routes.use(/^\/(.+)/, (req, res) => {
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

/**
 * Rota raíz
 */
Routes.use("/", (req, res) => {
  // Montando erro e resposta
  let error = new ResponseError(
    403,
    "Acesso Proibido",
    "O acesso a este endpoint é proibido. Por favor, tente outra rota."
  );
  
  let response = new ResponseTemplate(
    error.code,
    error,
    (process.env.NODE_ENV === "development") ? req.headers : null
  );
  
  res.status(403).send(response);
});

export default Routes;
