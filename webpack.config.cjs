const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @param {Record<string, unknown>} env
 * @param {{ mode?: 'development' | 'production' | 'none' }} argv
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, "./src/index.tsx"),

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss", ".png", ".svg", ".jpg"],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
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
      __MODE__: JSON.stringify(argv.mode),
      __BURGER_API_CLIENT__: JSON.stringify("mock"),
      __BURGER_API_BASE_URL__: JSON.stringify(""),
    }),
  ],

  devServer: {
    port: 4000,
    compress: true,
    historyApiFallback: true,
    static: path.join(__dirname, "./dist"),
  },
});
