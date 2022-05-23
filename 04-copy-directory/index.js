const fs = require('fs')
const path = require('path')
const {stdout, stderr} = process

fs.rmdir(path.join(__dirname, 'files-copy'), {recursive:true},()=> {
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}, () => {
        fs.readdir(path.join(__dirname, 'files'),{withFileTypes:true}, (err, files) => {
                if (err) {console.log('Error!!!');process.exit()}
                files.forEach(file => {
                    if (file.isFile()){
                        fs.copyFile(path.join(__dirname, 'files', file.name),path.join(__dirname, 'files-copy', file.name), (err) => {
                            if (err) {console.log('Error!!!');process.exit()}
                        })
                    }})
        })
    })
})