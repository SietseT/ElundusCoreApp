const { app, BrowserWindow, Menu, session } = require('electron');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const shell = require('electron').shell;
const { autoUpdater } = require("electron-updater");
const path = require('path');

require('./server/index.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 700,
        show: false,
    });

    mainWindow.setResizable(false);

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Deprecated, but didn't find a better way how to force links to open in default browser
    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
}

// Menu
const isMac = process.platform === 'darwin'
const template = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Report issue',
                click() {
                    shell.openExternal('https://github.com/SietseTrommelen/ElundusCoreApp')
                }
            },
            {
                label: 'Version ' + app.getVersion(),
                enabled: false
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('ready', createWindow);

// Auto updater
if (!isDev) {
    app.on('ready', function () {
        autoUpdater.checkForUpdatesAndNotify();
    });
}


// CSP
app.on('ready', setCspHeaders);

function setCspHeaders() {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ['default-src \'self\'; script-src \'self\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\' https://cdn.jsdelivr.net; img-src \'self\' data:; connect-src \'self\' data: http://localhost:5000 https://cdn.plyr.io https://polly.streamlabs.com; media-src https://polly.streamlabs.com;']
            }
        })
    })
}