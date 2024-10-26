const express = require('express');

const port = process.env.PORT || 1337;
const app = express();

// middleware functions
app.use(express.json);

const reqFilter = (req, res, next) => {
    console.log('reqFilter');
    next();
}

app.use(reqFilter);

app.get('/', (req, res) => {
    res.end("Middleware functions in express");
});
app.get('/home', (req, res) => {
    res.json({
        moduleName: 'Middleware in Express',
        lessons: 'Using basic middleware functions in express'
    })
})
app.get('/echo', (req, res) => {
    const { input = ''} = req.query;

    res.json({
        normal:input,
        shouty: input.toUpperCase(),
        characterCount: input.length
    })
})

app.listen(port, () => console.log(`Server listening on ${port}`));