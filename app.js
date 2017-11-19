const express = require('express');
const api = require('./router/index')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//app.set('views',path.join(__dirname,'views'))
//app.set('ng',path.join(__dirname,'ng'))
//app.engine('html', require('ejs').renderFile);
//app.use(express.static(path.join(__dirname, 'ng')))


app.use('/js',express.static(path.join(__dirname, 'js')))
app.use('/views',express.static(path.join(__dirname,"views")))
app.use('/css',express.static(path.join(__dirname,'css')))
app.use('/api', api);


app.get('*', (req, res) => { 
    res.sendfile(path.join('views','index.html'))
});


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});