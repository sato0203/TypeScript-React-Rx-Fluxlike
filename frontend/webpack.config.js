const entry = {};
var fs = require("fs");
const projectList = fs.readdirSync("./src/projects");
projectList.forEach(x => {
    entry[x] = `./src/projects/${x}/index.ts`;
})

module.exports = {
    mode: "production",
    entry: entry,
    output: {
        filename: "[name].bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};