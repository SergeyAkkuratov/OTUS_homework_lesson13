const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { globSync } = require("glob");

const htmlTemplates = globSync("./src/**/*.html").map(
  (htmlPath) =>
    new HtmlWebpackPlugin({
      template: `${htmlPath}`,
      filename: `${htmlPath.replace("src\\", "")}`,
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
  plugins: [...htmlTemplates],
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
