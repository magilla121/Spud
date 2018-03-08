//imports
const fs = require('fs');
const path = require('path');

//FUNCTION --------------------------------------------------------------------------------
//reads out the last directory a user saved a file in from the user .json file
//note: this function is async be careful with that :)
var getFavoriteDirectory = (callback) => {
  var favoriteDirectory;
  var pathToUserData = path.join(__dirname, '../../../TextEditor/user/userData.json');
  fs.readFile(pathToUserData, (err, fileData) => {
    var userData = JSON.parse(fileData);
    favoriteDirectory = String(userData.lastSaveDirectory);
    callback(favoriteDirectory);
  });
}

//stores the last directory the user saved a file in inside of a .json file
var setFavoriteDirectory = (directory) => {
  var pathToUserData = path.join(__dirname, '../../../TextEditor/user/userData.json');
  fs.readFile(pathToUserData, (err, fileData) => {
    var userData = JSON.parse(fileData);
    userData.lastSaveDirectory = directory;
    console.log(userData);
    console.log(JSON.stringify(userData));
    fs.writeFileSync(pathToUserData, JSON.stringify(userData));
  });
}
