const Renderer = require("./renderer")
const desktopCapture = require("./desktop-capture")
const fs = require("fs")
const { getPathFromRoot } = require("../../../utils/main_utils")

module.exports = {
  call: () => {
    desktopCapture.capture((base64) => {
      console.log("base64 ", base64)
      fs.writeFileSync(getPathFromRoot("dist/base64.txt"), base64)
      const renderer = new Renderer(base64)
      renderer.setBlockMask()
    })
  }
}
