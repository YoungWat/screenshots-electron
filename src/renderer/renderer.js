const renderer_utils = require("../utils/renderer_utils")

class Renderer {
  constructor() {
    const $blockMaskOuter = document.getElementsByClassName("block-mask-outer")[0]
    const $blockMaskList = document.getElementsByClassName("block-mask")

    const blockMaskArr = renderer_utils.transDomList2Arr($blockMaskList)
    this.blockMaskArr = {
      $top: blockMaskArr[0],
      $left: blockMaskArr[1],
      $center: blockMaskArr[2],
      $right: blockMaskArr[3],
      $bottom: blockMaskArr[4]
    }
  }

  setBlockMask() {
    const { $top, $left, $center, $right, $bottom } = this.blockMaskArr
    const { getStyle } = renderer_utils
    const centerInfo = {
      width: getStyle($center, "width"),
      height: getStyle($center, "height"),
      top: getStyle($center, "top"),
      bottom: getStyle($center, "bottom"),
      left: getStyle($center, "left"),
      right: getStyle($center, "right")
    }

    $top.style.height = centerInfo.top

    $left.style.top = centerInfo.top
    $left.style.height = centerInfo.height
    $left.style.width = centerInfo.left

    $right.style.top = centerInfo.top
    $right.style.height = centerInfo.height
    $right.style.width = centerInfo.right

    $bottom.style.height = centerInfo.bottom
  }
}

module.exports = Renderer