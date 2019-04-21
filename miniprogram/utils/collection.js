const chunk = function (arr, size) {
  const ret = []
  for (let i in arr) {
    let pos = Math.floor(i / size)
    ret[pos] = ret[pos] || []
    ret[pos].push(arr[i])
  }
  return ret
}

export { chunk }