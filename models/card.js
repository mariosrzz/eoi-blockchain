const { AvatarService } = require("../services/avatar.js")


class CardRepository{
    constructor() {
    }

    getCards() {
        const avatar = new AvatarService()
        return [
            {
              id: 1,
              name: "Carta 1",
              description: "Blah Blah Blah",
              avatar: avatar.getUniqueAvatarFromName("Carta 1"),
              price: 0.012
            },
            {
              id: 2,
              name: "Carta 2",
              description: "Blah Blah",
              avatar: avatar.getUniqueAvatarFromName("Carta 2"),
              price: 0.23
            },
            {
              id: 3,
              name: "Carta 3",
              description: "Blah",
              avatar: avatar.getUniqueAvatarFromName("Carta 3"),
              price: 0.004
            },
            {
              id: 4,
              name: "Carta 4",
              description: "Bleeeeh",
              avatar: avatar.getUniqueAvatarFromName("Carta 4"),
              price: 0.024
            },
            {
              id: 5,
              name: "Carta 4",
              description: "Bleh",
              avatar: avatar.getUniqueAvatarFromName("Carta 5"),
              price: 0.05
            }
          ]
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