const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: {
		app: './src/app.js',
		index: './src/sections/index/index.js',
		about: './src/sections/about/about.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[hash].bundle.js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/
			},
			{
				test: /\.handlebars$/,
				use: [
					{
						loader: 'handlebars-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'views/'
						}
					},
					'extract-loader',
					'html-loader'
				],
				exclude: [
					path.resolve(
						__dirname,
						'src/sections/shared/layouts/main.handlebars'
					),
					path.resolve(__dirname, 'src/sections/index/index.handlebars'),
					path.resolve(__dirname, 'src/sections/about/about.handlebars')
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'assets/[hash]-[name].[ext]'
						}
					},
					'image-webpack-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/sections/shared/layouts/main.handlebars',
			filename: 'views/layouts/main.handlebars',
			inject: 'head', // Main should load before template (therefor include in head..)
			chunks: ['app']
		}),
		new HtmlWebpackPlugin({
			template: 'src/sections/index/index.handlebars',
			filename: 'views/index.handlebars',
			inject: true,
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			template: 'src/sections/about/about.handlebars',
			filename: 'views/about.handlebars',
			inject: true,
			chunks: ['about']
		})

		//new FaviconsWebpackPlugin('./src/assets/my-logo.png')
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
};
module.exports = config;
