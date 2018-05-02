/**
 * NODE API : Test/Api/Healthcheck
 * ----------------------------------------------------------------------
 * Testes exemplo para a rota de Healthcheck (`/api/healthcheck`).
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */


// Define ambiente de testes (sobrescreve `.env`)
import server from "../../src/server";

process.env.NODE_ENV = "test";

// Bibliotecas
import chai, { expect, should } from "chai";
import chai_http from "chai-http";

// Imports locais
import ApiInfo from "src/config/api.info";

// Setup
// ----------------------------------------------------------------------

// Executa Should
should();

// Define uso do `chai_http` para testes de requests
chai.use(chai_http);

const Test = () => {
  describe("Healthcheck", () => {
    it("Rotas sem um match devem retornar status 404", done => {
      chai.request(server)
        .get("/api/healthcheck/rota-para-lugar-nenhum")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Rota principal deve retornar status 200 e conter dados básicos", done => {
      chai.request(server)
        .get("/api/healthcheck")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res)
            .to.have.property("body")
            .to.be.a("Object")
            .to.have.property("result")
            .to.be.a("Object");
          // Verificando informações
          for (let key of Object.keys(ApiInfo)) {
            expect(res.body.result)
              .to.have.property(key)
              .to.be.a("String").equal(ApiInfo[key]);
          }
          done();
        });
    });
  });
};

export default Test;
