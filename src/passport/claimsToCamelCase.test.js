import assert from 'assert'
import { test } from '@jest/globals'
import claimsToCamelCase from './claimsToCamelCase'
import claimSchema from '../../resources/claim-schema.json'

test('claimsToCamelCase()', () => {
  const reader = {
    identityProviderUrl: 'a',
    logoutUrl: 'b',
    signingCerts: ['c', 'c2'],
    identifierFormat: 'd',
    claimSchema
  }

  const claims = {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': 'some-user@some-company.com'
  }

  assert.deepStrictEqual(claimsToCamelCase(claims, reader.claimSchema), {
    upn: 'some-user@some-company.com'
  })
})
