$(".delete-card-item").click(function() {
    console.log($(this).data())
    const cardId = $(this).data("card-id")
    $("#delete-card-button").prop("href", `/delete_card/${cardId}`)
})


$("#create-card-button").click(function() {
    console.log("Click")
    const name = $('input[name="name"]').val()
    const description = $('input[name="description"]').val()
    const price = $('input[name="price"]').val()
})


$('input[name="name"]').change(function() {
    console.log("Cambio")
    console.log($(this).val())
    $("#create-card-button").prop("disabled",false)
})
