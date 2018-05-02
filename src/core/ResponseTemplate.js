/**
 * NODE API : Core/ResponseTemplate
 * ----------------------------------------------------------------------
 * Template para construção de respostas de API, constrói um objeto que pode
 * ser retornado, com as informações de status http, payload e dados do
 * client para teste (opcional).
 *
 * A idéia, com esta classe, é fazer com que
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
export default class ResponseTemplate {
  /**
   * Construtor de ResponseTemplate.
   *
   * @param {Number} code
   *    Código de status HTTP
   * @param {*} result
   *    Contém o payload da resposta a ser enviada ao client solicitante
   *    na forma de um objeto (POJO) pode ser, também, um array de dados
   * @param {*} client
   *    Opcional, informações sobre o client solicitando à informação,
   *    usado apenas em testes
   */
  constructor(code, result, client = null) {
    this.code = code;
    this.result = result;
    if (client !== null && client !== undefined) {
      this.client = client;
    }
    this.date = new Date().toISOString();
  }
}
