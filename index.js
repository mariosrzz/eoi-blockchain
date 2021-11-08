const express = require("express")
const exphbs = require("express-handlebars")

const app = express()
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")
const port = 3000

app.get("/", function(request,response) {
  response.render("index")
})

app.get("/hola", function(request,response) {
  response.render("hola")
})

app.get("/contacto", function(request,response) {
  response.render("contacto")
})



app.listen(port, function() {
  console.log("Servidor iniciado")
})

