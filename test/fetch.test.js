const assert = require('assert')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const fs = require('fs')
const path = require('path')

const fetch = require('../src/fetch')

const backupStore = new Map()

const url = '/test/data/metadata.xml'
const metadata = fs.readFileSync(path.join(__dirname, 'data', 'metadata.xml')).toString()

describe('fetch()', () => {
  const axiosMock = new MockAdapter(axios)

  beforeEach(() => {
    axiosMock.reset()
  })

  it('loads', () => {
    assert.strictEqual(typeof fetch, 'function')
  })

  it('fetches metadata XML from URL', (done) => {
    axiosMock.onGet(url).reply(200, metadata, {
      'content-length': metadata.length
    })

    fetch({ url, timeout: 2000, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        assert.ok(backupStore.has(url))
        done()
      })
      .catch(done)
  })

  it('fetches metadata XML from backupStore', (done) => {
    axiosMock.onGet(url).timeout()
    fetch({ url, timeout: 10, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        done()
      })
      .catch(done)
  })

  it('fails with short timeout and empty backupStore', (done) => {
    axiosMock.onGet(url).timeout()
    fetch({ url, timeout: 10, backupStore: new Map() })
      .then(() => {
        assert.fail('Request should not succeed')
      })
      .catch((err) => {
        assert.ok(err)
        done()
      })
  })

  it('accepts custom axios instances', (done) => {
    const client = axios.create()
    const myAxiosMock = new MockAdapter(client)
    myAxiosMock.onGet(url).reply(200, metadata, {
      'content-length': metadata.length
    })

    fetch({ client, url, backupStore })
      .then((xml) => {
        assert.strictEqual(xml, metadata)
        assert.ok(backupStore.has(url))
        done()
      })
      .catch(done)
  })
})
