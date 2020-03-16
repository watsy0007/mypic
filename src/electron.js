const {app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')


let mainWindow

let watcher;
let mode = process.env.NODE_ENV

if (mode && mode.trim() === 'development') {
    watcher = require('chokidar').watch(path.join(__dirname, '../public/build'), {ignoreInitial: true});
    watcher.on('change', () => {
        mainWindow.reload();
    });
}

let createWindow = () => {
    console.log("what????")
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
    })

    mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`)
    mainWindow.on('closed', () => {
        mainWindow = null
        if (watcher) {
            watcher.close();
        }
    })
}


app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow()
    }
})