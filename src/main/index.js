const { BrowserWindow, app, screen } = require("electron")
const utils = require("../utils/index.js")
const { isWin } = require("../common/index.js")

class Main {
  constructor() {
    this.displays = screen.getAllDisplays()
    this.createWindows()
  }

  createWindows() {
    this.displays.forEach((display) => {
      const win = new BrowserWindow({
        fullscreen: isWin,
        width: display.bounds.width,
        height: display.bounds.height,
        x: display.bounds.x,
        y: display.bounds.y,
        frame: false,
        enableLargerThanScreen: true,
        hasShadow: false,
        movable: false,
        resizable: false,
        transparent:true,
        webPreferences: {
          nodeIntegration: true
        }
      })

      // debug
      win.setAlwaysOnTop(true, "screen-saver")

      win.loadURL(`file://${utils.getPathFromSrc("renderer/index.html")}`)
      // win.webContents.openDevTools({
      //   mode: "detach"
      // })
    })
  }
}


app.on("ready", () => {
  new Main()
})

