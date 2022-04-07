import { resolve }              from 'path'
import fs                       from 'fs-extra'
import chalk                    from 'chalk'
import BeforeBuildPlugin        from 'before-build-webpack'
import MiniCssExtractPlugin     from 'mini-css-extract-plugin'
import SVGSpritemapPlugin       from 'svg-spritemap-webpack-plugin'

const __dirname = resolve()
const mode = process.env.NODE_ENV || 'development'
const target = mode === 'development' ? 'web' : 'browserslist'

export default {
	mode: mode,

	context: __dirname,

	entry: {
		styles: './styles/index.scss',
		bundle: './scripts/index.js',
	},

	output: {
		path: __dirname,
		filename: 'scripts/[name].min.js',
		assetModuleFilename: 'images/[hash][ext][query]',
		chunkFilename: '[id].[chunkhash].js',
	},

	module: {
		rules: [

			// Styles
			{
				test: /\.(scss|css)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						}
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
									// ['flex-gap-polyfill', ],
								]
							}
						}
					},
					'sass-loader',
				]
			},

			// Images
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},

			// Scripts
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						cacheDirectory: true,
					}
				}
			},

		]
	},

	plugins: [
		new BeforeBuildPlugin(function(stats, callback) {
			console.log( '\n' + chalk.blue.bold('Run webpack build') + ' on ' + chalk.green.bold(__dirname) )
			// cleanTwigCache(callback)
			callback()
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].min.css',
		}),
		new SVGSpritemapPlugin('./images/icons/*.svg', {
			output: {
				filename: 'images/icons.min.svg',
				svgo: false,
			},
			sprite: {
				prefix: false,
				generate: {
					title: false,
				}
			}
		}),
	],

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	watchOptions: {
		ignored: '**/node_modules',
	},

	target: target,
	devtool: mode === 'development' ? 'source-map' : false,
	performance: {
		// hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},

	// Static
	devServer: {
    static: {
			directory: __dirname,
      staticOptions: {},
      publicPath: "/",
      serveIndex: true,
      watch: true,
    }
  },

}
