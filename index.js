let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Greeting = require("./greetings")

const flash = require('express-flash');
const session = require('express-session');

app.use(session({
  secret: "<add an alert message>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash())

let greetingsApp = Greeting();

const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql/codex:codex123//localhost:5432/my_greetings';

const pool = new Pool({
  connectionString
});
// function cb(err, result) {
//   if (err) {
//     console.log("Something went wrong", err);
//   } else {
//     console.log(result.rows);
//   }
// }
//pool.query("select * from people_greeted", cb);

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

   myCounter: greetingsApp.counter()
  
  });

})
app.post('/Greetings', function (req, res) {

  let inputName = req.body.textBtn;
  let radio = req.body.language;

 
if (radio === undefined ) {

    req.flash("message", "Please select language!")
    return res.redirect('/')
  }
else if (inputName === "" ){

    req.flash("message", "Please enter a valid name!")
    return res.redirect('/')
  }
  greetingsApp.setNames(inputName, radio)
  req.flash("greeted", greetingsApp.theMessage())

  res.redirect('/');

});

let PORT = process.env.PORT || 3005;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});