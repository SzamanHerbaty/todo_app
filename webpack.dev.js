import path from "node:path";
import { fileURLToPath } from "node:url";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 300,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ["src/**/*"],
    compress: true,
    historyApiFallback: true,
  },
});
