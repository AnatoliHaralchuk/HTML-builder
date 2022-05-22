const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  files.forEach(el => {
    if (el.isFile() && path.extname(el.name) === '.css') {
      const readStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
      readStream.pipe(writeStream);
    }
  });
});