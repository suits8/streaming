const fs = require("fs");

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const prepareVideos = () => {
  const folderNames = fs.readdirSync(`${__dirname}/Chunks`);
  deleteFolderRecursive(`${__dirname}/PreparedVideos`);
  fs.mkdirSync(`${__dirname}/PreparedVideos`);
  folderNames.forEach((folderName) => {
    const extension = fs
      .readFileSync(`${__dirname}/Chunks/${folderName}/extension.txt`)
      .toString();
    const chunks = fs.readdirSync(`${__dirname}/Chunks/${folderName}`);
    for (let i = 0; i < chunks.length - 1; i++) {
      const data = fs.readFileSync(
        `${__dirname}/Chunks/${folderName}/${i}.txt`
      );
      fs.appendFileSync(
        `${__dirname}/PreparedVideos/${folderName}.${extension}`,
        data
      );
      fs.unlinkSync(`${__dirname}/Chunks/${folderName}/${i}.txt`);
    }
    console.log(`finished preparing ${folderName}`);
  });
  deleteFolderRecursive(`${__dirname}/Chunks`);
};
prepareVideos();

deleteFolderRecursive(`${__dirname}/.git`);