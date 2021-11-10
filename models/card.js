class CardRepository{
    constructor() {


    }

    getCards() {
        return [
            {
              id: 1,
              name: "Carta 1",
              description: "Blah Blah Blah",
              avatar: "",
              price: 0.012
            },
            {
              id: 2,
              name: "Carta 2",
              description: "Blah Blah",
              avatar: "",
              price: 0.23
            },
            {
              id: 3,
              name: "Carta 3",
              description: "Blah",
              avatar: "",
              price: 0.004
            },
            {
              id: 4,
              name: "Carta 4",
              description: "Bleeeeh",
              avatar: "",
              price: 0.024
            },
            {
              id: 5,
              name: "Carta 4",
              description: "Bleh",
              avatar: "",
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