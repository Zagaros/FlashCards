const fs = require("fs");
const util = require("util");
let readFile = util.promisify(fs.readFile)
let writeFile = util.promisify(fs.writeFile)
const {Deck, Card} = require("./public/script");

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
        let array = themes;
        for(let i = 0; i < array.length;i++){
            this.decks.push(new Deck(array[i].title, array[i].id, this))
            for(let j = 0; j < array[i].cards.length; j++){
                this.decks[i].cards.push(new Card(array[i].cards[j].question, array[i].cards[j].answer))
            }
        }  
    }
    async save(filnamn = "themes.txt"){
        let saveThemes = JSON.stringify(this.decks);
        await writeFile(filnamn, saveThemes, "utf8")
    }
}
module.exports = Saver;