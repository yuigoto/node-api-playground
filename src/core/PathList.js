/**
 * NODE API : Core/PathList
 * ----------------------------------------------------------------------
 * Retorna uma lista contendo caminhos para as pastas mais importantes da
 * aplicação, como:
 *
 * - Raíz do repositório
 * - Pasta de build do executável
 * - Pasta de armazenamento de dados estáticos
 * - Pasta de uploads do projeto
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import fs from "fs";
import path from "path";

// Define caminho deste arquivo
const file = path.resolve(path.dirname(__filename), "../").replace(/\\/g, "/");

// Define o caminho da raíz do repositório
const root = path.dirname(file).replace(/\\/g, "/");

// Caminhos de pastas da API
const PathList = {
  /**
   * Caminho para a raíz do repositório.
   * 
   * @type {String}
   */
  API_ROOT: root + "/",
  
  /**
   * Caminho para a pasta de builds da API, aonde o executável do projeto
   * é transpilado.
   * 
   * @type {String}
   */
  API_BUILD: root + "/build/",
  
  /**
   * Caminho para a pasta de dados, aonde arquivos de texto, flat-file, XML,
   * o security salt, entre outras coisas (como bancos SQLite), podem ser
   * armazenados.
   *
   * @type {String}
   */
  API_DATA: root + "/data/",
  
  /**
   * Caminho para a pasta que armazenará os logs do sistema.
   *
   * @type {String}
   */
  API_LOGS: root + "/logs/",
  
  /**
   * Pasta de uploads do projeto, servida pelo Express no endpoint `/upload`.
   *
   * @type {String}
   */
  API_UPLOAD: root + "/upload/"
};

// Cria as pastas de dados e upload, caso não existam
if (!fs.existsSync(PathList.API_DATA)) fs.mkdirSync(PathList.API_DATA);
if (!fs.existsSync(PathList.API_LOGS)) fs.mkdirSync(PathList.API_LOGS);
if (!fs.existsSync(PathList.API_UPLOAD)) fs.mkdirSync(PathList.API_UPLOAD);

// Export
export default PathList;
