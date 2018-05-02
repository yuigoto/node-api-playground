/**
 * NODE API PLAYGROUND : Test/Server
 * ----------------------------------------------------------------------
 * Executa testes em uma instância de servidor, elementos `core` e executa 
 * requests na API.
 * 
 * É o único arquivo de testes a ser executado, carregando os outros testes 
 * e os executando em uma determinada ordem.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Define ambiente de testes (sobrescreve `.env`)
process.env.NODE_ENV = "test";

// Bibliotecas
import chai, { expect, should } from "chai";
import chai_http from "chai-http";
import fs from "fs";

// Imports de Testes : Core
import PathList from "src/core/PathList";

// Imports de Testes : Rotas
import Healthcheck from "test/api/Healthcheck";

// Imports locais
import server from "src/server";

// Setup
// ----------------------------------------------------------------------

// Executa Should
should();

// Define uso do `chai_http` para testes de requests
chai.use(chai_http);

// Testes
// ----------------------------------------------------------------------

// Servidor
describe("Server", () => {
  describe("Status", () => {
    // Cria um arquivo de teste antes dos testes
    before(done => {
      if (!fs.existsSync(PathList.API_UPLOAD + "test.txt")) {
        fs.writeFileSync(PathList.API_UPLOAD + "test.txt", "HELLO");
      }
      done();
    });
    
    // Apaga arquivo de teste pós-testes
    after(done => {
      fs.unlinkSync(PathList.API_UPLOAD + "test.txt");
      done();
    });
    
    it("O servidor foi inicializado corretamente", done => {
      chai.request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  
    it("Rotas sem um match devem retornar status 404", done => {
      chai.request(server)
        .get("/rota-para-lugar-nenhum")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Rota para a pasta de upload deve retornar 404", done => {
      chai.request(server)
        .get("/upload")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Arquivos inexistentes devem retornar 404", done => {
      chai.request(server)
        .get("/upload/non-existent.txt")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Arquivos enviados devem retornar status 200", done => {
      chai.request(server)
        .get("/upload/test.txt")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it(
      "Rota 'raíz' deve retornar status 200 e conter informações básicas", 
      done => {
        chai.request(server)
          .get("/")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res)
              .to.have.property("body")
              .to.be.a("Object")
              .to.have.property("result")
              .to.be.a("Object");
            expect(res.body.result)
              .to.have.property("title")
              .to.be.a("String")
              .equal("NODE API @ localhost");
            expect(res.body.result)
              .to.have.property("message")
              .to.be.a("String")
              .equal("Don't worry, be Appy!");
            done();
          });
      }
    );
  });
  
  describe("API", () => {
    it(
      "Raíz da API deve retornar status 403: Proibido",
      done => {
        chai.request(server)
          .get("/api")
          .end((req, res) => {
            expect(res).to.have.status(403);
            expect(res)
              .to.have.property("body")
              .to.be.a("Object")
              .to.have.property("result")
              .to.be.a("Object");
            expect(res.body.result)
              .to.have.property("title")
              .to.be.a("String").equal("Acesso Proibido");
            done();
          });
      }
    );
  
    it("Rotas sem um match devem retornar status 404", done => {
      chai.request(server)
        .get("/api/este-endpoint-nao-existe")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    // Testando rotas
    Healthcheck();
  });
});
