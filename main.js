const { app, BrowserWindow, ipcMain } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('path')
const { contextIsolated } = require('process')
const ipc = ipcMain;

// frame false removes the generic frame (hides the close,minimse options aswell)
// if contextIsolation is not set to false you can get pass data through IPC
        // not contextIsolated   <<-- watch out
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 680,
      minWidth: 940,
      minHeight: 600,
      frame: false,  
      webPreferences: {
            nodeIntegration:true,
            contextIsolation: false,     
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('src/index.html')
    // you can set default background color
    win.setBackgroundColor('#343b48')


    

    //minimize app
    ipc.on('minimizeApp', ()=>{
        console.log('clicked on minimize btn')
        win.minimize();
    })

    //maximize app
    ipc.on('maximizeRestoreApp', ()=>{
        console.log('clicked on maximize restore btn')
        //check status of the window
        if(win.isMaximized()){
            console.log('--setting restore');
            win.restore();
        }else{
            console.log('--setting maximize');
            win.maximize();
        }
        win.maximize;
    })

    //close app
    ipc.on('closeApp', ()=>{
        console.log('clicked on close btn')
        win.close();
    })



    //win.on is used to check events triggers
    win.on('maximize', ()=>{
        win.webContents.send('isMaximized')   //send an event to the ui
    })

    win.on('restore', ()=>{
        win.webContents.send('isRestored')
    })

}


//once app has initalized create browser window
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

