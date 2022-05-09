const express = require('express');

const router = express.Router();


//GET ARTICLE
router.get("/", (req, res) => {
    let numero = 0;
    numero+=1;
      req.getConnection((erreur, connection) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          connection.query("SELECT * FROM article", [], (erreur, resultat) => {
            if (erreur) {
              console.log(erreur);
              
              res.status(500).render("erreur", { erreur });
            } else {
              res.status(200).render("dashboard", { resultat,numero });
            }
          });
        }
      });
    });

   //PAGE AJOUTER
  router.get("/add",(req,res) => {
    res.status(200).render("add");
  }); 
  

  //PAGE MODIFIER
  router.get("/update/:id",(req,res) => {
    req.getConnection((erreur, connection) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          connection.query("SELECT * FROM article ", [], (erreur, resultat) => {
            if (erreur) {
              console.log(erreur);
              
              res.status(500).render("erreur", { erreur });
            } else {
              res.status(200).render("update", { resultat,numero });
            }
          });
        }
      });
   
  }); 
   //AJOUTER UN ARTCILE 
  
  router.post("/ajouter", (req, res) => {
      let id = req.body.id === "" ? null : req.body.id;
      let titre = req.body.titre;
      let description = req.body.description;
    
      let reqSql =
        id === null
        ?   "INSERT INTO article(titre, description) VALUES(?, ?)"
          : "UPDATE article SET titre = ?, description = ? WHERE id_article = ?";
    
      let donnees =
        id === null ? [null, titre, description] : [titre, description, id];
    
      req.getConnection((erreur, connection) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          connection.query(reqSql, donnees, (erreur, resultat) => {
            if (erreur) {
              console.log(erreur);
              res.status(500).render("erreur", { erreur });
            } else {
              res.status(300).redirect("/");
            }
          });
        }
      });
    });
  
    //SUPRIMER UN ARTICLE
    router.delete("/article/:id", (req, res) => {
        let id = req.params.id;
        req.getConnection((erreur, connection) => {
          if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur", { erreur });
          } else {
            connection.query(
              "DELETE FROM article WHERE id_article = ?",
              [id],
              (erreur, resultat) => {
                if (erreur) {
                  console.log(erreur);
                  res.status(500).render("erreur", { erreur });
                } else {
                  res.status(200).json({ routeRacine: "/" });
                }
              }
            );
          }
        });
      });
      
      module.exports = router;
       
  