const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const { Card, CardRepository } = require("./models/card")

const { DatabaseService } = require("./services/database")

const app = express()
const hbs = exphbs()

app.use(express.urlencoded({
  extended: true
}))


app.use(morgan("dev"))
app.use(express.static(__dirname + '/public'))


app.engine("handlebars", hbs)
app.set("view engine", "handlebars")
const port = process.env.PORT || 3000

const db = new DatabaseService()

if (!db.exists()) {
  db.init()
}

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
    "cards", {cards: new CardRepository().getCards()}
    )
})

app.get("/cards/:id", function(request, response) {
  const card = db.findOne("cards", request.params.id)

  if (!card){
    response.status(404).send()
    return
  }

  response.render("card",{"card": card} )
})


app.get("/delete_card/:id", function(request,response) {
  const instanceId = request.params.id
  db.removeOne("cards", instanceId)
  
  response.redirect("/cards")
})



app.post("/cards", function(request,response) {
  const cardName = request.body.name
  const description = request.body.description
  const price = request.body.price

  if (cardName === "" || description === "" || price === ""){

    response.status(400).render("cards", 
      {cards: new CardRepository().getCards(), 
      message: "Carta no creada. Tienes que completar todos los campos", 
      message_error: true})

  } else{
      // crear la nueva carta
  const newCard = new Card(cardName, description, price)

  // Guardarla en la base de datos
  db.storeOne("cards", newCard)

  response.redirect("/cards")
  }
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

