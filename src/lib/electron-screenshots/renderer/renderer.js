const renderer_utils = require("../../../utils/renderer_utils")

class Renderer {
  constructor(base64) {
    const $blockMaskList = document.getElementsByClassName("block-mask")

    const blockMaskArr = renderer_utils.transDomList2Arr($blockMaskList)
    this.blockMaskArr = {
      $top: blockMaskArr[0],
      $left: blockMaskArr[1],
      $center: blockMaskArr[2],
      $right: blockMaskArr[3],
      $bottom: blockMaskArr[4]
    }
    this.winInfo = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }

    this.$blockMaskOuter = document.getElementsByClassName("block-mask-outer")[0]

    this.$body = document.body
    this.$body.style.backgroundImage = `url(${base64})`
    // document.addEventListener("load", () => {
    this.setBlockMask()
    this.$body.style.opacity = 1
    this.$body.style.cursor = "unset"
    // })
  }

  setBlockMask() {
    const { $top, $left, $center, $right, $bottom } = this.blockMaskArr
    const { getStyle } = renderer_utils
    const centerInfo = {
      width: getStyle($center, "width"),
      height: getStyle($center, "height"),
      top: getStyle($center, "top"),
      left: getStyle($center, "left"),
    }
    centerInfo.right = this.winInfo.width - centerInfo.left - centerInfo.width
    centerInfo.bottom = this.winInfo.height - centerInfo.top - centerInfo.height


    $top.style.height = centerInfo.top

    $left.style.top = centerInfo.top
    $left.style.height = centerInfo.height
    $left.style.width = centerInfo.left

    $right.style.top = centerInfo.top
    $right.style.height = centerInfo.height
    $right.style.width = centerInfo.right
    
    $bottom.style.height = centerInfo.bottom

    this.$blockMaskOuter.classList.remove("hide")
  }
}

module.exports = Renderer