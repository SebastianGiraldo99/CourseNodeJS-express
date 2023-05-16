const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('This is my first server in node');
});

app.listen(port, () =>{
    console.log('This is the port of my app: ' + port);
});
