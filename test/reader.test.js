const assert = require('assert');
const fs = require('fs');
const path = require('path');
const MetadataReader = require('../src/reader');

const claimSchema = require('./data/claim-schema.json');
const metadata = fs.readFileSync(path.join(__dirname, 'data', 'metadata.xml')).toString();
const metadataNKDUA = fs.readFileSync(path.join(__dirname, 'data', 'metadata-no-keydescriptor-use.xml')).toString();

describe('MetadataReader', () => {
  it('loads', () => {
    assert.ok(MetadataReader);
  });

  describe('exposes property', () => {
    let config;

    before(() => {
      config = new MetadataReader(metadata);
    });

    it('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/Redirect');
    });

    it('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/Redirect');
    });

    it('identifierFormat', () => {
      assert.strictEqual(config.identifierFormat, 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress');
    });

    it('encryptionCert', () => {
      assert.strictEqual(config.encryptionCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==');
    });

    it('signingCert', () => {
      assert.strictEqual(config.signingCert, 'MIIC3DCCAcSgAwIBAgIQUpAeTBr76KxOOZBzPIhjujANBgkqhkiG9w0BAQsFADAqMSgwJgYDVQQDEx9BREZTIFNpZ25pbmcgLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzIwMFoXDTE1MDEzMDIzMzIwMFowKjEoMCYGA1UEAxMfQURGUyBTaWduaW5nIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKrpuk2psb1teCft5zrrBGzWPtiIA3Ts5opVz/bIBIVaSDnysrUi3JPUuDyx/vVf9F7D7yrPO2IfBI/bSs96fKmXFE5Rg1zsHqBJ58mOuKxwuhL2OffqPZQOyxAthJihayISSqR6mP4Z9J4O8cj6N+pWC3j1wx0Fbu1Nfeo15DHB7U+9N63Ycn7KizSdE2XiRn1veBIOG06RdznoQgK4uTpNJ6hyc+cJjsLid/tWGr4VjXa9qUK/zsVj63TalEKgVf2m8kVaD+8qBecSP9v3wIqW5my+MvCOE3EphfDcWZEPydrEZ2d3aOVMvjjGqDZtdJUBIm0Rmz4dQH8x9aB+PPkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAAXvZ4ZfFlUGU/y4mB2VYEpxdFBPW8JUT5jeCXRVvGGCyTacDUNJ3w3h0TZ0fTc5jJOZCtFhNOKJQtcCUVxhJbwEBQ4HxuZBUFox0ERohYUcitEntdCU1BYvuHOgAyjpLT4nuCQ5ChomZjs5txPbFZhFKI14G/kwq4A5LRbMT0YCEBBtaqlz+C4ad7WKCq5poS6z825DrsbOBLFj8+FLQtqwiiGhHqxNFtAM1mBq/ES8GNxLANlZZ/Xw9DTnNzaM60hqYIxZmKMdGTCMs4Yu32yyCvQ7QkuKx4pL5N6LA8huxSH+EKuSKfpXOHLbE75oPMKKH+qIehWmVqyCXr2A9Ag==');
    });

    it('claimSchema', () => {
      assert.deepStrictEqual(config.claimSchema, claimSchema);
    });
  });

  describe('handles no KeyDescriptor use attribute', () => {
    let config;

    before(() => {
      config = new MetadataReader(metadataNKDUA);
    });

    it('encryptionCert', () => {
      assert.strictEqual(config.encryptionCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==');
    });

    it('signingCert', () => {
      assert.strictEqual(config.signingCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==');
    });
  });

  describe('supports alternate authnRequestBinding HTTP-POST', () => {
    let config;

    before(() => {
      config = new MetadataReader(metadata, { authnRequestBinding: 'HTTP-POST' });
    });

    it('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/POST');
    });

    it('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/POST');
    });
  });

  describe('supports alternate authnRequestBinding HTTP-Artifact', () => {
    let config;

    before(() => {
      config = new MetadataReader(metadata, { authnRequestBinding: 'HTTP-Artifact' });
    });

    it('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/Artifact');
    });

    it('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/Artifact');
    });
  });
});
