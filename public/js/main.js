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
    const nameValue = $(this).val()
    if (nameValue) {
        $("#create-card-button").prop("disabled",false)
    } else{
        $("#create-card-button").prop("disabled", "disabled")
    }
})

showNotification = function(message, isError = false) {
    let notification = $('<div>').addClass("alert alert-success").prop("role", "alert")
    notification.text(message)

    if (isError) {
        notification.removeClass("alert-success").addClass("alert-danger")
    }
    $("#notifications").empty().append(notification)
}


$(".card-item").click(function() {
    const cardId = $(this).data("card-id")
    const message = `Has cliclado la carta ${cardId}`
    showNotification(message)
})
