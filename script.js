class Deck {
    constructor(title) {
        this.title = title;
        this.cards = [];
        this.completed = [];
        this.currentCard = 0;
    }
    getCard(){
        return this.cards[this.currentCard]
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
        this.showAns = false;
    }
    show(){
        if(this.showAns){
            this.text = this.answer;
        }
        return this.text;
    }
}