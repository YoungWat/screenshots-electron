const path = require("path")

module.exports = {
  getPathFromRoot(str) {
    return path.resolve(__dirname, "../../", str)
  },
  getPathFromSrc(str) {
    return path.resolve(__dirname, "../", str)
  }
}