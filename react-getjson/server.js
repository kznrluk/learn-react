const express   = require('express');
const fs        = require('fs');
const app       = express();

// Staticページの有効化
app.use(express.static('static'));

app.use('/api/json/:id', (req, res) => {
    console.log('API GET : RESULT ' + req.params.id);
    try{
        file = fs.readFileSync('./jsonfiles/'+req.params.id);
        res.send(JSON.parse(file));
    } catch(err) {
        res.send({result : 'FIle not found'});
    }
});

app.use('/api/ping', (req, res) => {
    res.send('pong');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});