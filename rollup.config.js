/**
 * NODE_API : Rollup Config
 * ----------------------------------------------------------------------
 * Config file used by RollUp to generate a project build.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Import libs
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";
import includePaths from "rollup-plugin-includepaths";
import uglify from "rollup-plugin-uglify";

// Config
export default {
  input: "src/server.js",
  output: {
    file: "build/server.js",
    format: "cjs"
  },
  plugins: [
    babel(babelrc()),
    includePaths({
      include: {},
      paths: ["src/config"],
      external: [
        "crypto-js/md5",
        "crypto-js/sha1",
        "crypto-js/sha256",
        "dotenv",
        "express",
        "fs",
        "mongoose",
        "os",
        "path",
      ],
      extensions: [".json"]
    }),
    uglify()
  ]
};
