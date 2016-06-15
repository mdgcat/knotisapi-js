var webpack = require('webpack'),
    path = require('path'),
    libraryName = 'knotisapi',
    target, libraryTarget,
    outputFile = libraryName + '.js',
    env = process.env.WEBPACK_ENV,
    entry = __dirname + '/src/index.js',
    plugins = [], entry, outputFile,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

if (env === 'web') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
    libraryTarget = 'var';
    target = 'web';

} else {
    outputFile = libraryName + '.js';
    entry = __dirname + '/src/index.js';
    libraryTarget = 'umd';
    target = 'node';

}


var config = {
    entry: entry,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: libraryName,
        libraryTarget: libraryTarget,
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins,
    target: target
};

module.exports = config;
