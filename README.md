# iab-vast-parser

[![npm](https://img.shields.io/npm/v/iab-vast-parser.svg)](https://www.npmjs.com/package/iab-vast-parser) [![Dependencies](https://img.shields.io/david/zentrick/iab-vast-parser.svg)](https://david-dm.org/zentrick/iab-vast-parser) [![Build Status](https://img.shields.io/circleci/project/github/zentrick/iab-vast-parser/master.svg)](https://circleci.com/gh/zentrick/iab-vast-parser) [![Coverage Status](https://img.shields.io/coveralls/zentrick/iab-vast-parser/master.svg)](https://coveralls.io/r/zentrick/iab-vast-parser) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Parses IAB VAST tags into
[iab-vast-model](https://www.npmjs.com/package/iab-vast-model) objects.

## Usage

```js
import parseVAST from 'iab-vast-parser'

const xmlStr = '<VAST version="3.0">...</VAST>'
const vast = parseVAST(xmlStr)
// ... Do your thing ...
```

## API

```js
parseVAST(xml[, options])
```

The parameter `xml` can be either an XML string, or a parsed VAST DOM `Document`
or `Element`.

Currently, one `option` is supported: you can pass in a `DOMParser` instance
via the `domParser` key. If you don't do so, a new `DOMParser` will be created
on the fly.

## Maintainers

- [Tim De Pauw](https://github.com/timdp)
- [Christophe Bonello](https://github.com/cbonello)

## License

MIT
