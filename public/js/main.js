console.log("hola")

$(".delete-card-item").click(function() {
    console.log("Clicado")
    alert("Clicado")
    console.log(this)
    $("#delete-card-button").prop("href", "/delete_card/{{ id }}")
})