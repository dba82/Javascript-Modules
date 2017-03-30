fs = require('fs');
os = require('os');
_ = require('lodash');

function expandPath(path){
  return path.replace(/^~/, os.homedir())
};

function subfoldersSync(path, recursive){
  var result

  path = expandPath(path)
  result = fs
    .readdirSync(path)
    .filter(x => fs.statSync(path + `/` + x).isDirectory())
    .map(x => {return {path: path + `/` + x, name: x}})

  if (!recursive) return result;
  return result.map(x => [x].concat(subfoldersSync(x.path, recursive)))
};

function filesInFoldertreeSync(arg){
  if (_.isArray(arg)){
    return arg.map(filesInFoldertreeSync)
  } else {
    return {
      dir: arg,
      files:fs.readdirSync(arg.path)
              .filter(x => fs.statSync(arg.path + `/` + x).isFile())}
              .map(x => {return {path: path + `/` + x, name: x}})
  }
};

function files(path, recursive){

}
console.log(JSON.stringify(filesInFolderTreeSync(subfoldersSync('~/Desktop', true),null,2)))
