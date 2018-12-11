const express = require("express");
const app = express();
const Saver = require("./saver");
const { Deck, Card } = require("./public/script");
const Saved = new Saver();



async function main() {
    await Saved.load();

    console.log(Saved.decks[0])
    //testing

    //end Testing
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));

    app.all("/" , (req, res) => {
        let newTheme = req.body.theme;
        if(newTheme == undefined) {

            res.render("index", {
                Saved
            });
        } else{
            Saved.decks.push(new Deck(newTheme, Saved.decks[Saved.decks.length - 1].id + 1, Saved));
            let theme = Saved.decks[Saved.decks.length - 1];
            res.render("editDeck", {theme})
        }

    });

    app.all("/edit/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        let question = req.body.Question;
        let answer = req.body.Answer;
        if(question != undefined && answer != undefined){
            theme.addCard(question, answer);
        };

        res.render("editDeck", { theme , Saved})
    });

    app.get("/remove/:id/:i", (req, res) => {
        let id = req.params.id;
        let i = req.params.i;
        let theme = Saved.findById(id);
        theme.cards.splice(i, 1);
        res.redirect("/edit/" + theme.title + "/" + theme.id)
    });

    app.get("/theme/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        res.render("card", { theme });
    });

    app.post("/theme/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        let card = req.body.valueCard;
        let answer = req.body.answer;

        if (answer === "right") {
            theme.completed.push(theme.cards[theme.currentCard]);
            theme.cards.splice(theme.currentCard, 1)

            if (theme.currentCard >= theme.cards.length) {
                theme.currentCard = 0;
            }
        } else if (answer === "wrong") {
            theme.wrongs++;
            theme.currentCard = theme.nextCard();
            if (theme.currentCard >= theme.cards.length) {
                theme.currentCard = 0;
            }
        } 

        if (theme.cards.length > 0) {
            res.render("card", { theme });
        } else {
            theme.currentCard = 0;
            for (var i = 0; i < theme.completed.length; i++) {
                theme.cards.push(theme.completed[i]);
                theme.completed.splice(i, 1)
                i--;
            }
            theme.addProgress();
            theme.wrongs = 0;
            res.render("win");
        }
    });
    app.get("/progress/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        res.render("progress", { theme });
    });

    app.get("/theme/makeDeck", (req, res) => {

        res.render("makeDeck");
    });

    app.get("/answer", (req, res) => {
        //res.send("got info: " + JSON.stringify(req.query))
        let cardId = req.query.Card;
        let deckId = req.query.deck;
        let theme = Saved.findById(deckId);
        res.render("card.ejs", { theme })
    });

    app.use('/public', express.static('public'));
    app.listen(3000, () => console.log("listening on port 3000"));
}
main();