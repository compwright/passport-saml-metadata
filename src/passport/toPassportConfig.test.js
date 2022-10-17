import assert from 'assert'
import { describe, test } from '@jest/globals'
import toPassportConfig from './toPassportConfig'
import claimSchema from '../../resources/claim-schema.json'

describe('passport helpers', () => {
  const reader = {
    identityProviderUrl: 'a',
    logoutUrl: 'b',
    signingCerts: ['c', 'c2'],
    identifierFormat: 'd',
    claimSchema
  }

  test('toPassportConfig()', () => {
    assert.deepStrictEqual(toPassportConfig(reader), {
      entryPoint: 'a',
      identityProviderUrl: 'a',
      logoutUrl: 'b',
      cert: 'c2',
      identifierFormat: 'd'
    })
  })

  test('toPassportConfig() with multiple cert support', () => {
    assert.deepStrictEqual(toPassportConfig(reader, { multipleCerts: true }), {
      entryPoint: 'a',
      identityProviderUrl: 'a',
      logoutUrl: 'b',
      cert: ['c', 'c2'],
      identifierFormat: 'd'
    })
  })
})
