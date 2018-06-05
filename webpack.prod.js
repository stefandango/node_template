const merge = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', // translates CSS into CommonJS
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader', // compiles Less to CSS
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
