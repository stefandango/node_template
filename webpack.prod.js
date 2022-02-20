//const { merge } = require('webpack-merge');
import {merge} from 'webpack-merge';
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

//const autoprefixer = require('autoprefixer');
import autoprefixer from 'autoprefixer';

//const common = require('./webpack.common.cjs');
import common from './webpack.common.js';

export default merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', // translates CSS into CommonJS
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader', // compiles Less to CSS
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new FaviconsWebpackPlugin('./src/assets/my-logo.png'),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
	]
});
