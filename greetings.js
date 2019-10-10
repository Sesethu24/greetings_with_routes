module.exports = function Greeting(pool) {
    let greeted;

    async function setNames(name, lang) {
        let upperCaseName = name.toUpperCase()
        await pool.query("INSERT INTO people_greeted (name_,greeted) VALUES ($1,$2);", [upperCaseName, 1])
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

    return {
        setNames,
        getName,
        counter,
        theMessage
    }

}