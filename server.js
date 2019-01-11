const express = require("express");
const app = express();
const Saver = require("./saver");
const { Deck, Card } = require("./public/script");
const Saved = new Saver();


//Vi använer oss av async för att datorn ska kunna få informationen innan den försöker köra all kod.
async function main() {
    //Väntar på all information
    await Saved.load();
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));

    //alla urls som bara innerhåller / kommer att komma hit.
    app.all("/", (req, res) => {
        //beroende på om man har lagt till ett nytt tema eller inte så kommer annorlunda saker hända.
        let newTheme = req.body.theme;
        if (newTheme == undefined) {
            //här har man inte lagt till ett nytt tema så vi visar alla teman vi har.
            res.render("index", {
                Saved
            });
        } else if(newTheme != ""){
            //När du har lagt till ett tema så lägger vi till det på Saved och sen skickar vi dig till editdeck på just de tema
            //du la till.
            Saved.decks.push(new Deck(newTheme, Saved.decks[Saved.decks.length - 1].id + 1, Saved));
            let theme = Saved.decks[Saved.decks.length - 1];
            res.render("editDeck", { theme })
        }

    });

    app.all("/edit/:title/:id", (req, res) => {
        let id = req.params.id;
        let theme = Saved.findById(id);
        let question = req.body.Question;
        let answer = req.body.Answer;
        //här kollar vi om du har försökt att lägga till en fråga än. om du har det så kommer vi lägga till det i temat.
        //annars så visar vi bara alla fråger.
        if (question != undefined && answer != undefined && question != "" && answer != "") {
            theme.addCard(question, answer);
        };

        res.render("editDeck", { theme, Saved })
    });

    
    app.post("/remove/:id/:i", (req, res) => {
        //här tar vi bort fråger från temat. om man tar bort en fråga så redirectas man tillbaka till edit fast frågan kommer vara borta
        //från vårt JSON fil.
        let id = req.params.id;
        let i = req.params.i;
        let theme = Saved.findById(id);
        theme.cards.splice(i, 1);
        res.redirect("/edit/" + theme.title + "/" + theme.id)
    });

    app.get("/theme/:title/:id", (req, res) => {

        let id = req.params.id;
        let theme = Saved.findById(id);
        //här kollar vi om temat har några fråger, om det inte har det så redirectar vi den till edit.
        if(theme.cards[theme.currentCard] == undefined){
            res.render("editDeck", {theme});
        }
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
            res.redirect("/progress/" + theme.title + "/" + theme.id);
        }
        theme.shuffleCards();
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
    
    app.get("/*/" , (req,res) => {
        res.render("index", {
            Saved
        }); 
    });
    app.listen(3000, () => console.log("listening on port 3000"));
}
main();