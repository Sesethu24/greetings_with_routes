let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Greeting = require("./greetings")

let greetingsApp = Greeting();

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:3008/my_greetings';

const pool = new Pool({
  connectionString
});

function cb(err, result) {
  if (err) {
    console.log("Something went wrong", err);
  } else {
    console.log(result.rows);
  }
}
pool.query("select * from people_greeted", cb);

app.use("**/css", express.static("public/css"))
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