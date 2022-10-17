import assert from 'assert'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import fs from 'fs'
import { describe, test, beforeEach } from '@jest/globals'
import path from 'path'

import { fetchMetadata } from './fetch'

const backupStore = new Map()

const url = '/test/data/metadata.xml'
const metadata = fs.readFileSync(path.resolve('resources', 'metadata.xml')).toString()

describe('fetchMetadata()', () => {
  const axiosMock = new MockAdapter(axios)

  beforeEach(() => {
    axiosMock.reset()
  })

  test('loads', () => {
    assert.strictEqual(typeof fetchMetadata, 'function')
  })

  test('fetches metadata XML from URL', (done) => {
    axiosMock.onGet(url).reply(200, metadata, {
      'content-length': metadata.length
    })

    fetchMetadata({ url, timeout: 2000, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        assert.ok(backupStore.has(url))
        done()
      })
      .catch(done)
  })

  test('fetches metadata XML from backupStore', (done) => {
    axiosMock.onGet(url).timeout()
    fetchMetadata({ url, timeout: 10, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        done()
      })
      .catch(done)
  })

  test('fails with short timeout and empty backupStore', (done) => {
    axiosMock.onGet(url).timeout()
    fetchMetadata({ url, timeout: 10, backupStore: new Map() })
      .then(() => {
        assert.fail('Request should not succeed')
      })
      .catch((err) => {
        assert.ok(err)
        done()
      })
  })

  test('accepts custom axios instances', (done) => {
    const client = axios.create()
    const myAxiosMock = new MockAdapter(client)
    myAxiosMock.onGet(url).reply(200, metadata, {
      'content-length': metadata.length
    })

    fetchMetadata({ client, url, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        assert.ok(backupStore.has(url))
        done()
      })
      .catch(done)
  })
})
