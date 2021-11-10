const { AvatarService } = require("../services/avatar.js")
const { DatabaseService } = require("../services/database.js")


class CardRepository{
    constructor() {
    }

    getCards() {
        const database = new DatabaseService()
        return database.get("cards")
    }
}




class Card {
    constructor() {
        console.log("Cargando card")
    }
}

module.exports = {
    Card, CardRepository
}