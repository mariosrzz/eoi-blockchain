const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")

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
  response.send("Enviado")
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
    response.render("login", {message: "Usuario o password incorrecto"})
  }
})

app.get("/dashboard", function(request,response) {
  response.render("dashboard")
})

app.get("/users/:user", function(request,response) {
  response.send(`Usuario ${request.params.user}`)
})





app.listen(port, function() {
  console.log("Servidor iniciado en puerto " + port)
})

