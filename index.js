let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Greeting = require("./greetings")

let greetingsApp = Greeting();

app.use(express.static('public'));

var exphbs = require('express-handlebars');

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  
  res.render('index', {

    names: greetingsApp.theMessage(),
    myCounter: greetingsApp.counter()
  });

})
  app.post('/Greetings', function (req, res) {

    greetingsApp.setNames(req.body.textBtn, req.body.language)
    res.redirect('/')
  });


let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});