
class Deck {
    constructor(title, id, saver) {
        Object.defineProperty(this, "saver", {
            enumerable: false,
            value: saver
        });
        this.title = title;
        this.cards = [];
        this.completed = [];
        this.currentCard = 0;
        this.id = id;
        this.progress = [];
    }
    addProgress(right, questions){
        let d = new Date(Date.parse(n));
        let date = d.toLocaleString();
        this.progress.push({right, questions, date})
        this.saver.save();
    }
    nextCard(){
        let next;
        if(this.currentCard < this.cards.length){
            next = this.currentCard + 1;
        } else{
            next = this.currentCard;
        }
        return next;
    }
    getCard(){
        return this.cards[this.currentCard]
    }
    addCard(question, answer){
        this.cards.push(new Card(question, answer))
        this.saver.save("themes.txt");
    }
    answer(ans){
        switch (ans) {
            case false:
                //Do nothing
                break;
            case true:
                this.completed.push(this.cards[this.currentCard])
                this.cards.splice(this.currentCard, 1);
                this.currentCard--;
                break;
        }
        if(this.cards > this.currentCard){
            this.currentCard++;
        }
    }
    restart(){
        for(let i = 0; i < this.completed.length; i++){
            this.cards.push(this.completed[i]);
        }
        this.completed = [];
    }
    shuffleCards(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
class Card {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.text = this.question;

        this.shouldShowAnswer = false;
    }
    showQuestion(){
        if(this.shouldShowAnswer){
            this.text = this.answer;
        }
        return this.text;
    }
    
    showAnswer(){
        let cardElement = document.getElementById("currentCard");
        cardElement.innerHTML = this.answer;
    }
}

if (typeof(module) !== "undefined")
    module.exports = {Deck, Card};
