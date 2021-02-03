const fs = require("fs");

exports.deleteImages = (files) => {
  for (const file of files) {
    const path = `public/${file}`;
    fs.unlinkSync(path);
  }
};
