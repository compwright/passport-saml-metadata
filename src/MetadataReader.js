import assert from 'assert'
import Debug from 'debug'
import camelCase from 'lodash/camelCase'
import merge from 'lodash/merge'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'
import { DOMParser } from '@xmldom/xmldom'
import xpath from 'xpath'

const debug = new Debug('passport-saml-metadata')

export class MetadataReader {
  #options = {
    authnRequestBinding: 'HTTP-Redirect',
    throwExceptions: false
  }

  #doc

  #select

  constructor (metadata, options = {}) {
    assert.equal(typeof metadata, 'string', 'metadata must be an XML string')

    this.#doc = new DOMParser().parseFromString(metadata)

    this.#select = xpath.useNamespaces({
      md: 'urn:oasis:names:tc:SAML:2.0:metadata',
      claim: 'urn:oasis:names:tc:SAML:2.0:assertion',
      sig: 'http://www.w3.org/2000/09/xmldsig#'
    })

    this.#options = merge(this.#options, options)
  }

  #query (query) {
    try {
      return this.#select(query, this.#doc)
    } catch (e) {
      debug(`Could not read xpath query "${query}"`, e)
      throw e
    }
  }

  get identifierFormat () {
    try {
      return this.#query('//md:IDPSSODescriptor/md:NameIDFormat/text()')[0].nodeValue
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get identityProviderUrl () {
    try {
      // Get all of the SingleSignOnService elements in the XML, sort them by the index (if provided)
      const singleSignOnServiceElements = sortBy(this.#query('//md:IDPSSODescriptor/md:SingleSignOnService'), (singleSignOnServiceElement) => {
        const indexAttribute = find(singleSignOnServiceElement.attributes, { name: 'index' })

        if (indexAttribute) {
          return indexAttribute.value
        }

        return 0
      })

      // Find the specified authentication binding, if not available default to the first binding in the list
      const singleSignOnServiceElement = find(singleSignOnServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${this.#options.authnRequestBinding}`
        })
      }) || singleSignOnServiceElements[0]

      // Return the location
      return find(singleSignOnServiceElement.attributes, { name: 'Location' }).value
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get logoutUrl () {
    try {
      // Get all of the SingleLogoutService elements in the XML, sort them by the index (if provided)
      const singleLogoutServiceElements = sortBy(this.#query('//md:IDPSSODescriptor/md:SingleLogoutService'), (singleLogoutServiceElement) => {
        const indexAttribute = find(singleLogoutServiceElement.attributes, { name: 'index' })

        if (indexAttribute) {
          return indexAttribute.value
        }

        return 0
      })

      // Find the specified authentication binding, if not available default to the first binding in the list
      const singleLogoutServiceElement = find(singleLogoutServiceElements, (element) => {
        return find(element.attributes, {
          value: `urn:oasis:names:tc:SAML:2.0:bindings:${this.#options.authnRequestBinding}`
        })
      }) || singleLogoutServiceElements[0]

      // Return the location
      return find(singleLogoutServiceElement.attributes, { name: 'Location' }).value
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get encryptionCerts () {
    try {
      return this.#query('//md:IDPSSODescriptor/md:KeyDescriptor[@use="encryption" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate')
        .map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ''))
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get encryptionCert () {
    try {
      return this.encryptionCerts[0].replace(/[\r\n\t\s]/gm, '')
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get signingCerts () {
    try {
      return this.#query('//md:IDPSSODescriptor/md:KeyDescriptor[@use="signing" or not(@use)]/sig:KeyInfo/sig:X509Data/sig:X509Certificate')
        .map((node) => node.firstChild.data.replace(/[\r\n\t\s]/gm, ''))
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get signingCert () {
    try {
      return this.signingCerts[0].replace(/[\r\n\t\s]/gm, '')
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      } else {
        return undefined
      }
    }
  }

  get claimSchema () {
    try {
      return this.#query('//md:IDPSSODescriptor/claim:Attribute/@Name')
        .reduce((claims, node) => {
          try {
            const name = node.value
            const description = this.#query(`//md:IDPSSODescriptor/claim:Attribute[@Name="${name}"]/@FriendlyName`)[0].value
            const camelized = camelCase(description)
            claims[node.value] = { name, description, camelCase: camelized }
          } catch (e) {
            if (this.#options.throwExceptions) {
              throw e
            }
          }
          return claims
        }, {})
    } catch (e) {
      if (this.#options.throwExceptions) {
        throw e
      }
      return {}
    }
  }
}

export default MetadataReader
