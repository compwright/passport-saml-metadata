import assert from 'assert'
import fs from 'fs'
import { describe, test, beforeAll } from '@jest/globals'
import path from 'path'
import { MetadataReader } from './MetadataReader'
import claimSchema from '../resources/claim-schema.json'

const metadata = fs.readFileSync(path.resolve('resources', 'metadata.xml')).toString()
const metadataNKDUA = fs.readFileSync(path.resolve('resources', 'metadata-no-keydescriptor-use.xml')).toString()
const metadataCertKeyMultiline = fs.readFileSync(path.resolve('resources', 'metadata-cert-key-multiline.xml')).toString()

describe('MetadataReader', () => {
  test('loads', () => {
    assert.ok(MetadataReader)
  })

  describe('exposes property', () => {
    let config

    beforeAll(() => {
      config = new MetadataReader(metadata)
    })

    test('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/Redirect')
    })

    test('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/Redirect')
    })

    test('identifierFormat', () => {
      assert.strictEqual(config.identifierFormat, 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress')
    })

    test('encryptionCert', () => {
      assert.strictEqual(config.encryptionCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==')
    })

    test('signingCert', () => {
      assert.strictEqual(config.signingCert, 'MIIC3DCCAcSgAwIBAgIQUpAeTBr76KxOOZBzPIhjujANBgkqhkiG9w0BAQsFADAqMSgwJgYDVQQDEx9BREZTIFNpZ25pbmcgLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzIwMFoXDTE1MDEzMDIzMzIwMFowKjEoMCYGA1UEAxMfQURGUyBTaWduaW5nIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKrpuk2psb1teCft5zrrBGzWPtiIA3Ts5opVz/bIBIVaSDnysrUi3JPUuDyx/vVf9F7D7yrPO2IfBI/bSs96fKmXFE5Rg1zsHqBJ58mOuKxwuhL2OffqPZQOyxAthJihayISSqR6mP4Z9J4O8cj6N+pWC3j1wx0Fbu1Nfeo15DHB7U+9N63Ycn7KizSdE2XiRn1veBIOG06RdznoQgK4uTpNJ6hyc+cJjsLid/tWGr4VjXa9qUK/zsVj63TalEKgVf2m8kVaD+8qBecSP9v3wIqW5my+MvCOE3EphfDcWZEPydrEZ2d3aOVMvjjGqDZtdJUBIm0Rmz4dQH8x9aB+PPkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAAXvZ4ZfFlUGU/y4mB2VYEpxdFBPW8JUT5jeCXRVvGGCyTacDUNJ3w3h0TZ0fTc5jJOZCtFhNOKJQtcCUVxhJbwEBQ4HxuZBUFox0ERohYUcitEntdCU1BYvuHOgAyjpLT4nuCQ5ChomZjs5txPbFZhFKI14G/kwq4A5LRbMT0YCEBBtaqlz+C4ad7WKCq5poS6z825DrsbOBLFj8+FLQtqwiiGhHqxNFtAM1mBq/ES8GNxLANlZZ/Xw9DTnNzaM60hqYIxZmKMdGTCMs4Yu32yyCvQ7QkuKx4pL5N6LA8huxSH+EKuSKfpXOHLbE75oPMKKH+qIehWmVqyCXr2A9Ag==')
    })

    test('claimSchema', () => {
      assert.deepStrictEqual(config.claimSchema, claimSchema)
    })
  })

  describe('handles no KeyDescriptor use attribute', () => {
    let config

    beforeAll(() => {
      config = new MetadataReader(metadataNKDUA)
    })

    test('encryptionCert', () => {
      assert.strictEqual(config.encryptionCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==')
    })

    test('signingCert', () => {
      assert.strictEqual(config.signingCert, 'MIIC4jCCAcqgAwIBAgIQXYcAQ3jZkL9Jk9d7fx+xBjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJBREZTIEVuY3J5cHRpb24gLSBzdHMudW5pbGV2ZXIuY29tMB4XDTE0MDEzMDIzMzE1OVoXDTE1MDEzMDIzMzE1OVowLTErMCkGA1UEAxMiQURGUyBFbmNyeXB0aW9uIC0gc3RzLnVuaWxldmVyLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK+mqNP12dt1or2EpIpjHDwoC9Erkso3vDAwJ5vpHI7wRaTTnieiI6rtujQDDINNky98TdM7oD4JO3peaZHFuHeIsol8Gpqw9PnA7RA9mpeJ1irCp8DtSQdTcfKBLQ+YbMWSvFF4Z6xaP2BMggkB15H/+FD31BUSyBD3bLbeOlS/1loqtfyHJCYkGXc8wKLNbLItT1wku63X4YjpOOOEUh+jGoVCXYwkOhScmji/7MhdV9woqyxi5F/rmCrOIJHgqNBa4cwb/1+GSrYHNUPBLanXB+zS6hmAu3ceG9IaWDcxXqBISo0mrI80SuobLlEbk9N2JO2WDOLssMkj0/wH27MCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAG04bVFpr0QNDVIFyHcuCbVFMj1ZryYT9U12mwSgkzYjaIeXIFC0UzoGK1YcsNDuFil1LUtgjak1nKNcc50LOtTKDrimRgD6OcUScMLxyogte46E1clvRYvGLiawtvFx9fM9nGyRmybKHxbmLmCXYBEgietahoGrw5ohWQov1hjIRJ4evPvUx9fqi7V13rEvL0s+J2JhbmZIkecWagn+Dno0bvWOkVmPt2A+JB5Yqu5K6wZlBMNYvKyyaKu8TwuVrWZYm+3DJazg3yycLkJDkxpEGnj+exZ8j7e0Jhcfhk1UeqJ/e/8fwcZ3IostF93+Nc2mMJHmFKfLnFDJDYtZQbw==')
    })
  })

  describe('parses correctly multiline certificate key', () => {
    let config

    beforeAll(() => {
      config = new MetadataReader(metadataCertKeyMultiline)
    })

    test('encryptionCert', () => {
      assert.strictEqual(config.encryptionCert, 'MIIGNzCCBR+gAwIBAgIRAIgwRqGmpAjEdu+QhhQH4Z8wDQYJKoZIhvcNAQELBQAwbTESMBAGCgmSMRIwEAYKCZImiZPyLGQBGRYCZXAxFjAUBgNVBAMTDUVQU2lnbiBTU0wgQ0EwHhcNMTgwOTI3MTMwODMzWhcNMjAwOTI3MTMwODM0WjCBnTESMBAGCgmSJomT8ixkARkWAmV1MRUwEwYKCZImiZPyLGQBGRYFdW5pb24xFDASBgoJkiaJk/IsZAEZFgRwYXJsMRIwEAYKCZImiZPyLGQBGRYCZXAxGzAZBgNVBAsTEkRHIElURUMvT1BFUkFUSU9OUzEpMCcGA1UEAxMgV2ViU1NPIEZlZGVyYXRpb24gcHJlLXByb2R1Y3Rpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCLrlA2nl5WQdqVxy3khLAD67Wg1cyHPojXmdkn406m+pdPHCdE8HArJWKFzWozPpHaTfMg705tP9/Xar3PY5oOhK0dF40NTvG1ACcZrNGRDZ+5Et5GxEb2h/CFQTs9nZtNszkh9EpmAXEcZ+sD9J9FDVmFMgHnvcQDe08mm7PwxF2dN87Hx5ljF3Ek/4D9Tv6NEF5BNYKnG7CJSr9bVchJE5Z7YKEbofI71PKJhaoncbMRNHsFd17BJB0dI/5VDNPrVGi08PzW33W3hkc0JTB17g2EDW+NV2aPfw6tAezB7cJAKLuix4m/fBB1sagZu6h9+4jexUL7+7U7iSuk0wgPAgMBAAGjggKfMIICmzATBgNVHSUEDDAKBggrBgEFBQcDATAOBgNVHQ8BAf8EBAMCA6gwEQYJYIZIAYb4QgEBBAQDAgZAMIGbBggrBgEFBQcBAQSBjjCBizBMBggrBgEFBQcwAoZAaHR0cDovL2Vwc2lnbi5ldXJvcGFybC5ldXJvcGEuZXUvY2VydC9FUFNpZ24tQXBwbGljYXRpb25zLUNBLmNydDA7BggrBgEFBQcwAYYvaHR0cDovL29jc3AuZXBzaWduLmV1cm9wYXJsLmV1cm9wYS5lL2Vwc2lnbi5lcC5wYXJsLnVuaW9uLmV1L2NybC9FUFNpZ24tU1NMLUNBLmNybDArBgNVHREEJDAigiBXZWJTU08gRmVkZXJhdGlvbiBwcmUtcHJvZHVjdGlvbjAdBgNVHQ4EFgQUcEPmGNSthUQVEp1qTJQWb7d0y6UwDQYJKoZIhvcNAQELBQADggEBAMD5y0odP/JBFWsVg9sQUw23iWRAlq/VY710go+ERB3AH4HP1LWSyjnhJzWpfvSF4zQAaDvcqyc1/9ayS+Q4CldQ34gEmclZnZO0Vbvd+8NZUxgqW/FyjzPLkpi3lEpeNp7q+K7/+snU8EWSc+6P7Ei0Mjj1LncKzK1j/ROn4B0PbHZFdoGbvtbJ9pxWtx3H0jg3eLVj8RYDs9qVJ2HmJV7rWpVIHsYT+8+41TsePSoHBp5AP/tZlwUWZFzFimbgLh8TcRvIq/F27cGlKQDYdQDOXU43qtO4IgWn1QV1bQthzojmNfTdYF1MrTFeIpCcGogbS90a6r3nFLkgFm+9r9U=')
    })

    test('signingCert', () => {
      assert.strictEqual(config.signingCert, 'MIIGNzCCBR+gAwIBAgIRAIgwRqGmpAjEdu+QhhQH4Z8wDQYJKoZIhvcNAQELBQAwbTESMBAGCgmSMRIwEAYKCZImiZPyLGQBGRYCZXAxFjAUBgNVBAMTDUVQU2lnbiBTU0wgQ0EwHhcNMTgwOTI3MTMwODMzWhcNMjAwOTI3MTMwODM0WjCBnTESMBAGCgmSJomT8ixkARkWAmV1MRUwEwYKCZImiZPyLGQBGRYFdW5pb24xFDASBgoJkiaJk/IsZAEZFgRwYXJsMRIwEAYKCZImiZPyLGQBGRYCZXAxGzAZBgNVBAsTEkRHIElURUMvT1BFUkFUSU9OUzEpMCcGA1UEAxMgV2ViU1NPIEZlZGVyYXRpb24gcHJlLXByb2R1Y3Rpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCLrlA2nl5WQdqVxy3khLAD67Wg1cyHPojXmdkn406m+pdPHCdE8HArJWKFzWozPpHaTfMg705tP9/Xar3PY5oOhK0dF40NTvG1ACcZrNGRDZ+5Et5GxEb2h/CFQTs9nZtNszkh9EpmAXEcZ+sD9J9FDVmFMgHnvcQDe08mm7PwxF2dN87Hx5ljF3Ek/4D9Tv6NEF5BNYKnG7CJSr9bVchJE5Z7YKEbofI71PKJhaoncbMRNHsFd17BJB0dI/5VDNPrVGi08PzW33W3hkc0JTB17g2EDW+NV2aPfw6tAezB7cJAKLuix4m/fBB1sagZu6h9+4jexUL7+7U7iSuk0wgPAgMBAAGjggKfMIICmzATBgNVHSUEDDAKBggrBgEFBQcDATAOBgNVHQ8BAf8EBAMCA6gwEQYJYIZIAYb4QgEBBAQDAgZAMIGbBggrBgEFBQcBAQSBjjCBizBMBggrBgEFBQcwAoZAaHR0cDovL2Vwc2lnbi5ldXJvcGFybC5ldXJvcGEuZXUvY2VydC9FUFNpZ24tQXBwbGljYXRpb25zLUNBLmNydDA7BggrBgEFBQcwAYYvaHR0cDovL29jc3AuZXBzaWduLmV1cm9wYXJsLmV1cm9wYS5lL2Vwc2lnbi5lcC5wYXJsLnVuaW9uLmV1L2NybC9FUFNpZ24tU1NMLUNBLmNybDArBgNVHREEJDAigiBXZWJTU08gRmVkZXJhdGlvbiBwcmUtcHJvZHVjdGlvbjAdBgNVHQ4EFgQUcEPmGNSthUQVEp1qTJQWb7d0y6UwDQYJKoZIhvcNAQELBQADggEBAMD5y0odP/JBFWsVg9sQUw23iWRAlq/VY710go+ERB3AH4HP1LWSyjnhJzWpfvSF4zQAaDvcqyc1/9ayS+Q4CldQ34gEmclZnZO0Vbvd+8NZUxgqW/FyjzPLkpi3lEpeNp7q+K7/+snU8EWSc+6P7Ei0Mjj1LncKzK1j/ROn4B0PbHZFdoGbvtbJ9pxWtx3H0jg3eLVj8RYDs9qVJ2HmJV7rWpVIHsYT+8+41TsePSoHBp5AP/tZlwUWZFzFimbgLh8TcRvIq/F27cGlKQDYdQDOXU43qtO4IgWn1QV1bQthzojmNfTdYF1MrTFeIpCcGogbS90a6r3nFLkgFm+9r9U=')
    })
  })

  describe('supports alternate authnRequestBinding HTTP-POST', () => {
    let config

    beforeAll(() => {
      config = new MetadataReader(metadata, { authnRequestBinding: 'HTTP-POST' })
    })

    test('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/POST')
    })

    test('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/POST')
    })
  })

  describe('supports alternate authnRequestBinding HTTP-Artifact', () => {
    let config

    beforeAll(() => {
      config = new MetadataReader(metadata, { authnRequestBinding: 'HTTP-Artifact' })
    })

    test('identityProviderUrl', () => {
      assert.strictEqual(config.identityProviderUrl, 'https://adfs.server.url/adfs/ls/Artifact')
    })

    test('logoutUrl', () => {
      assert.strictEqual(config.logoutUrl, 'https://adfs.server.url/adfs/ls/Artifact')
    })
  })
})
