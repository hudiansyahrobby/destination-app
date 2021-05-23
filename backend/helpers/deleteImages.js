const fs = require("fs");

exports.deleteImages = (files) => {
  for (const file of files) {
    console.log("FILE : ", file);
    const path = `public/${file}`;
    fs.unlinkSync(path);
  }
};
