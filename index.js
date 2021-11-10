const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")

const { Card, CardRepository } = require("./models/card")

const app = express()
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(__dirname + '/public'))


app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")
const port = process.env.PORT || 3000

function isAuthenticated(user,password){
  return user == "admin" && password == "admin"
}

app.get("/", function(request,response) {
  response.render("index")
})

app.get("/hola", function(request,response) {
  response.render("hola")
})

app.get("/contacto", function(request,response) {
  response.render("contacto")
})

app.post("/contacto", function(request,response) {
 // TODO: Recoger los datos que nos envian
  console.log(request.body.email)
  console.log(request.body.message)
  response.render("contacto", {message: "Mensaje enviado!", 
    message_error: false})
})

app.get("/login", function(request,response) {
  response.render("login")
})

app.post("/login", function(request,response) {
  const user = request.body.user
  const password = request.body.password

  if (isAuthenticated(user,password)){
    response.redirect("/dashboard")
  }else{
    response.render("login", {
      message: "Usuario o password incorrecto", 
      message_error: true})
  }
})

app.get("/dashboard", function(request,response) {
  response.render("dashboard")
})

app.get("/cards", function(request,response) {
  response.render(
    "cards",
    {cards: new CardRepository().getCards()}
    )
})


app.get("/about", function(request,response) {
  response.render("about")
})

app.post("/about", function(request,response) {
  response.render("about", {message: "Suscrito correctamente!", 
    message_error: false})
})

app.get("/users/:user", function(request,response) {
  response.send(`Usuario ${request.params.user}`)
})





app.listen(port, function() {
  console.log("Servidor iniciado en puerto " + port)
})

