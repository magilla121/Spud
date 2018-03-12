const fs = require('fs');
const url = require('url');
const {remote} = require('electron');
const {BrowserWindow} = remote;
const {ipcRenderer} = require('electron');
const mf = require('../menuFunctions');
const userData = require('../user/userEdit');
var controlDown = false;
var project = document.getElementById('project');

try {
  var lastProject = userData.getLastProject();
  project.innerHTML = lastProject;
  document.getElementById('title').innerHTML = `Spud - ${lastProject}`;
} catch(e) {

}

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
