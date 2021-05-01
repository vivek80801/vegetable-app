const {resolve} = require("path")

module.exports = {
    target: "node",
    mode: "production",
    entry: "./server.ts",
    output:{
        path: resolve(__dirname + "/dist"),
        filename: "bundle.min.js"
    },
     module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
