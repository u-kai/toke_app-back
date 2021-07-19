const path = require("path");
 
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "index.ts"),
  output: {
    path: path.resolve(__dirname),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      "~":path.resolve(__dirname, "src")
    },
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
          },
        },
      },
    ],
  },
};

