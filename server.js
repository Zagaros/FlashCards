const express = require("express");
const app = express();
const Saver = require("./saver");
const {Deck, Card} = require("./script");
const Saved = new Saver();

//testing
    for(let i = 0; i < 5; i++){
        Saved.decks.push(new Deck(i));
    }
//end Testing
app.set("view engine", "ejs");

app.get("/" , (req, res) => {
    res.render("index", {
        Saved
    });
});

app.use('/public', express.static('public'));
app.listen(3000, () => console.log("listening on port 3000"));