const express = require('express');
const { status } = require("express/lib/response");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const articleRouter = require('./routes/articlesRoutes');


const app = express();

//Extration des données du formulaire
app.use(express.urlencoded({ extended: false }));

app.use(express.static("Public"));

const optionBd = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "node_blog",
  };




//Définition du middleware pur connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

//Définition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", "IHM");

//Définition des routes pour notes
app.use(articleRouter);





app.listen(3002,() => {
    console.log("Port 3002");
})