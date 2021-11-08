const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")

const app = express()
app.use(express.urlencoded({
  extended: true
}))
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

app.post("/contacto", function(request,response) {
 // TODO: Recoger los datos que nos envian
  console.log(request.body.email)
  console.log(request.body.message)
  response.send("Enviado")
})





app.listen(port, function() {
  console.log("Servidor iniciado")
})

