import ExtendableError from 'es6-error'

export default class VASTParserError extends ExtendableError {
  constructor (message, code) {
    super(message)
    this.code = code
    this.name = 'VASTParserError'
  }
}
