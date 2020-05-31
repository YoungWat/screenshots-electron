const { desktopCapturer } = require("electron")
const config = require("../../../config")

const clientInfo = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}
module.exports = {
  capture(cb) {
    console.log("capture in")
    // todo write in config
    const rate = config.desktopCaptureScaleRate
    desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
      const source = sources[0]
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: source.id,
            minWidth: screen.width * rate,
            maxWidth: screen.width * rate,
            minHeight: screen.height * rate,
            maxHeight: screen.height * rate
          }
        }
      }).then((stream) => {
        this.handleStream(stream,cb)
      }).catch((e) => { console.log("e ", e) })
    }).catch((e) => {
      console.log("desktop capture error ", e)
    })
  },
  handleStream(stream, cb) {
    const $video = document.getElementById("video")
    $video.srcObject = stream
    const width = clientInfo.width
    const height = clientInfo.height

    $video.addEventListener("loadeddata", () => {
      $video.play()
      $video.pause()
      const $canvas = document.getElementById("canvas")
      $canvas.width = width
      $canvas.height = height
      $canvas.getContext("2d").drawImage($video, 0, 0, width, height)
      const base64 = $canvas.toDataURL("image/png")
      cb && cb(base64)

      $video.remove()
      $canvas.remove()
    })

    document.body.appendChild($video)
    // console.log("stream ",stream)
  }
}