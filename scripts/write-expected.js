require('hard-rejection/register')
const globule = require('globule')
const stableStringify = require('json-stable-stringify')
const replaceExtension = require('replace-ext')
const fs = require('fs-extra')
const path = require('path')
const marshal = require('../test/lib/marshal')

const buildExpected = async (filePath, expPath, parse) => {
  const data = await fs.readFile(filePath, 'utf8')
  const parsed = parse(data)
  const marshaled = marshal(parsed)
  const stringified = stableStringify(marshaled, { space: 2 })
  await fs.writeFile(expPath, stringified, 'utf8')
  console.info('Created: ' + expPath)
}

const main = async () => {
  require('babel-register')
  const parse = require('../src/').default
  const fixturesRoot = path.resolve(__dirname, '../test/fixtures')
  const expectedRoot = path.resolve(__dirname, '../test/integration/expected')
  const fixtures = globule.find({ cwd: fixturesRoot, src: '**/*.xml' })
  await Promise.all(fixtures.map((relPath) => {
    const filePath = path.join(fixturesRoot, relPath)
    const expPath = path.join(expectedRoot, replaceExtension(relPath, '.json'))
    return buildExpected(filePath, expPath, parse)
  }))
}

main()
