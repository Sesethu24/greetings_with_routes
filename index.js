let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Greeting = require("./greetings")
let myRoutes = require("./route")

const flash = require('express-flash');
const session = require('express-session');

app.use(session({
  secret: "<add an alert message>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash())


const pg = require('pg');
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://sesethu:pg123@localhost:5432/my_greetings';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

let greetingsApp = Greeting(pool);
let routes = myRoutes(greetingsApp)

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

app.get('/', routes.index)
app.post('/Greetings', routes.greet);
app.get('/greeted', routes.greeted)

let PORT = process.env.PORT || 3005;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});