const nunjucks = require('nunjucks');
const path = require('path');

module.exports.init = (app) => {
    const env = nunjucks
        .configure(path.resolve(__dirname, '..', 'app', 'views'), {
            autoescape: false,
            watch: true,
            express: app,
        })
        .addFilter('json', JSON.parse)
        .addGlobal('authServiceBaseUrl', process.env.AUTH_SERVICE_BASE_URL);
    // Sets Nunjucks as the Express template engine
    app.set('engine', env);
};
