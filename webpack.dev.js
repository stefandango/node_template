//const { merge } = require('webpack-merge');
import {merge} from 'webpack-merge';

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

//const common = require('./webpack.common.cjs');
import common from './webpack.common.js';
//const autoprefixer = require('autoprefixer');
import autoprefixer from 'autoprefixer';

export default merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						// Loader for webpack to process CSS with PostCSS
						loader: 'postcss-loader',
						options: {
							options: {},
							plugins: () => {
								autoprefixer({ browsers: ['last 2 versions'] });
							}
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader', // compiles SASS to CSS
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
});
