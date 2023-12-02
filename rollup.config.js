// rollup.config.js
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./index.ts",

  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
  ],
};
