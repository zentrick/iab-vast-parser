import globule from 'globule'
import path from 'path'
import fsp from 'fs-promise'
import marshal from '../lib/marshal'
import parse from '../../src/'

const fixturesRoot = path.resolve(__dirname, '../fixtures')
const expectedRoot = path.resolve(__dirname, 'expected')

const describeTree = (node) => {
  for (const item of Object.keys(node)) {
    if (typeof node[item] === 'string') {
      const expPath = path.join(expectedRoot, node[item])
      const fixtPath = path.join(fixturesRoot, node[item].replace(/\.json$/, '.xml'))
      it(item, async () => {
        const fixture = await fsp.readFile(fixtPath, 'utf8')
        const expected = JSON.parse(await fsp.readFile(expPath, 'utf8'))
        const actual = marshal(parse(fixture))
        expect(actual).to.eql(expected)
      })
    } else {
      describe(item, () => {
        describeTree(node[item])
      })
    }
  }
}

const root = Object.create(null)
for (const expFile of globule.find({cwd: expectedRoot, src: '**/*.json'})) {
  const dirs = expFile.split('/')
  const file = dirs.pop()
  const id = path.basename(file, '.json')
  let node = root
  for (const dir of dirs) {
    node[dir] = node[dir] || Object.create(null)
    node = node[dir]
  }
  node[id] = expFile
}
describeTree(root)
