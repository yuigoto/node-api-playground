/**
 * NODE API : Core/Utilities
 * ----------------------------------------------------------------------
 * Define algumas funções utilitárias, de uso geral.
 *
 * Determinadas funções podem depender de alguns imports em `core/type`.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Imports
import os from "os";
import StatusCodes from "src/core/type/StatusCodes";

// Define container
const Utilities = {};

/**
 * Returns an array of the local IP address of the current machine running
 * this function.
 *
 * @return {Array}
 */
Utilities.ownAddressList = () => {
  // Declare address array and get network interfaces
  let addresses = [];
  let interface_list = os.networkInterfaces();
  // Push local addresses
  for (let i in interface_list) {
    for (let address of interface_list[i]) {
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
};

/**
 * Formata um UUID para o padrão 8-4-4-4-12, caso não esteja.
 * 
 * Caso não seja um UUID válido, retorna `false`.
 * 
 * @param {String} uuid 
 *    String to format
 * @returns {String|Boolean} 
 */
Utilities.formatUuid = (uuid) => {
  // Limpa a string primeiro
  uuid = uuid.match(
    /([a-fA-F0-9])/g, 
    ""
  ).join("").toLowerCase();
  
  // Caso não seja uma string válida
  if (uuid.length < 32 || uuid.length > 32) return false;
  
  // Formatando com replacement
  uuid = uuid.replace(
    /^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})/, 
    "$1-$2-$3-$4-$5"  
  );
  return uuid;
};

/**
 * Retorna o nome dos códigos de status HTTP a partir de uma lista.
 * 
 * @param {Number} code 
 *    Código de status HTTP
 * @returns {String}
 */
Utilities.httpStatusName = (code) => {
  let code_list = StatusCodes;

  return (code_list[code] !== null && code_list[code] !== undefined) 
    ? code_list[code] 
    : "Erro Desconhecido";
};

// Exportando
export default Utilities;
