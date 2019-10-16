module.exports = function (greetingsApp) {

    async function index(req, res) {
        var count = await greetingsApp.counter()
        res.render("index", {
            counter: count,
            message: greetingsApp.theMessage()
        })
    }

    async function greet(req, res) {

        let inputName = req.body.textBtn;
        let radio = req.body.language;
       

        if (radio === undefined) {

            req.flash("message", "Please select language!")
            return res.redirect('/')
        } else if (inputName === "") {

            req.flash("message", "Please enter a valid name!")
            return res.redirect('/')
        }
        await greetingsApp.setNames(inputName, radio)
        res.redirect('/')
    }

    async function greeted(req, res) {
        let listNames = await greetingsApp.eachName()
        res.render("greeted", {
            names: listNames
        })
    }

    async function counterFor(req, res) {
        let name = req.params;
        let names = await greetingsApp.eachName(name)

       
        // let counter = await greetingsApp.countUser(name)
        

        res.render("users", {
            user: name
            
        })

    }


    return {
        index,
        greet,
        greeted,
        counterFor
    }

}