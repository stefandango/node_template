const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
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
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'views/'
						}
					},
					'extract-loader',
					'html-loader'
				],
				exclude: path.resolve(__dirname, 'src/views/layouts/main.handlebars')
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
		/* 		new CopyWebpackPlugin([
			{
				from: 'src/views',
				to: 'views'
			}
		]), */

		new HtmlWebpackPlugin({
			template: 'src/views/layouts/main.handlebars',
			filename: 'views/layouts/main.handlebars'
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
