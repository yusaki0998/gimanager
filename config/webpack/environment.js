
const { environment } = require('@rails/webpacker');

const webpack = require('webpack');

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