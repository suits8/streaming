const fs = require("fs");
const { exec } = require("child_process");

const folders = fs.readdirSync(`${__dirname}/Chunks`);

const uploadFile = (folderIndex, index) => {
  if (folderIndex == folders.length) return;
  const folder = folders[folderIndex];
  if (index == 0) {
    console.log(`Uploading ${folder}`);
  }
  if (fs.existsSync(`${__dirname}/Chunks/${folder}/${index}.txt`)) {
    exec(
      `cd ${__dirname}/Chunks/${folder} && git add ${index}.txt && git commit -m "added ${folder}/${index}.txt" && git push`,
      (error, stdout, stderr) => {
        uploadFile(folderIndex,index+1);
      }
    );
  } else {
    exec(
        `cd ${__dirname}/Chunks/${folder} && git add extension.txt && git commit -m "added ${folder}/extension.txt" && git push`,
        (error, stdout, stderr) => {
            console.log(`Finished uploading ${folder}`);
          uploadFile(folderIndex+1,0);
        }
      );
  }
};

uploadFile(0,0);
