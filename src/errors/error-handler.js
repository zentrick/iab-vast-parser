import VASTParserError from './vast-parser-error'

export default class ErrorHandler {
  constructor (strict) {
    this._strictMode = strict
  }

  fail (error, errorCode = 101) {
    if (error instanceof VASTParserError) {
      throw error
    }
    throw new VASTParserError(error instanceof Error ? error.message : error, errorCode)
  }

  tryRecover (error, errorCode = 101) {
    if (this._strictMode) {
      this.fail(error, errorCode)
    }
  }
}
