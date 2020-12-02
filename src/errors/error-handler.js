import Errors from './error-codes'
import VASTParserError from './vast-parser-error'
export default class ErrorHandler {
  constructor (strict) {
    this._strictMode = strict
  }

  failWithErrorCode (error, errorCode) {
    if (error instanceof VASTParserError) {
      throw error
    }
    throw new VASTParserError(error instanceof Error ? error.message : error, errorCode)
  }

  fail (error) {
    this.failWithErrorCode(error, Errors.VAST_SCHEMA_VALIDATION_ERROR)
  }

  tryRecover (error) {
    if (this._strictMode) {
      this.fail(error)
    }
  }
}
