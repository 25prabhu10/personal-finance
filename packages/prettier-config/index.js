import prettierBaseConfig from "./prettier.base.js";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierBaseConfig,
  plugins: ["prettier-plugin-packagejson"],
};

export default config;
