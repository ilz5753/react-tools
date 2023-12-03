// rollup.config.js
import typescript from "rollup-plugin-typescript2";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "./index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  external: [
    "lodash.foreach",
    "lodash.includes",
    "lodash.indexof",
    "lodash.isfunction",
    "lodash.isnull",
    "lodash.isundefined",
    "lodash.map",
    "lodash.noop",
    "react",
    "react-dom",
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    tsConfigPaths({ tsConfigPath: "./tsconfig.json" }),
    nodeResolve({
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".d.ts"],
    }),
    commonjs(),
  ],
};
