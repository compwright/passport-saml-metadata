const assert = require('assert');
const SAML = require('passport-saml').SAML;

function configureMetadataRoute (app, config = {}) {
  assert.strictEqual(typeof config, 'object', 'config must be an object');
  assert.ok(config.issuer, 'config.issuer is required');
  assert.ok(config.callbackUrl, 'config.callbackUrl is required');

  app.get('/FederationMetadata/2007-06/FederationMetadata.xml', function (req, res) {
    const saml = new SAML({
      issuer: config.issuer,
      callbackUrl: config.callbackUrl,
      logoutCallbackUrl: config.logoutCallbackUrl
    });
    const xml = saml.generateServiceProviderMetadata();
    res.set('Content-Type', 'application/samlmetadata+xml').send(xml);
  });
}

module.exports = (config) => function () {
  configureMetadataRoute(this, config);
};
