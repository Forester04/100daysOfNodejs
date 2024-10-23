const fs = require('fs');

const content = "Content to be logged"

const filename = `${__dirname}/chat-log.txt`

fs.appendFile(filename, content + '\n\n', (err) => {
    if (err) {
        console.log('Logging failed');
    } else {
        console.log('Logged Successfully');
    }
})