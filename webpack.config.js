const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const articles = fs.readdirSync("./src/articles").map(
  (name) =>
    new HtmlWebpackPlugin({
      template: `./src/articles/${name}`,
      filename: `articles/${name}`,
    }),
);

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/chat.html",
      filename: "./chat.html",
    }),
  ].concat(articles),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: "./dist",
  },
  optimization: {
    runtimeChunk: "single",
  },
};
