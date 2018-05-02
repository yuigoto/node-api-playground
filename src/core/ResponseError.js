/**
 * NODE API : Core/ResponseError
 * ----------------------------------------------------------------------
 * Template para um objeto pré-formatado, a ser utilizado como conteúdo
 * e uma resposta de erro da API.
 *
 * Normalmente, em uma reposta, a instância deste objeto corresponderá ao
 * corpo do resultado.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import Utilities from "src/core/Utilities";

// Classe ResponseError
export default class ResponseError {
  /**
   * Construtor de ResponseError.
   *
   * @param {Number} code
   *    Código de status HTTP para o erro, deve ser o mesmo da resposta
   * @param {String} title
   *    Opcional, título do erro a ser retornado, se vazio, é retornado o
   *    nome do status HTTP do mesmo
   * @param {String} description
   *    Opcional, deve conter a descrição do erro a ser retornado
   * @param {*} data
   *    Opcional, qualquer dado que sirva para analisar o erro, pode ser
   *    um objeto, array ou qualquer tipo de item
   */
  constructor(code, title = "", description = "", data = {}) {
    this.code = code;
    this.title = (title !== "" && title !== null && title !== undefined)
      ? title : Utilities.httpStatusName(code);
    this.description =
      (description !== "" && description !== null && description !== undefined)
      ? description : "Nenhuma descrição disponível";
    this.data = data;
  }
}
