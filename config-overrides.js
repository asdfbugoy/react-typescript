const webpack = require('webpack');
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 4
    }))
    // config.externals = {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    //     'react-dom/server': 'ReactDOMServer',
    //     // '@material-ui/core': 'material-ui/core'
    //     // 'material-ui/core': /@material-ui\/core\/.*/,
    //     // 'material-ui/lab': 'MaterialUiLab',
    //     //'react/lib/ReactTransitionGroup': 'React.addons.TransitionGroup',
    //     //'react/lib/ReactCSSTransitionGroup': 'React.addons.CSSTransitionGroup'
    // }
    return config;
}