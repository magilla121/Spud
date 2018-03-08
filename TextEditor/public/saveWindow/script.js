//imports
const {ipcRenderer} = require('electron');
const {remote} = require('electron');
//fs and path modules are used but not imported here because they come with the userEdit.js which is imported by the saveWindow index, how nice!
var saveAs = document.getElementById('saveAs');

/* as soon as the window opens, read the userData.json file to see where the last file was saved.
If this is the first time, the program assumes the directory is just TextEditor/Files/(filename).format
Note:In the future this will probably change to Documents/SpudProjects or something like that
*/
getFavoriteDirectory((favDir) => {
  //checks to make sure that the lastDirectory actually exists, if it does, assume the user wants to save their again
  if(favDir != "") {
    saveAs = favDir;
  } else {
    //if the user has never saved a file through spud before, assume they want to use the default path of TextDitor/Files
    saveAs.value = path.join(__dirname, '../../../TextEditor/Files/hello.txt');
  }
});

var saveFile = () => {
  try{
    var fileName = saveAs.value;
    setFavoriteDirectory(fileName);
    //ipcRenderer.send('saveRequest', fileName);
  } catch(e) {
    alert('Hmm something went wrong...');
    console.log(e);
  }
  ipcRenderer.on('doneSaving', (event) => {
    remote.getCurrentWindow()
    .close();
  });
}
