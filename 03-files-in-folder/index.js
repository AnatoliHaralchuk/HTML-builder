const fs = require('fs')
const path = require('path')
fs.readdir(path.join(__dirname, 'secret-folder'),
                    {
                        encoding:'utf-8',
                        withFileTypes:true
                    },
                    (err,files) => {
    if (err) throw err  
    files.forEach(file => {
        if (file.isFile()){
            fs.stat(path.join(__dirname,'secret-folder',file.name), (err, stats) => {
                if (err) throw err
            
            console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size/1000}kb`);
        })
        }
    })
})