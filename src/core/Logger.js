/**
 * NODE API : Core/Logger
 * ----------------------------------------------------------------------
 * Logger simples para mensagens de console e, ocasionalmente, logs de texto.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import fs from "fs";
import path from "path";

// Imports locais
import LoggerColors from "src/core/type/LoggerColors";

/**
 * Imprime uma mensagem no console, que pode ser colorida ou não.
 *
 * Também possibilita salvar a mensagem em um log, desde que fornecido o
 * nome do arquivo com localização completa.
 *
 * @param {String} message
 *    Mensagem a ser impressa no terminal/console
 * @param {String} color
 *    Opcional, cor do texto a ser impresso, um dos valores disponíveis em
 *    `LoggerColors.colors`
 * @param {String} background
 *    Opcional, cor de fundo do texto a ser impresso, um dos valores
 *    disponíveis em `LoggerColors.colors`
 * @param {Boolean} is_bright
 *    Opcional, adiciona brilho à cor de texto a ser impresso
 * @param {String} add_to_log
 *    Opcional, caminho para um arquivo no sistema que armazenará o log de
 *    texto contendo a mensagem
 * @constructor
 */
const Logger = (
  message,
  color = LoggerColors.colors.white,
  background = LoggerColors.colors.black,
  is_bright = false,
  add_to_log = null
) => {
  // Define cores
  let fore = (LoggerColors.foreground[color] !== undefined)
    ? LoggerColors.foreground[color] : LoggerColors.foreground.white;
  let back = (LoggerColors.background[background] !== undefined)
    ? LoggerColors.background[background] : LoggerColors.background.black;
  
  // Define brilho
  let levels = (is_bright === true) ? "\x1b[1m" : "";
  
  // Monta mensagem (veja que ao final sempre resetamos a cor
  let out_message = levels + fore + back + message + "\x1b[0m";
  
  // Loga no console
  console.log(out_message);
  
  // Checa se `add_to_log` é um arquivo:
  if (add_to_log !== null) {
    // Define prefixo:
    let prefix = "LOG [" + (new Date().toISOString()) + "]: ";
    
    if (fs.existsSync(path.dirname(add_to_log))) {
      fs.appendFileSync(add_to_log, prefix + message + "\r\n");
    }
  }
};
export default Logger;
