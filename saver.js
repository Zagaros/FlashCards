class Saver {
    constructor() {
        this.decks = [];
    }
    findById(id){
        for(let i = 0; i < this.decks.length; i++){
            if(this.decks[id] == id){
                return this.decks[i];
            }
        }
    }
}
module.exports = Saver;