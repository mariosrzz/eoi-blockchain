const express = require("express")
const exphbs = require("express-handlebars")
const morgan = require("morgan")
const _ = require("lodash")

const { Card, CardRepository } = require("./models/card")

const { DatabaseService } = require("./services/database")

const app = express()
const hbs = exphbs()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
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

function checkValidCardValues (body) {
  return body.name && body.description && body.price
}


app.get("/", function(request,response) {
  response.render("index")
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
  console.log(request.query.text)
  const query = request.query.text
  let cards

  if(query) {
    cards = db.search("cards", "name", query)
  } else {
      cards = db.get("cards")
  }
  response.render(
    "cards", {cards: cards, query: query}
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

  if (!checkValidCardValues(request.body)){

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



//Listar recursos (cartas)

app.get("/api/v1/cards", function (request, response) {
  const cards = new CardRepository().getCards()
  response.send(cards)
})

//Crear una carta
app.post("/api/v1/cards/", function (request, response) {

 if (!checkValidCardValues(request.body)){
   response.status(400).send(
     {
       "error" :400,
       "message": "No has introducido todos los valores"
     }
   )
   return
 } 
 
  const card = new Card(
    request.body.name,
    request.body.description,
    request.body.price)
  db.storeOne("cards", card)

  response.status(201).send(card)
})


//Muestra una carta
app.get("/api/v1/cards/:id", function (request, response) {
  const card = db.findOne("cards", request.params.id)

  if(!card) {
    response.status(404).send(
      {"error": 404, "message": "No existe el recurso 404"}
    )
    return
  }

  response.send(card)
})


//Edita una carta
app.put("/api/v1/cards/:id", function (request, response) {
  const card = db.findOne("cards", request.params.id)


  //Solo se puede editar name, price y description
  // SI me llega uno de estos valores dejo editar
  // si no me llega esto o mr llega otro un 400
  if(!card) {
    response.status(404).send(
      {"error": 404, "message": "No existe el recurso 404"}
    )
    return
  }

  const cardRequest = _.pick(request.body,["name", "price", "description"])

  if (_.isEmpty(cardRequest)){
    response.status(400).send(
      {
        "error" :400,
        "message": "No has rellenado alguno de los datos obligatorios"
      }
    )
    return
  } 

  const cardEdited = { ...card, ...cardRequest}
  db.updateOne("cards", cardEdited)


  response.send(cardEdited)

})



//Borra una carta
app.delete("/api/v1/cards/:id", function (request, response) {
  const instanceId = request.params.id

  if(!db.findOne("cards", instanceId)) {
    response.status(404).send(
      {"error": 404, "message": "No existe el recurso 404"}
    )
    return
  }

  db.removeOne("cards", instanceId)
  
  response.status(204).send()
  
})





app.listen(port, function() {
  console.log("Servidor iniciado en puerto " + port)
})

