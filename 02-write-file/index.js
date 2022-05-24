const fs = require('fs')
const path = require('path')
const event = require('events')

fs.writeFile(path.join(__dirname,'destination.txt'),'', err => {
    if (err) {stdout.write('Error', err)}
})
const {stdin, stdout, stderr} = process
const readline = require('readline')
const rLine = readline.createInterface({
    input: stdin,
    output: stdout
})
stdout.write('Enter your text: anythink!!!\n')
stdin.on('data', data => {
    const text = data.toString()
    fs.appendFile(path.join(__dirname,'destination.txt'),text, err => {
        if (err) {stdout.write('Error', err)}
    })
})
rLine.on('line', (input) => {
    if (input === 'exit') process.exit()
})
process.on('exit',() => stdout.write('good luck to learn node JS\n'))