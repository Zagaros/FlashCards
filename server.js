const express = require("express");
const app = express();
const Saver = require("./saver");
const {Deck, Card} = require("./public/script");
const Saved = new Saver();



//testing
    for(let i = 0; i < 5; i++){
        Saved.decks.push(new Deck("hej",i));
        for(let j = 0; j < 5; j++){
            Saved.decks[i].addCard("ÄR APOR FINA?" + i, "JA DE ÄR DOM" + j);
        }
    }
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