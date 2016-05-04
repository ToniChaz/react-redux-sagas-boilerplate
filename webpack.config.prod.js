const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'babel-polyfill',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({template: 'html!./src/index.html'}),
		/**
		 * This plugin assigns the module and chunk ids by occurence count. What this
		 * means is that frequently used IDs will get lower/shorter IDs - so they become
		 * more predictable.
		 */
		new webpack.optimize.OccurenceOrderPlugin(),
		/**
		 * See description in 'webpack.config.dev' for more info.
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		/**
		 * Some of you might recognize this! It minimizes all your JS output of chunks.
		 * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
		 * your production code through this!
		 */
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),

		new ExtractTextPlugin('styles.css', {allChunks: true})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src')
			}
			, {
				test: /\.global\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader'
				)
			}
			, {
				test: /^((?!\.global).)*\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]'
				)
			}
			, {
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader'
			}
		]
	}
};
