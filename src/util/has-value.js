import isNonEmptyString from './is-non-empty-string'

export default (item) => (item != null && isNonEmptyString(item._value))
