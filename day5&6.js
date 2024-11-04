/* Goal: 
* Use timers in Node.js to execute functions after a delay or repeatedly
*
*Tasks: 
*    Executes a function after a delay using setTimeout()
* Executes a function repeatedly with a delay between each call using setInterval()
*    Stop a timeout and interval from running using clearTimeout() and clearInterval()

*/

setTimeout(() => {
    console.log("Delay in one second ...");
}, 1000)

setInterval(() => {
    console.log("Delay in one second ...");
}, 1000)

const idTimeout = setTimeout(() => {
    console.log("Delay in one second ...");
})
clearTimeout(idTimeout);

const idInterval = setInterval(() => {
    console.log("Delay in one second ...");
})
clearInterval(idInterval);

/* Day 6 - File System Module Basics

* Node.js provides a built-in module, fs (File System), to interact with the file system. Explore how to read, write, and manage files and directories.


* Tasks:

*     Read and write text files using both synchronous and asynchronous methods
*     Append data to files
*     Handle common file errors
*     Create and read directories, and explore directory manipulation functions

*/

//Asynchronous reading

const fs = require('node:fs')

fs.readFile('hello.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
})

//Asynchronous writing

const content = "Some content"
fs.writeFile('hello.txt', content, err => {
    if (err) {
        console.error(err)
        return
    } else {
        console.log('File written successfully')
    }
})

//Synchronous reading

try {
    const data = fs.readFileSync('hello.txt')
    console.log(data);
} catch (err) { 
    console.error(err)
}
// By default it overwrites
// Synchronous wrting
try {
    fs.writeFileSync('hello.txt', content);
    console.log('file written successfully')
} catch (err) {
    console.error(err)
}

// Append data to files
// Asyn appending

const message = "Message to be appended";
fs.appendFile('hello.txt', message + '\n\n', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.error('Message appended successfully.');
    }
})

// Sync appending

try {
    const newMessage = fs.appendFileSync('hello.txt', messege + '\n\n')
    console.log(newMessage);
} catch (err) {
    console.error(err)
}

// Create and read directories, and explore directory manipulation functions

const folderName = '100daysOfNodejs/tests'

try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
} catch (err) {
    console.error(err)
}

const foldername = '100daysOfNodejs/tests'

// fs.readdirSync(foldername);

fs.readdirSync(foldername).map(filename => {
    return path.join(foldername, filename);
})


