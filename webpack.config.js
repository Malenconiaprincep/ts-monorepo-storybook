const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')
const libraryName = 'seed'
module.exports = env => {
  env = env || {}
  const config = () => {
    return {
      mode: env.NODE_ENV === 'production' ? 'production' : 'none',
      entry: './lib/index.ts',
      output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        plugins: [new TsconfigPathsPlugin({ configFile: require.resolve('./tsconfig.json') })],
      },
      // Prevent external duplication of packaging
      // https://webpack.js.org/configuration/externals/#root
      externals: {
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: 'React'
        },
        "react-dom": {
          root: "ReactDOM",
          commonjs2: "react-dom",
          commonjs: "react-dom",
          amd: "react-dom"
        }
      },
      module: {
        rules: [
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: "typings-for-css-modules-loader",
                options: {
                  modules: true,
                  namedExport: true,
                  camelCase: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              require.resolve('less-loader')
            ]
          },
          {
            test: /\.scss$/,
            use: [
              require.resolve('style-loader'),
              // require.resolve('css-loader'),
              {
                loader: "typings-for-css-modules-loader",
                options: {
                  modules: true,
                  namedExport: true,
                  localIdentName: "[local]_[hash:base64:5]",
                  camelCase: true
                  // sass: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              require.resolve('sass-loader')
            ]
          },

          {
            test: /\.tsx?$/,
            use: ['ts-loader']
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new DtsBundlePlugin(),
        new MiniCssExtractPlugin({
          filename: 'styles.css'
        })
      ],
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            parallel: 4,
          }),
        ],
      }
    }
  }


  return config()
}



function DtsBundlePlugin() { }
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function () {
    var dts = require('dts-bundle');
    dts.bundle({
      name: libraryName,
      main: 'lib/index.d.ts',
      out: path.resolve(process.cwd(), 'dist', 'index.d.ts'),
      removeSource: false,
      outputAsModuleFolder: true // to use npm in-package typings
    });

    // Delete unneeded files

  });
};