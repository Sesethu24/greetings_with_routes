const assert = require('assert');
const Greeting = require('../greetings');

describe('greeting' , function(){
    it('should greet a person in isiXhosa' , function(){
        var greetings = Greeting();
        assert.equal(greetings.setNames("Sesethu", "isiXhosa"), "Molo Sesethu");

      });
    it('should greet a person in English' , function(){
        var greetings = Greeting();
        assert.equal(greetings.setNames("Daniel", "English"), "Hello Daniel");

      });
      it('should greet a person in Afrikaans' , function(){
        var greetings = Greeting();
        assert.equal(greetings.setNames("Sam", "Afrikaans"), "Hallo Sam");

      });
      it('should be able to keep track of a name greeted' , function(){
        var greet = Greeting()
        assert.equal(greet.getName('Inga'),greet.getName());

      });
      it('should not increment the counter when the same name is entered more than once' , function(){
        var count = Greeting()
        count.setNames("Phozie", "English");
        count.setNames("Phozie", "English");
        count.setNames("Phozie", "English");

        assert.equal(1, count.counter());

      });
      it('should count how many people were greeted' , function(){
        var count = Greeting()
        count.setNames("Phozie", "English");
        count.setNames("Sethu", "isiXhosa");
        count.setNames("Ongie", "Afrikaans");

        assert.equal(3, count.counter());

      });

      it('should return true when a valid name is passed', ()=> {
        var factFun = Greeting();
        var name = "Tommy"

        assert.equal(true, factFun.allLetter(name));

      })

      it('should return false when numbers or strange characters are passed', ()=> {
        var factFun = Greeting();
        var name = '7776';

        assert.equal(false, factFun.allLetter(name));

      })
});