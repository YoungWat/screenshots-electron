module.exports = {
  transDomList2Arr($domList) {
    return [].slice.call($domList)
  },
  getStyle($dom, attr) {
    const res = getComputedStyle($dom)[attr]
    return ((intRes) => {
      return isNaN(intRes) ? res : intRes
    })(parseInt(res))
  }
}