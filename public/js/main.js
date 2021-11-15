$(".delete-card-item").click(function() {
    console.log($(this).data())
    const cardId = $(this).data("card-id")
    $("#delete-card-button").prop("href", `/delete_card/${cardId}`)
})

