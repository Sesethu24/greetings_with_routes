const assert = require('assert');
const Greeting = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://sesethu:pg123@localhost:5432/greetings_tests';

const pool = new Pool({
  connectionString
});

describe('The basic database web app', function () {

  beforeEach(async function () {
    await pool.query("DELETE FROM people_greeted;");

  });

  it('should able to add a category', async function () {
    let instance = Greeting(pool);
    await instance.setNames("sbu");
    let greetMe = await instance.getName();
    assert.equal(1, greetMe.length);
  });

  it('should able to count the names greeted', async function () {
    let instance = Greeting(pool);
    await instance.setNames("sbu");
    let greetMe = await instance.counter();
    assert.equal(1, greetMe);
  });

  it('should able to greet a person', async function () {
    let instance = Greeting(pool);
    await instance.setNames("sbu", "English");
    let greetMe = await instance.theMessage();
    assert.equal("Hello SBU", greetMe);
  });

  after(function () {
    pool.end();
  })
});