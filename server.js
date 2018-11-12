const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/hej", (req, res) => {

    res.render("card.ejs", {
        theme: "theme",
    });
});

app.listen(3000, () => console.log("listening on port 3000"));