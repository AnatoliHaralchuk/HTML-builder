const fs = require('fs')
const path = require('path')
const {stdin, stdout, stderr} = process

fs.mkdir(path.join(__dirname, ' project-dist'), {recursive:true},()=>{})
let copyHtml = fs.createReadStream(path.join(__dirname,'template'),'utf-8',(err)=>{
    if (err) {console.log();}
})