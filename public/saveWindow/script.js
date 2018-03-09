//imports
const {ipcRenderer} = require('electron');
const {remote} = require('electron');
//fs and path modules are used but not imported here because they come with the userEdit.js which is imported by the saveWindow index, how nice!
var saveAs = document.getElementById('saveAs');

/* as soon as the window opens, this script reads the userData.json file to see where the last file was saved.
If this is the first time, the program assumes the directory is just Spud/Files/(filename).fileformat
Note:In the future this will probably change to Documents/SpudProjects or something like that
*/
getFavoriteDirectory((favDir) => {
  console.log(favDir);
  //checks to make sure that the lastDirectory actually exists, if it does, assume the user wants to save their again
  if(favDir != "") {
    console.log('t');
    saveAs.value = favDir;
  } else {
    //if the user has never saved a file through spud before, assume they want to use the default path of TextDitor/Files
    saveAs.value =  ('../../../TextEditor/Files/hello.txt');
  }
});

//listen carefully!
document.addEventListener('keydown', (event) => {
//when user presses 'enter', save the fileData
  if(event.keyCode === 13) {
    saveFile();
  }
//if the user press 'escape', exit this window without saving
  if(event.keyCode === 27) {
    remote.getCurrentWindow().close();
  }
});

var saveFile = () => {
  try{
    var fileName = saveAs.value;
    setFavoriteDirectory(fileName);
    ipcRenderer.send('saveRequest', fileName);
  } catch(e) {
    alert('Hmm something went wrong...');
    console.log(e);
  }
}

//LOCAL SOCKETS ----------------------------------------------------------------------------------------------------
ipcRenderer.on('doneSaving', (event) => {
  remote.getCurrentWindow()
  .close();
});
