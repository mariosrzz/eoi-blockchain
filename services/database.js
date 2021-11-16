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


    updateOne(key, instance) {
        let resourceList = this.get(key)

        const itemToEditIndex = resourceList.findIndex(
            item => item.id === instance.id
        )

        resourceList[itemToEditIndex] = instance
        this.store(key, resourceList)

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


    removeOne(key, instanceId) {
        const elementList = this.get(key)
        const itemToRemove = elementList.findIndex(item => item.id === instanceId)

        elementList.splice(itemToRemove, 1)

        this.store(key, elementList)
        /*
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        let newData = { ...dbData}

        let dbDataListByKey = newData[key]
        
        for (let i=0; i<dbDataListByKey.length; i++){
            if (dbDataListByKey[i].id === instanceId){
                dbDataListByKey.splice(i, 1)
            }
        }
        
        newData[key] = dbDataListByKey

        fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(newData))
        return dbDataListByKey
        */
    }

    findOne(key, instanceId) {
        const elementList = this.get(key)
        return elementList.find(item => item.id === instanceId)

        /*
        const dbData = JSON.parse(fs.readFileSync(this.DB_FILE_PATH))
        const dbDataListByKey = dbData[key]
        for (let instance of dbDataListByKey){
            if (instance.id === instanceId){
                return instance
            }
        }
        */
    }
}








module.exports = {
    DatabaseService
}