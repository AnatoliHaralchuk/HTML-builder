const fs = require('fs');
const path = require('path');
const wr = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));


fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
      files.forEach(file => {
            if (file.isFile() && path.extname(file.name) === '.css') {
                  const rs = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                  rs.pipe(wr);
            }
      });
});