// imports
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

// static files
app.use(express.static('public'));
app.use('/assets', express.static(__dirname + 'public/assets'));
app.use('/bootstrap', express.static(__dirname + 'public/assets/bootstrap'));
app.use('/css', express.static(__dirname + 'public/assets/css'));
app.use('/fonts', express.static(__dirname + 'public/assets/fonts'));
app.use('/js', express.static(__dirname + 'public/assets/js'));
app.use('/boostrap/js', express.static(__dirname + 'public/assets/bootstrap/js'));
app.use('/boostrap/css', express.static(__dirname + 'public/assets/bootstrap/css'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index');
});

app.get('/download', (req, res) => {
    let URL = req.query.URL;
    res.header('Content-Disposition', 'attachment; filename="video.mp4');

    ytdl(URL, {
        format: 'mp4'
    }).pipe(res);
});

app.listen(process.env.PORT || port);