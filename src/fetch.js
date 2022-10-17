import assert from 'assert'
import axios from 'axios'
import Debug from 'debug'

import { MetadataReader } from './MetadataReader'

const debug = new Debug('passport-saml-metadata')

const defaults = {
  client: axios,
  responseType: 'text',
  timeout: 2000,
  backupStore: new Map()
}

export async function fetchMetadata (config = {}) {
  const {
    client,
    url,
    backupStore,
    ...params
  } = Object.assign({}, defaults, config)

  assert.ok(url, 'url is required')
  assert.ok(backupStore, 'backupStore is required')
  assert.equal(typeof backupStore.get, 'function', 'backupStore must have a get(key) function')
  assert.equal(typeof backupStore.set, 'function', 'backupStore must have a set(key, value) function')

  debug('Loading metadata', url, params.timeout, backupStore)

  try {
    const res = await client.get(url, params)
    debug('Metadata loaded', res.headers['content-length'])
    backupStore.set(url, res.data) // Save in backup store
    return res.data
  } catch (err) {
    let error
    if (err.response) {
      error = new Error(err.response.data)
      error.status = err.response.status
    } else if (err.request) {
      error = new Error('Error during request, no response')
    } else {
      error = err
    }

    debug('Metadata request failed, attempting backup store', error)

    try {
      // Try from backup store
      const data = await Promise.resolve(backupStore.get(url))
      if (data) {
        debug('Metadata loaded from backupStore', data.length)
        return data
      } else {
        debug('Backup store was empty')
        throw error
      }
    } catch (err) {
      debug('Backup store request error', err)
      throw error
    }
  }
}

export default (config) => fetchMetadata(config)
  .then((xml) => new MetadataReader(xml))
