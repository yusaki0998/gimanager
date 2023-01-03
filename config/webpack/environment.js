
const { environment } = require('@rails/webpacker');
const erb = require('./loaders/erb')

const webpack = require('webpack');


// resolve-url-loader must be used before sass-loader
environment.loaders.get('sass').use.splice(-1, 0, {
    loader: 'resolve-url-loader',
    options: {
        attempts: 1
    }
});


// Add an additional plugin of your choosing : ProvidePlugin

environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
        $: 'jquery',
        JQuery: 'jquery',
        jquery: 'jquery',
        Popper: ['popper.js', 'default'], // for Bootstrap 4
        Rails: ['@rails/ujs']
    })
)


const aliasConfig = {
    'jquery': 'jquery/src/jquery',
    'jquery-ui': 'jquery-ui-dist/jquery-ui.js'

};

environment.config.set('resolve.alias', aliasConfig);

//
environment.loaders.prepend('erb', erb)
module.exports = environment;