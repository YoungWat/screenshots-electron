const { BrowserWindow, app, screen } = require("electron")
const mainUtils = require("../../../utils/main_utils")
const utils = require("../../../utils/index")
const { isWin } = require("../../../common/index")

class Main {
  constructor() {
    this.windowList = []
    this.displays = screen.getAllDisplays()
    this.createWindows()
  }

  createWindows() {
    this.displays.forEach((display) => {
      const win = new BrowserWindow({
        fullscreen: isWin,
        // width: 800,
        // height: 600,
        width: display.bounds.width,
        height: display.bounds.height,
        x: display.bounds.x,
        y: display.bounds.y,
        frame: false,
        show: false,
        enableLargerThanScreen: true,
        hasShadow: false,
        movable: false,
        resizable: false,
        transparent: true,
        webPreferences: {
          nodeIntegration: true
        }
      })
      this.windowList.push(win)

      // debug
      win.setAlwaysOnTop(true, "screen-saver")

      win.loadFile(mainUtils.getPathFromSrc("lib/electron-screenshots/renderer/index.html"))
      win.webContents.openDevTools({
        mode: "detach"
      })
    })
  }
}

let callback = null, main = null

module.exports = {
  register: (cb) => {
    main = new Main()
    utils.log("register cb", cb)
    callback = cb
  },
  capture: () => {
    utils.log("capture done")
    main.windowList.forEach((win) => {
      // console.log("win.webContents ",win.webContents)
      // const execJs = `console.log(require("./desktop-capture"))`
      const execJs = `require("./index").call()`
      win.webContents.executeJavaScript(execJs).then(()=>{
        win.show()
      })
      
      // win.webContents.executeJavaScript(`require("./desktop-capture").capture(${callback})`)
    })
    callback && callback("test_base64_test")
  }
}

