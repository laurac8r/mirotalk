const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const path = require('path');

let mainWindow;
let serverProcess;

app.whenReady().then(() => {
    serverProcess = fork(path.join(__dirname, 'server.js'));
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:3000');
    }, 1000);
});

app.on('window-all-closed', ()=>{
    if (serverProcess) serverProcess.kill();
    if (process.platform !== "darwin") app.quit();
})
