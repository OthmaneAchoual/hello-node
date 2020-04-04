const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');

const app = express();
const upload = multer();

const home = require('./routes/home').router;
const movies = require('./routes/movies').router;

app.use(express.static('dist'));
app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');
app.set('views', 'src/server/views');

app.use('/home', home);
app.use('/movies', movies);

app.post('/file', upload.single('uploadedFile'), (req, res, next) => {
  next();
});

app.listen(3000, () => {
  console.log('listening on port 3000... - ^C to exit');
});
