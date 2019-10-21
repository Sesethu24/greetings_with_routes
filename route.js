module.exports = function (greetingsApp) {

    async function index(req, res) {
        var count = await greetingsApp.counter()
        res.render("index", {
            counter: count,
            message: greetingsApp.theMessage()
        })
    }

    function allLetter(input) {
        var letters = /^[A-Za-z]+$/;
        if (input.match(letters)) {
            return true;
        } else {
            return false
        }
    }


    async function greet(req, res) {

        let inputName = req.body.textBtn;
        let radio = req.body.language;
        if (allLetter(inputName) === true) {

            if (radio === undefined) {

                req.flash("message", "Please select language!")
                return res.redirect('/')
            } else if (inputName === "") {

                req.flash("message", "Please enter a valid name!")
                return res.redirect('/')
            }
            await greetingsApp.setNames(inputName, radio)
        } else {
            req.flash("message", "Incorrect name")
        }
        res.redirect('/')
    }

    async function greeted(req, res) {
        let listNames = await greetingsApp.eachName()
        res.render("greeted", {
            names: listNames
        })
    }

    async function eachUser(req, res) {
        let name = req.params.user;
        let names = await greetingsApp.eachName(name)

        res.render("users", {
            user: names

        })
    }
    async function clearButton(req, res) {
        await greetingsApp.resetData()
        res.redirect('/')
    }



    return {
        index,
        greet,
        greeted,
        eachUser,
        clearButton,
        allLetter
    }

}