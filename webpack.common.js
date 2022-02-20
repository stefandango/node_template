//const path = require('path');
import path from 'path';
import {dirname} from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//const isDevelopment = process.env.NODE_ENV != 'production';
//const HtmlWebpackPlugin = require('html-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';

//const webpackMode = require('webpack-mode');
import webpackMode from 'webpack-mode';

//const CopyWebpackPlugin = require('copy-webpack-plugin');

export default {
	entry: {
		app: './src/app.js',
		index: './src/sections/index/index.js',
		about: './src/sections/about/about.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: webpackMode.isProduction
			? '[name].[chunkhash].bundle.js'
			: '[name].bundle.js'
	},
	module: {
		rules: [
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
//module.exports = config;
//export const config;
