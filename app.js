var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine' , 'ejs');

app.use(express.static('./public'));

todoController(app);

const host = process.env.HOST || '0.0.0.0' ;
const port = process.env.PORT || 3000 ;

app.listen(port , host , () => {
    console.log('Server is ON');
});
