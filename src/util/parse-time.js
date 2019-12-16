const re = /^\s*(\d+):(\d+):(\d+(?:\.\d+)?)\s*$/

export default (str) => {
  if (typeof str !== 'string') {
    return null
  }
  const m = re.exec(str)
  if (m == null) {
    return null
  }
  return ((parseInt(m[1], 10) * 60) + parseInt(m[2], 10)) * 60 + parseFloat(m[3])
}
