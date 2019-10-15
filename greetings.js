module.exports = function Greeting(pool) {

    let greeted;

    async function setNames(name, lang) {
        let upperCaseName = name.toUpperCase()
        await pool.query("INSERT INTO people_greeted (name_,greeted) VALUES ($1,$2);", [upperCaseName, 1])
        if (lang === "English") {
            greeted = "Hello " + upperCaseName;
        } else if (lang === "isiXhosa") {
            greeted = "Molo " + upperCaseName;
        } else if (lang === "Afrikaans") {
            greeted = "Hallo " + upperCaseName;
        }

    }

    async function getName() {
        var names = await pool.query("SELECT * FROM people_greeted;")
        return names.rows
    }
    async function counter() {
        var count = await pool.query("SELECT COUNT(*) FROM people_greeted")
        return count.rows[0].count;
    }

    function theMessage() {
        return greeted;
    }

    async function eachName(name) {
        let nameList = await pool.query("SELECT * FROM people_greeted;")
        let filteredNames = [];
        for (let i = 0; i < nameList.rows.length; i++) {
            let element = nameList.rows[i].name_;

            if (element.name_ === name) {
                filteredNames.push(element)
            }
        }

        return filteredNames
    }

    async function countUser(name) {
        let names = await pool.query("SELECT * FROM people_greeted;")
        let total = 0

        for (let i = 0; i < names.rows.length; i++) {
            let element = names.rows[i].name_;
            console.log(element,"first run");
            if (name === element) {
                let user = names.rows[i].greeted
                
                total = user
                console.log(user,"second run");
            }
        }
        return total
    }

    return {
        setNames,
        getName,
        counter,
        theMessage,
        eachName,
        countUser
    }

}