/*
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var path = require('path');
var webpack = require("webpack");

//var commonsPlugin =
//  new webpack.optimize.CommonsChunkPlugin('common.js');
var config = {
    context: path.join(__dirname, '/public'),
    entry: {
        client: ['./scripts/routes']
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, '/public/build'),
        publicPath: '/build/', //for the chunks to be downloaded from.
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.dust$/,
                loader: "dust"
            },
            {
                test: /\.jsx/,
                loader: 'jsx-loader?harmony' },

        ],
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['', '.js','.jsx', '.dust']
    },
    externals: {
        // Use external version of React (from CDN for client-side, or bundled with ReactJS.NET for server-side)
        backbone: 'Backbone',
        underscore: '_',
        jquery: 'jQuery',
        'dust-core': 'dust'
    },
    plugins: [
        // minimize
        // new webpack.optimize.UglifyJsPlugin({
        //   minimize: true
        // })
    ]

    //plugins:[new webpack.optimize.CommonsChunkPlugin('client','client.bundle.js')]
};

module.exports = config;
webpack(config, function (err, stats) {
    if (err) {
        console.log('Bundling error.');
    } else {
        console.log('Bundling complete.');
    }

});