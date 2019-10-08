module.exports = function Greeting(data) {

    let namesGreeted = data || {};
    let greeted;

    function allLetter(input) {
        var letters = /^[A-Za-z]+$/;
        if (input.match(letters)) {
            return true;
        } else {
            return false
        }
    }

    function setNames(name, lang) {

    var upperCaseName = name.toUpperCase();
    
        if(name){
              if (namesGreeted[upperCaseName] === undefined) {
            namesGreeted[upperCaseName] = 0;
        }
        
    }
        if (lang === "English") {
            greeted = "Hello " + upperCaseName;
        }
        else if (lang === "isiXhosa") {
            greeted = "Molo " + upperCaseName;
        }
        else if (lang === "Afrikaans") {
            greeted = "Hallo " + upperCaseName;
        }
    }
    function theMessage(){
        return greeted;
    }

    function counter() {
        var k = Object.keys(namesGreeted)
        return k.length;
    }
    function getName() {
       return namesGreeted;
    }

    return {
        setNames,
        getName,
        counter,
        allLetter,
        theMessage
    }

}