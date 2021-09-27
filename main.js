const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs  = require('fs');
const path = require('path');

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
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})

ipcMain.on('toMain', (event, msg) => {
  console.log(msg);
});

ipcMain.on("chooseFile", (event, arg) => {
  const result = dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["png","jpg","jpeg"] }]
  });

  result.then(({canceled, filePaths, bookmarks}) => {
    const base64 = fs.readFileSync(filePaths[0]).toString('base64');
    const src = `data:image/jpg;base64,${base64}`;
    event.reply("chosenFile", src);
  });
});