const express = require('express');

const router = express.Router();


//AFFICHER ARTICLE
router.get("/", (req, res) => {
    let numero = 1;
    
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
    let nom="seth"
    req.getConnection((erreur, connection) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          connection.query("SELECT * FROM article where id_article = ?", [req.params.id], (erreur, resultat) => {
            if (erreur) {
              console.log(erreur);
              
              res.status(500).render("erreur", { erreur });
            } else {
              res.status(200).render("update", { resultat,nom });
              //console.log(resultat);
            }
          });
        }
      });
   
  }); 

   //AJOUTER UN ARTCILE 
  router.post("/ajouter", (req, res) => {
      let titre = req.body.titre;
      let description = req.body.description;
    
      let reqSql = "INSERT INTO article(titre, description) VALUES(?, ?)"
         
      let donnees = [titre, description]
    
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


    //MODIFIER UN ARTICLE

    router.post("/modifier", (req, res) => {
      let id_article = req.body.id
      let titre = req.body.titre;
      let description = req.body.description;
    
      let reqSql = "UPDATE article SET titre = ?, description = ? WHERE id_article = ?"
         
      let donnees = [titre, description, id_article]
    
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
       
  