import Debug from 'debug'

const debug = new Debug('passport-saml-metadata')

function claimsToCamelCase (claims, claimSchema) {
  const obj = {}

  for (const [key, value] of Object.entries(claims)) {
    try {
      obj[claimSchema[key].camelCase] = value
    } catch (e) {
      debug(`Error while translating claim ${key}`, e)
    }
  }

  return obj
}

export default claimsToCamelCase
