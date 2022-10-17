const fetch = require('./fetch')
const MetadataReader = require('./reader')
const { toPassportConfig, claimsToCamelCase } = require('./passport')
const metadata = require('./metadata')

module.exports = {
  fetch: (config) => fetch(config).then((xml) => new MetadataReader(xml)),
  MetadataReader,
  toPassportConfig,
  claimsToCamelCase,
  metadata
}
