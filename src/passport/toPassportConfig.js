import Debug from 'debug'

const debug = new Debug('passport-saml-metadata')

function toPassportConfig (reader = {}, options = { multipleCerts: false }) {
  const { identifierFormat, identityProviderUrl, logoutUrl, signingCerts } = reader

  const config = {
    identityProviderUrl,
    entryPoint: identityProviderUrl,
    logoutUrl,
    idpCert: (!options.multipleCerts) ? [].concat(signingCerts).pop() : signingCerts,
    identifierFormat
  }

  debug('Extracted configuration', config)

  return config
}

export default toPassportConfig
