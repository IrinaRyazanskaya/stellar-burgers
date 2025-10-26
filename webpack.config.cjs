const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @param {Record<string, unknown>} env
 * @param {{ mode?: 'development' | 'production' | 'none' }} argv
 * @returns {import('webpack').Configuration}
 */
module.exports = (env = {}, argv = {}) => {
  const mode = argv.mode || "development";
  const apiClient = env.api === "real" ? "real" : "mock";
  const apiBaseUrl = apiClient === "real" ? "http://localhost:5000" : "";

  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss", ".png", ".svg", ".jpg"],
    },

    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "./dist"),
    },

    performance: {
      hints: false,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.module\.css$/i,
          exclude: /node_modules/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          type: "asset/resource",
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new DefinePlugin({
        __MODE__: JSON.stringify(mode),
        __BURGER_API_CLIENT__: JSON.stringify(apiClient),
        __BURGER_API_BASE_URL__: JSON.stringify(apiBaseUrl),
      }),
    ],

    devServer: {
      port: 4000,
      compress: true,
      historyApiFallback: true,
      static: path.join(__dirname, "./dist"),
    },
  };
};
