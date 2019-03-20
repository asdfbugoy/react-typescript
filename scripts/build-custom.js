const webpack = require('webpack');
const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 2
}))

config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOMServer',
    //'react/lib/ReactTransitionGroup': 'React.addons.TransitionGroup',
    //'react/lib/ReactCSSTransitionGroup': 'React.addons.CSSTransitionGroup'
}