const fs = require('fs');
const url = require('url');
const {remote} = require('electron');
const {BrowserWindow} = remote;
const {ipcRenderer} = require('electron');
const mf = require('../menuFunctions');
var controlDown = false;
var project = document.getElementById('project');

document.addEventListener('keydown', (event) => {
  //check for 'ctrl' down
  if(event.keyCode === 17) {
    controlDown = true;
  }
  //check for 's' down
  if(event.keyCode === 83) {
    if(controlDown) {
      mf.saveAs(BrowserWindow);
    }
  }
});

document.addEventListener('keyup', (event) => {
  if(event.keyCode === 17) {
    controlDown = false;
  }
});

ipcRenderer.on('save', (event, fileName) => {
  console.log('message received');
  fs.writeFileSync(fileName, project.value);
});
