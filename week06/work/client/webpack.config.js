// Generated using webpack-cli https://github.com/webpack/webpack-cli

// 引入路径计算库
const path = require("path");
// 引入需要使用的插件分别为

// 可以给其设置一个模板，然后根据该模板，会自动根据Webpack生成的bundle路径来更新信息（方便开发调试）
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 可以在打包过程中生成单独是CSS文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 每次打包前，清除上一次打包的内容
const {CleanWebpackPlugin}=require("clean-webpack-plugin")

// 判断是开发模式还是其他，如果是开发模式，就会在下一句代码中
// 将样式载入器使用MiniCssExtractPlugin，就会生成css文件
// 可以更加方便的调试代码
const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

// 下面是一些信息配置
const config = {
  // 入口文件为index.tsx
  entry: "./src/index.tsx",
  // 输出文件名称为，名字+哈希值+.js，路径为server/public的路径
  output: {
    clean:true,
    filename: '[name].[contenthash:5].js',
    path: path.resolve(__dirname, "../server/public"),
  },
  // 设置代理，访问3001端口，方便开发
  devServer: {
    open: true,
    host: "localhost",
    proxy:{
      '/api':"http://localhost:3001"
    }
  },
  // 插件有HtmlWebpackPlugin，以Index.html为模板进行生成
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  // 一些规则:利用正则表达式,将不同的文件后缀名,使用不同的载入器,进行载入
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        // 这里stylesHandler是根据是否为开发,进行不同处理(是否生成CSS文件)
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

// 一个模块导出,将两个插件插入,还有设置模式为production还是development
module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new CleanWebpackPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
