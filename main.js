const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs  = require('fs');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    win.maximize();
    win.setMenuBarVisibility(false);
    win.loadFile('template/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})

ipcMain.on("chooseFile", (event, arg) => {
  const result = dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["png","jpg","jpeg"] }]
  });

  result.then(({canceled, filePaths, bookmarks}) => {
    if(filePaths[0]){
      const base64 = fs.readFileSync(filePaths[0]).toString('base64');
      const src = `data:image/jpg;base64,${base64}`;
      event.reply("chosenFile", src);
    }
  });
});