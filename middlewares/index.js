const bodyParser = require('body-parser');
const cors = require("./cors");
const config = require("../config.json");
const compression = require('compression');

module.exports = function (app) {
    // Prevent opening page in frame or iframe to protect from clickjacking
    if (config.get('server.security.enableXframe'))
        app.use(helmet.frameguard());

    // Remove X-Powered-By
    if (config.get('server.security.enableHidePoweredBy'))
        app.use(helmet.hidePoweredBy());

    // Prevents browser from caching and storing page
    if (config.get('server.security.enableNoCaching'))
        app.use(helmet.cacheControl());

    // Allow loading resources only from white-listed domains
    if (config.get('server.security.enableCSP'))
        app.use(helmet.contentSecurityPolicy());

    // Allow communication only on HTTPS
    if (config.get('server.security.enableHSTS'))
        app.use(helmet.hsts());

    // Enable XSS filter in IE (On by default)
    if (config.get('server.security.enableXssFilter'))
        app.use(helmet.xssFilter());

    // Enable XSS filter in IE (On by default)
    if (config.get('server.security.enableReferrerPolicy'))
        app.use(helmet.referrerPolicy({ policy: "no-referrer", }));

    // Forces browser to only use the Content-Type set in the response header
    // instead of sniffing or guessing it
    if (config.get('server.security.enableForceContentType'))
        app.use(helmet.contentTypeOptions());

    // Enable CORS
    if (config.server.security.enableCORS) {
        cors(app);
    }

    // Enable request body parsing
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: config.server.bodyParser.limit
    }));

    // Enable request body parsing in JSON format
    app.use(bodyParser.json({
        limit: config.server.bodyParser.limit
    }));

    // Enable compression
    if (config.server.enableCompression) {
        app.use(compression());
    }
}