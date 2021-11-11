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

    storeOne(key, instance) {
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        let newData = { ...dbData}

        if (!(key in newData)) {
            newData[key] = [instance]
        } else {
            newData[key].push(instance)
        }

        fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(newData))

        return newData
    }



    //Guarda los datos enla clave key
    store(key, data) {
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        let newData = { ...dbData}

        newData[key] = data
        

        fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(newData))

        return newData
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