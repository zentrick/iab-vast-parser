import globule from 'globule'
import path from 'path'
import fsp from 'fs-promise'
import marshal from '../lib/marshal'
import parse from '../../src/'

const strictFixturesRoot = path.resolve(__dirname, '../fixtures/strict')
const strictExpectedRoot = path.resolve(__dirname, 'expected/strict')
const looseFixturesRoot = path.resolve(__dirname, '../fixtures/loose')
const looseExpectedRoot = path.resolve(__dirname, 'expected/loose')

const describeTree = (node, expectedRoot, fixturesRoot, strict) => {
  for (const item of Object.keys(node)) {
    if (typeof node[item] === 'string') {
      const expPath = path.join(expectedRoot, node[item])
      const fixtPath = path.join(fixturesRoot, node[item].replace(/\.json$/, '.xml'))
      it(item, async () => {
        const fixture = await fsp.readFile(fixtPath, 'utf8')
        const expected = JSON.parse(await fsp.readFile(expPath, 'utf8'))
        const actual = marshal(parse(fixture, {strict: strict}))
        expect(actual).to.eql(expected)
        /* // Code to write the expected result to a file
        try {
          expect(actual).to.eql(expected)
        } catch (err) {
          await fsp.writeFile(expPath + '.ref.json', JSON.stringify(actual), 'utf8')
          throw err
        }
        */
        if (!strict) {
          expect(() => parse(fixture, {strict: true})).to.throw(Error)
        }
      })
    } else {
      describe(item, () => {
        describeTree(node[item], expectedRoot, fixturesRoot, strict)
      })
    }
  }
}

const createTree = dir => {
  const root = Object.create(null)
  for (const expFile of globule.find({cwd: dir, src: '**/*.json'})) {
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
  return root
}

describeTree(createTree(strictExpectedRoot), strictExpectedRoot, strictFixturesRoot, true)
describeTree(createTree(looseExpectedRoot), looseExpectedRoot, looseFixturesRoot, false)
