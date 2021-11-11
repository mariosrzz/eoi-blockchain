const { v4: uuidv4 } = require('uuid')


const { AvatarService } = require("../services/avatar")
const { DatabaseService } = require("../services/database")


class CardRepository{
    constructor() {
    }

    getCards() {
        const database = new DatabaseService()
        return database.get("cards")
    }
}




class Card {
    constructor(cardName, description, price) {
        this.name = cardName
        this.price = price
        this.id = uuidv4()
        this.description = description
        this.avatar = new AvatarService().getAvatarFromName(this.id)
    }
}



module.exports = {
    Card, CardRepository
}