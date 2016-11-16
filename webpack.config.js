module.exports = {
    devtool: 'sourcemap',
    context: __dirname + "/js/",
    entry: "./main.js",
    output: {
        path: __dirname + "/dist/",
        publicPath: "/dist/",
        filename: "bundle.js"
    }
};