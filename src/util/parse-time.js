const re = /^\s*(\d+):(\d+):(\d+(?:\.\d+)?)\s*$/

export default (str) => {
  const m = re.exec(str)
  if (m == null) {
    throw new Error(`Failed to parse time "${str}"`)
  }
  return ((parseInt(m[1], 10) * 60) + parseInt(m[2], 10)) * 60 + parseFloat(m[3])
}
