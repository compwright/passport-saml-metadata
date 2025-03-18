import assert from 'assert';
import axios from 'axios';
import Debug from 'debug';
import camelCase from 'lodash/camelCase.js';
import merge from 'lodash/merge.js';
import find from 'lodash/find.js';
import sortBy from 'lodash/sortBy.js';
import { DOMParser } from '@xmldom/xmldom';
import xpath from 'xpath';
import { SAML } from '@node-saml/node-saml';

const debug$3 = new Debug("passport-saml-metadata");
class MetadataReader {
  #options = {
    authnRequestBinding: "HTTP-Redirect",
    throwExceptions: false
  };
  #doc;
  #select;
  constructor(metadata, options = {}) {
    assert.equal(typeof metadata, "string", "metadata must be an XML string");
    this.#doc = new DOMParser().parseFromString(metadata, "text/xml");
    this.#select = xpath.useNamespaces({
      md: "urn:oasis:names:tc:SAML:2.0:metadata",
      claim: "urn:oasis:names:tc:SAML:2.0:assertion",
      sig: "http://www.w3.org/2000/09/xmldsig#"
    });
    this.#options = merge(this.#options, options);
  }
  query(query) {
    try {
      return this.#select(query, this.#doc);
    } catch (e) {
      debug$3(`Could not read xpath query "${query}"`, e);
      throw e;
    }
  }
  get identifierFormat() {
    try {
      return this.query("//md:IDPSSODescriptor/md:NameIDFormat/text()")[0].nodeValue;
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get identityProviderUrl() {
    try {
      const singleSignOnServiceElements = sortBy(this.query("//md:IDPSSODescriptor/md:SingleSignOnService"), (singleSignOnServiceElement2) => {
        const indexAttribute = find(singleSignOnServiceElement2.attributes, { name: "index" });
        if (indexAttribute) {
          return indexAttribute.value;
        }
        return 0;
      });
      const singleSignOnServiceElement = find(singleSignOnServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${this.#options.authnRequestBinding}`
        });
      }) || singleSignOnServiceElements[0];
      return find(singleSignOnServiceElement.attributes, { name: "Location" }).value;
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get logoutUrl() {
    try {
      const singleLogoutServiceElements = sortBy(this.query("//md:IDPSSODescriptor/md:SingleLogoutService"), (singleLogoutServiceElement2) => {
        const indexAttribute = find(singleLogoutServiceElement2.attributes, { name: "index" });
        if (indexAttribute) {
          return indexAttribute.value;
        }
        return 0;
      });
      const singleLogoutServiceElement = find(singleLogoutServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${this.#options.authnRequestBinding}`
        });
      }) || singleLogoutServiceElements[0];
      return find(singleLogoutServiceElement.attributes, { name: "Location" }).value;
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get encryptionCerts() {
    try {
      const certs = this.query('//md:IDPSSODescriptor/md:KeyDescriptor[@use="encryption" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate');
      if (!certs) {
        throw new Error("No encryption certificate found");
      }
      return certs.map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ""));
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get encryptionCert() {
    try {
      return this.encryptionCerts[0];
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get signingCerts() {
    try {
      const certs = this.query('//md:IDPSSODescriptor/md:KeyDescriptor[@use="signing" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate');
      if (!certs) {
        throw new Error("No signing certificate found");
      }
      return certs.map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ""));
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get signingCert() {
    try {
      return this.signingCerts[0];
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
  get claimSchema() {
    try {
      return this.query("//md:IDPSSODescriptor/claim:Attribute/@Name").reduce((claims, node) => {
        try {
          const name = node.value;
          const description = this.query(`//md:IDPSSODescriptor/claim:Attribute[@Name="${name}"]/@FriendlyName`)[0].value;
          const camelized = camelCase(description);
          claims[node.value] = { name, description, camelCase: camelized };
        } catch (e) {
          if (this.#options.throwExceptions) {
            throw e;
          }
        }
        return claims;
      }, {});
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      }
      return {};
    }
  }
  get entityId() {
    try {
      return this.query("//md:EntityDescriptor/@entityID")[0].value.replace(/[\r\n\t\s]/gm, "");
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e;
      } else {
        return void 0;
      }
    }
  }
}

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
    idpCert: !options.multipleCerts ? [].concat(signingCerts).pop() : signingCerts,
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
    const saml = new SAML({
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

export { MetadataReader, claimsToCamelCase, fetch, fetchMetadata, metadata, toPassportConfig };
