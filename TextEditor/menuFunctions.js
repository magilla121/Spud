module.exports = {
  saveAs: saveAs
}

const {BrowserWindow} = require('electron');
const url = require('url');

let saveWindow;

function saveAs(BW) {
  // Create the save browser window.
  saveWindow = new BW({width: 700, height: 400});
  //saveWindow.setMenu(null);
  saveWindow.loadURL(url.format({
    pathname: (__dirname + './public/saveWindow/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  saveWindow.on('closed', function () {
    saveWindow = null;
  });

}
