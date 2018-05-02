/**
 * NODE API : Routes/Api/HealthcheckRoute
 * ----------------------------------------------------------------------
 * Rotas para `/api/healthcheck`.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import { Router } from "express";

// Imports locais
import ResponseTemplate from "src/core/ResponseTemplate";
import ResponseError from "src/core/ResponseError";
import ApiInfo from "src/config/api.info";

// Inicia router
const HealthcheckRoute = Router();

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
HealthcheckRoute.use(/^\/(.+)/, (req, res) => {
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
HealthcheckRoute.use("/", (req, res) => {
  let response = new ResponseTemplate(
    200,
    ApiInfo,
    (process.env.NODE_ENV === "development") ? req.headers : null
  );
  
  res.status(200).send(response);
});

export default HealthcheckRoute;
