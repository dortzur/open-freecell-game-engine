var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/index.js' // Your appʼs entry point
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    output: {
        library: "FreecellGameEngine",
        libraryTarget: "umd",
        filename:"dist/freecell-game.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        noInfo: true, //  --no-info option
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
