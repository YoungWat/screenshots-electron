const { BrowserWindow, app } = require("electron")
const mainUtils = require("./utils/main_utils")
const utils = require("./utils/index")

app.on("ready", () => {
  const bw = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  utils.log("test.html ", mainUtils.getPathFromSrc("test.html"))
  bw.loadFile(mainUtils.getPathFromSrc("test.html"))
})
app.allowRendererProcessReuse = true