//exports
module.exports = {
  getFavoriteDirectory,
  setFavoriteDirectory,
  setLastProject,
  getLastProject
}

//imports
const fs = require('fs');
const path = require('path');

//FUNCTION --------------------------------------------------------------------------------
//reads out the last directory a user saved a file in from the user .json file
//note: this function is async be careful with that :)
function getFavoriteDirectory(callback) {
  var favoriteDirectory;
  var userData = path.join(__dirname, '../../Spud/user/userData.json');
  fs.readFile(userData, (err, fileData) => {
    var user = JSON.parse(fileData);
    favoriteDirectory = user.lastSaveDirectory.toString();
    callback(favoriteDirectory);
  });
}

//stores the last directory the user saved a file in inside of a .json file
function setFavoriteDirectory(directory) {
  var pathToUserData = path.join(__dirname, '../../Spud/user/userData.json');
  fs.readFile(pathToUserData, (err, fileData) => {
    var userData = JSON.parse(fileData);
    userData.lastSaveDirectory = directory;
    fs.writeFileSync(pathToUserData, JSON.stringify(userData));
  });
}

function setLastProject(project) {
  console.log(project);
  var userData = fs.readFileSync(path.join(__dirname, '../../Spud/user/userData.json'));
  user = JSON.parse(userData);
  user.lastProject = project;
  fs.writeFileSync(path.join(__dirname, '../../Spud/user/userData.json'), JSON.stringify(user));
}

function getLastProject() {
  var lastProject;
  var userData = fs.readFileSync(path.join(__dirname, '../../Spud/user/userData.json'));
  var user = JSON.parse(userData);
  lastProject = user.lastProject.toString();
  var lastProjectData = fs.readFileSync(lastProject);
  return lastProjectData;
}
