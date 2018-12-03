const express = require("express");
const app = express();
const Saver = require("./saver");
const {Deck, Card} = require("./public/script");
const Saved = new Saver();

<<<<<<< HEAD
=======
app.use(express.urlencoded({extended: true}));

//testing
    for(let i = 0; i < 5; i++){
        Saved.decks.push(new Deck("hej",i));
        for(let j = 0; j < 5; j++){
            Saved.decks[i].addCard("ÄR APOR FINA?" + j, "JA DE ÄR DOM" + j);
        }
    }
//end Testing
app.set("view engine", "ejs");
>>>>>>> 11ddc3a79f4da078cdcffc54a8bd306900bfd838


<<<<<<< HEAD
async function main() {
    await Saved.load();

 console.log(Saved.decks[0])
    //testing

    //end Testing
    app.set("view engine", "ejs");

    app.get("/" , (req, res) => {
        res.render("index", {
            Saved
        });

    });
    app.get("/theme/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        let card = req.query.valueCard;
        let answer = req.query.answer;
        if(answer != undefined){
            if(answer === "right"){
                theme.completed.push(theme.cards[theme.currentCard]);
                theme.cards.splice(theme.currentCard, 1)
                theme.currentCard = theme.nextCard();
            } else if(answer === "wrong"){
                theme.currentCard = theme.nextCard();
            }
        }
        console.log("kort", theme.currentCard)
        res.render("card", {theme});
    });
    app.get("/edit/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        let question = req.query.Question;
        let answer = req.query.Answer;
        if(question != undefined && answer != undefined){
            theme.addCard(question, answer);
        };

        res.render("editDeck", {theme})
    });
    app.get("/theme/makeDeck", (req, res) => {
=======
});
app.all("/theme/:title/:id", (req, res) => {
    let id = req.params.id;
    let theme = Saved.findById(id);
    let card = req.body.valueCard;
    let answer = req.body.answer;

    if(!theme.cards.length == 0){
        if(answer === "right"){
            theme.completed.push(theme.cards[theme.currentCard]);
            theme.cards.splice(theme.currentCard, 1) 
            
            if(theme.currentCard >= theme.cards.length){
                theme.currentCard = 0;
            }
        } else if(answer === "wrong"){
            theme.currentCard = theme.nextCard();
            if(theme.currentCard >= theme.cards.length){
                theme.currentCard = 0;
            }
        }
    } 
    
    res.render("card", {theme});
});
app.get("/edit/:title/:id", (req, res) => {
    let id = req.params.id;
    let theme = Saved.findById(id);
    let question = req.query.Question;
    let answer = req.query.Answer;
    if(question != undefined && answer != undefined){
        theme.addCard(question, answer);
    };
    res.render("editDeck", {theme})
});
app.get("/theme/makeDeck", (req, res) => {
>>>>>>> 11ddc3a79f4da078cdcffc54a8bd306900bfd838

        res.render("makeDeck");
    });

    app.get("/answer", (req, res) => {
        //res.send("got info: " + JSON.stringify(req.query))
        let cardId = req.query.Card;
        let deckId = req.query.deck;
        let theme = Saved.findById(deckId);
        res.render("card.ejs", {theme})
    });

    app.use('/public', express.static('public'));
    app.listen(3000, () => console.log("listening on port 3000"));
}
main();