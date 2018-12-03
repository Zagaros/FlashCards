const fs = require("fs");
const util = require("util");
let readFile = util.promisify(fs.readFile)
let writeFile = util.promisify(fs.writeFile)

class Saver {
    constructor() {
        this.decks = [];
    }
    findById(id){
        for(let i = 0; i < this.decks.length; i++){
            if(this.decks[i].id == id){
                return this.decks[i];
            }
        }
    }
    async load(filnamn = "themes.txt"){
        let data = await readFile(filnamn, "utf8");
        let themes = JSON.parse(data);
        this.decks = themes;    
    }
    async save(filnamn = "themes.txt"){
        console.log("hej")
        let saveThemes = JSON.stringify(this.decks);
        console.log({saveThemes})
        await writeFile(filnamn, saveThemes, "utf8")
        
    }
}
module.exports = Saver;