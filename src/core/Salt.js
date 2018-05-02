/**
 * NODE API : Core/Salt
 * ----------------------------------------------------------------------
 * Contém métodos e definições para a criação de um arquivo contendo strings
 * geradas aleatoriamente, para uso como security salt.
 *
 * Depende das globais definidas em `core/PathList`.
 *
 * IMPORTANTE:
 * Uma vez gerado e definido o security salt, NÃO MODIFIQUE OU EXCLUA o
 * mesmo, especialmente se o utiliza para "temperar" senhas, pois afetará
 * todas as já existentes.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import fs from "fs";
import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import sha256 from "crypto-js/sha256";

// Imports locais
import PathList from "src/core/PathList";

// Classe principal
export default class Salt {
  /**
   * Construtor Salt.
   * 
   * @param {string} filepath
   */
  constructor(filepath) {
    // Define e verifica caminho do security salt
    this.path = PathList.API_DATA + "/salt/";
    if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
    
    // Nome do arquivo
    this.file = "__SALT";

    // Verifica existência do arquivo com o security salt
    if (!fs.existsSync(this.path + this.file)) this._generate();
  }

  /**
   * Retorna um hashset md5 do arquivo contendo o security salt do projeto.
   */
  get() {
    // Caminho para o `__SALT`
    let filepath = this.path + this.file;

    // Lê, monta o hash, retorna
    let data = fs.readFileSync(filepath).toString();
    return md5(
      sha1(data).toString()
    ).toString();
  }
  
  /**
   * Cria um arquivo contendo um conjunto de caracteres selecionados
   * aleatoriamente, para ser utilizado como security salt na aplicação.
   *
   * Também salva cópias de segurança do mesmo, caso haja alguma exclusão
   * acidental.
   *
   * IMPORTANTE:
   * Uma vez gerado e definido o security salt, NÃO MODIFIQUE OU EXCLUA o
   * mesmo, especialmente se o utiliza para "temperar" senhas, pois afetará
   * todas as já existentes.
   *
   * @private
   */
  _generate() {
    // Lista com caracteres usados para montar o arquivo __SALT
    let char = "abcdefghijklmnopqrstuvwxyz" 
      + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
      + "0123456789\"!@#$%¨&*()_+\'-" 
      + "=`{}^?:><|´[~];/.,\\¹²³£¢¬§ªº°'";
    
    // Gerando dados do salt
    let data = ["- SECURITY SALT ::: NÃO EDITAR -"];

    // Montando corpo
    let body = [];
    for (let n = 0; n < 16; n++) {
      // Array com caracteres da linha
      let line = [];
      
      for (let i = 0; i < 32; i++) {
        line.push(char[Math.floor(Math.random() * char.length)]);
      }

      // Adiciona linha ao corpo
      body = [...body, line.join("")];
    }
    body = body.join("\r\n");
    
    // Gerando assinaturas
    let sign_head = md5(sha1(body).toString()).toString();
    let sign_foot = md5(sha256(body).toString()).toString();

    // Montando corpo final
    data = [
      ...data,
      sign_head,
      body,
      sign_foot,
      ...data
    ];
    data = data.join("\r\n");

    // Salvando salt principal e backups
    fs.writeFileSync(this.path + this.file, data);
    fs.writeFileSync(this.path + this.file + ".001", data);
    fs.writeFileSync(this.path + this.file + ".002", data);
    fs.writeFileSync(this.path + this.file + ".003", data);
  }
}
