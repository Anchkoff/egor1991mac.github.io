const path = require("path");
const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var ImageminPlugin = require("imagemin-webpack-plugin").default;
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "src")
};
function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  let arrPlugin = [];
    templateFiles.forEach(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    arrPlugin.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    }));
    arrPlugin.push(new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }));

  });
  return arrPlugin;
}



let htmlPlugins = generateHtmlPlugins("./src/html/views");


const config = {
  entry: ["./src/js/index.js", "./src/scss/style.scss"],
  output: {
    filename: "./js/bundle.js",
    chunkFilename: '[name].bundle.js',
  },
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(sass|scss|css)$/,
        include: path.resolve(__dirname, "src/scss"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                }),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/html/includes"),
        use: ["raw-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: true
      }),
     
    ],  

  

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.bundle.css"
    }),
    
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
   
    
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    

    new CopyWebpackPlugin([
      {
        from: "./src/assets",
        to: "./assets"
      },
      {
        from: "./src/fonts",
        to: "./fonts"
      },
      {
        from: "./src/favicon",
        to: "./favicon"
      },
      {
        from: "./src/img",
        to: "./img"
      },
      {
        from: "./src/uploads",
        to: "./uploads"
      }
    ]),
   
  ].concat(htmlPlugins),
  
 
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
