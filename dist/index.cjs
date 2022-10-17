'use strict';

const assert = require('assert');
const axios = require('axios');
const Debug = require('debug');
const camelCase = require('lodash/camelCase');
const merge = require('lodash/merge');
const find = require('lodash/find');
const sortBy = require('lodash/sortBy');
const xmldom = require('@xmldom/xmldom');
const xpath = require('xpath');
const passportSaml = require('passport-saml');

var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _options, _doc, _select, _query, query_fn;
const debug$3 = new Debug("passport-saml-metadata");
class MetadataReader {
  constructor(metadata, options = {}) {
    __privateAdd(this, _query);
    __privateAdd(this, _options, {
      authnRequestBinding: "HTTP-Redirect",
      throwExceptions: false
    });
    __privateAdd(this, _doc, void 0);
    __privateAdd(this, _select, void 0);
    assert.equal(typeof metadata, "string", "metadata must be an XML string");
    __privateSet(this, _doc, new xmldom.DOMParser().parseFromString(metadata));
    __privateSet(this, _select, xpath.useNamespaces({
      md: "urn:oasis:names:tc:SAML:2.0:metadata",
      claim: "urn:oasis:names:tc:SAML:2.0:assertion",
      sig: "http://www.w3.org/2000/09/xmldsig#"
    }));
    __privateSet(this, _options, merge(__privateGet(this, _options), options));
  }
  get identifierFormat() {
    try {
      return __privateMethod(this, _query, query_fn).call(this, "//md:IDPSSODescriptor/md:NameIDFormat/text()")[0].nodeValue;
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get identityProviderUrl() {
    try {
      const singleSignOnServiceElements = sortBy(__privateMethod(this, _query, query_fn).call(this, "//md:IDPSSODescriptor/md:SingleSignOnService"), (singleSignOnServiceElement2) => {
        const indexAttribute = find(singleSignOnServiceElement2.attributes, { name: "index" });
        if (indexAttribute) {
          return indexAttribute.value;
        }
        return 0;
      });
      const singleSignOnServiceElement = find(singleSignOnServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${__privateGet(this, _options).authnRequestBinding}`
        });
      }) || singleSignOnServiceElements[0];
      return find(singleSignOnServiceElement.attributes, { name: "Location" }).value;
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get logoutUrl() {
    try {
      const singleLogoutServiceElements = sortBy(__privateMethod(this, _query, query_fn).call(this, "//md:IDPSSODescriptor/md:SingleLogoutService"), (singleLogoutServiceElement2) => {
        const indexAttribute = find(singleLogoutServiceElement2.attributes, { name: "index" });
        if (indexAttribute) {
          return indexAttribute.value;
        }
        return 0;
      });
      const singleLogoutServiceElement = find(singleLogoutServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${__privateGet(this, _options).authnRequestBinding}`
        });
      }) || singleLogoutServiceElements[0];
      return find(singleLogoutServiceElement.attributes, { name: "Location" }).value;
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get encryptionCerts() {
    try {
      return __privateMethod(this, _query, query_fn).call(this, '//md:IDPSSODescriptor/md:KeyDescriptor[@use="encryption" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate').map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ""));
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get encryptionCert() {
    try {
      return this.encryptionCerts[0].replace(/[\r\n\t\s]/gm, "");
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get signingCerts() {
    try {
      return __privateMethod(this, _query, query_fn).call(this, '//md:IDPSSODescriptor/md:KeyDescriptor[@use="signing" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate').map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ""));
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get signingCert() {
    try {
      return this.signingCerts[0].replace(/[\r\n\t\s]/gm, "");
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get claimSchema() {
    try {
      return __privateMethod(this, _query, query_fn).call(this, "//md:IDPSSODescriptor/claim:Attribute/@Name").reduce((claims, node) => {
        try {
          const name = node.value;
          const description = __privateMethod(this, _query, query_fn).call(this, `//md:IDPSSODescriptor/claim:Attribute[@Name="${name}"]/@FriendlyName`)[0].value;
          const camelized = camelCase(description);
          claims[node.value] = { name, description, camelCase: camelized };
        } catch (e) {
          if (__privateGet(this, _options).throwExceptions) {
            throw e;
          }
        }
        return claims;
      }, {});
    } catch (e) {
      if (__privateGet(this, _options).throwExceptions) {
        throw e;
      }
      return {};
    }
  }
}
_options = new WeakMap();
_doc = new WeakMap();
_select = new WeakMap();
_query = new WeakSet();
query_fn = function(query) {
  try {
    return __privateGet(this, _select).call(this, query, __privateGet(this, _doc));
  } catch (e) {
    debug$3(`Could not read xpath query "${query}"`, e);
    throw e;
  }
};

const debug$2 = new Debug("passport-saml-metadata");
const defaults = {
  client: axios,
  responseType: "text",
  timeout: 2e3,
  backupStore: /* @__PURE__ */ new Map()
};
async function fetchMetadata(config = {}) {
  const {
    client,
    url,
    backupStore,
    ...params
  } = Object.assign({}, defaults, config);
  assert.ok(url, "url is required");
  assert.ok(backupStore, "backupStore is required");
  assert.equal(typeof backupStore.get, "function", "backupStore must have a get(key) function");
  assert.equal(typeof backupStore.set, "function", "backupStore must have a set(key, value) function");
  debug$2("Loading metadata", url, params.timeout, backupStore);
  try {
    const res = await client.get(url, params);
    debug$2("Metadata loaded", res.headers["content-length"]);
    backupStore.set(url, res.data);
    return res.data;
  } catch (err) {
    let error;
    if (err.response) {
      error = new Error(err.response.data);
      error.status = err.response.status;
    } else if (err.request) {
      error = new Error("Error during request, no response");
    } else {
      error = err;
    }
    debug$2("Metadata request failed, attempting backup store", error);
    try {
      const data = await Promise.resolve(backupStore.get(url));
      if (data) {
        debug$2("Metadata loaded from backupStore", data.length);
        return data;
      } else {
        debug$2("Backup store was empty");
        throw error;
      }
    } catch (err2) {
      debug$2("Backup store request error", err2);
      throw error;
    }
  }
}
const fetch = (config) => fetchMetadata(config).then((xml) => new MetadataReader(xml));

const debug$1 = new Debug("passport-saml-metadata");
function claimsToCamelCase(claims, claimSchema) {
  const obj = {};
  for (const [key, value] of Object.entries(claims)) {
    try {
      obj[claimSchema[key].camelCase] = value;
    } catch (e) {
      debug$1(`Error while translating claim ${key}`, e);
    }
  }
  return obj;
}

const debug = new Debug("passport-saml-metadata");
function toPassportConfig(reader = {}, options = { multipleCerts: false }) {
  const { identifierFormat, identityProviderUrl, logoutUrl, signingCerts } = reader;
  const config = {
    identityProviderUrl,
    entryPoint: identityProviderUrl,
    logoutUrl,
    cert: !options.multipleCerts ? [].concat(signingCerts).pop() : signingCerts,
    identifierFormat
  };
  debug("Extracted configuration", config);
  return config;
}

function configureMetadataRoute(app, config = {}) {
  assert.strictEqual(typeof config, "object", "config must be an object");
  assert.ok(config.issuer, "config.issuer is required");
  assert.ok(config.callbackUrl, "config.callbackUrl is required");
  app.get("/FederationMetadata/2007-06/FederationMetadata.xml", function(req, res) {
    const saml = new passportSaml.SAML({
      issuer: config.issuer,
      callbackUrl: config.callbackUrl,
      logoutCallbackUrl: config.logoutCallbackUrl
    });
    const xml = saml.generateServiceProviderMetadata();
    res.set("Content-Type", "application/samlmetadata+xml").send(xml);
  });
}
const metadata = (config) => function() {
  configureMetadataRoute(this, config);
};

exports.MetadataReader = MetadataReader;
exports.claimsToCamelCase = claimsToCamelCase;
exports.fetch = fetch;
exports.fetchMetadata = fetchMetadata;
exports.metadata = metadata;
exports.toPassportConfig = toPassportConfig;
