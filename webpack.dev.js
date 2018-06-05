const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
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
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
});
