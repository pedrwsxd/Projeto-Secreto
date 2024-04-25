//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var usarioAutorizado = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next){
    const senha = req.body["password"];
    if (senha === "senha"){
        usarioAutorizado = true;
    }
    if (senha === "Senha"){
        usarioAutorizado = true;}
    next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html" );
});



app.post("/check", (req, res) => {
    if(usarioAutorizado){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.redirect("/");
    }
});

app.post("/refresh", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    usarioAutorizado = false;
});


app.listen(port, (res, req) => {
    console.log(`Respondendo na porta ${port}`);
});