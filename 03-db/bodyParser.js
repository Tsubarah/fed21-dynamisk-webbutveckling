const express = require('express');
const app = express();

app.use(express.static('static'));

// app.get(URL, callback)
app.get('/bodyParser', function(req, res) {
    console.log('GET /bodyParser');
    res.send('OK');
})

app.listen(3000, function(){
    console.log('Server started at http://localhost:3000');
});