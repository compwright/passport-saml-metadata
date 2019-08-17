const debug = require('debug')('passport-saml-metadata');

function toPassportConfig(reader = {}) {
  const { identifierFormat, identityProviderUrl, logoutUrl, signingCerts } = reader;

  const config = {
    identityProviderUrl,
    entryPoint: identityProviderUrl,
    logoutUrl,
    cert: [].concat(signingCerts).pop(), // assumes the last cert is the most recent one
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
