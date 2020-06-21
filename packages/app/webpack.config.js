const autoprefixer = require('autoprefixer');
const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const monorepoRoot = join(__dirname, '..', '..');
console.log(join(__dirname, 'public', 'index.html'))
module.exports = {
  devtool: 'source-map',
  context: monorepoRoot,
  entry: join(__dirname, 'src', 'app'),
  output: {
    path: join(__dirname, 'umd')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    plugins: [new TsconfigPathsPlugin({ configFile: join(monorepoRoot, 'tsconfig.json') })]
  },
  // externals: {
  //   react: {
  //     commonjs: 'react',
  //     commonjs2: 'react',
  //     amd: 'react',
  //     root: 'React'
  //   }
  // },
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
    new HtmlWebpackPlugin({
      inject: true,
      template: join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
};
