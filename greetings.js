module.exports = function Greeting(pool) {

    let greeted;

    async function setNames(name, lang) {
        clear()
        let upperCaseName = name.toUpperCase()

        var names = await pool.query("SELECT DISTINCT name_ FROM people_greeted WHERE name_ = $1", [upperCaseName])

        if (names.rows.length === 1) {
            await pool.query("UPDATE people_greeted SET greeted = greeted +1 WHERE name_ = $1", [upperCaseName])
        } else {
            await pool.query("INSERT INTO people_greeted (name_,greeted) VALUES ($1,$2);", [upperCaseName, 1])
        }

        if (lang === "English") {
            greeted = "Hello " + upperCaseName;
        } else if (lang === "isiXhosa") {
            greeted = "Molo " + upperCaseName;
        } else if (lang === "Afrikaans") {
            greeted = "Hallo " + upperCaseName;
        }

    }
    async function getName() {
        var names = await pool.query("SELECT name_ FROM people_greeted")
       
        return names.rows
    }
    async function counter() {
        var count = await pool.query("SELECT COUNT(*) FROM people_greeted")
        return count.rows[0].count;
    }

    function theMessage() {
        return greeted;
    }

    function clear() {
        return ""
    }

    async function eachName(name) {

        let nameList = await pool.query("SELECT * FROM people_greeted");
        if (name) {
            let filteredNames = {};
            for (let i = 0; i < nameList.rows.length; i++) {
                let element = nameList.rows[i].name_;
                if (element === name) {
                    filteredNames = nameList.rows[i]
                }
            }

            return filteredNames
        } else {
            return nameList.rows
        }
    }
    async function resetData() {
        let reset = await pool.query("DELETE FROM people_greeted;")
        greeted = clear()
        return reset;
    }

    return {
        setNames,
        getName,
        counter,
        theMessage,
        eachName,
        resetData,
        clear
    }

}