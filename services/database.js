const fs = require("fs")

class DatabaseService{
    DB_FILE_PATH = __dirname + "/../.db.json"
    constructor() {}

    //Crea el archivo de la DB
    init() {
        return fs.writeFileSync(this.DB_FILE_PATH, "{}")
    }

    //Mira si la BD existe
    exists() {
        return fs.existsSync(this.DB_FILE_PATH)
    }

    //Guarda los datos enla clave key
    store(key, data) {
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        let newData = { ...dbData}

        newData[key] = data
        const jsonData = JSON.stringify(newData)

        return fs.writeFileSync(this.DB_FILE_PATH, jsonData)
    }

    //Toma los datos basado en esta clave
    get(key) {
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        return dbData[key]
    }
}


module.exports = {
    DatabaseService
}