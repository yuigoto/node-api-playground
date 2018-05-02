/**
 * NODE API : Core/Type/LoggerColors
 * ----------------------------------------------------------------------
 * Listas contendo strings com nomes e valores das cores utilizadas pelo
 * Logger.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
export default {
  // Objeto contendo nomes das cores disponíveis no console
  colors: {
    black: "black",
    red: "red",
    green: "green",
    yellow: "yellow",
    blue: "blue",
    magenta: "magenta",
    cyan: "cyan",
    white: "white"
  },
  // Valores para as cores de fundo disponíveis no console
  background: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m"
  },
  // Valores para as cores de texto disponíveis no console
  foreground: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
  }
};
