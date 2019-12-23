const debug = require('debug')('passport-saml-metadata');

function toPassportConfig(reader = {}, options = { multipleCerts: false }) {
  const { identifierFormat, identityProviderUrl, logoutUrl, signingCerts } = reader;

  const config = {
    identityProviderUrl,
    entryPoint: identityProviderUrl,
    logoutUrl,
    cert: (!options.multipleCerts) ? [].concat(signingCerts).pop() : signingCerts,
    identifierFormat
  };

  debug('Extracted configuration', config);

  return config;
}

function claimsToCamelCase(claims, claimSchema) {
  const obj = {};

  for (let [key, value] of Object.entries(claims)) {
    try {
      obj[claimSchema[key].camelCase] = value;
    } catch (e) {
      debug(`Error while translating claim ${key}`, e);
    }
  }

  return obj;
}

module.exports = {
  toPassportConfig,
  claimsToCamelCase
};
