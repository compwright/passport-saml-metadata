import assert from 'assert'
import { SAML } from 'passport-saml'

function configureMetadataRoute (app, config = {}) {
  assert.strictEqual(typeof config, 'object', 'config must be an object')
  assert.ok(config.issuer, 'config.issuer is required')
  assert.ok(config.callbackUrl, 'config.callbackUrl is required')

  app.get('/FederationMetadata/2007-06/FederationMetadata.xml', function (req, res) {
    const saml = new SAML({
      issuer: config.issuer,
      callbackUrl: config.callbackUrl,
      logoutCallbackUrl: config.logoutCallbackUrl
    })
    const xml = saml.generateServiceProviderMetadata()
    res.set('Content-Type', 'application/samlmetadata+xml').send(xml)
  })
}

export default (config) => function () {
  configureMetadataRoute(this, config)
}
