const fs = require('fs')
const path = require('path')


fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true},()=>{})
fs.mkdir(path.join(__dirname, 'project-dist', 'index.html'), {recursive:true},()=>{})
let copyHtml = ""
const readStream = fs.createReadStream(path.join(__dirname,'template.html'),'utf-8',(err)=>{
    if (err) {console.log("Error copy file")}
})
readStream.on('data', chunk => {
    copyHtml = chunk
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (error, files) => {
        files.forEach(file => {
           let piece =  path.parse(file.name).name
           fs.readFile(path.join(__dirname, 'components', `${piece}.html`), 'utf-8', (err, data)=>{
                if (err) {console.log("Error not this file")}
                else {
                    copyHtml = copyHtml.replace(`{{${piece}}}`,data);
                    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
                    copyHtml,(err) => {if (err) console.log("ошибка записи")})
                }
            })
        });
    })
})
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
      files.forEach(file => {
            if (file.isFile() && path.extname(file.name) === '.css') {
                  const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                  readStream.pipe(writeStream);
            }
      });
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive:true}, () => {})    
const copyAssets = (into, outto) => fs.readdir(path.join(__dirname, into),{withFileTypes:true}, (err, files) => {
                if (err) {console.log('Error!!!');process.exit()}
                files.forEach(file => {
                    if (file.isFile()){
                        fs.copyFile(path.join(__dirname, into, file.name),path.join(__dirname, outto, file.name), (err) => {
                            if (err) {console.log('Error!!!');process.exit()}
                        })
                    } else {
                        fs.mkdir(path.join(__dirname, outto, file.name),() => {})
                        copyAssets(`${into}/${file.name}`, `${outto}/${file.name}`)
                    }
                })
        })
copyAssets('assets','project-dist/assets')   
