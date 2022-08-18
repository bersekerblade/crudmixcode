const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")
const app = express()

app.use(BodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "anime",
    user: "root",
    password: "",
})
 
db.connect((err) => {
    if (err) throw err
    console.log("Database tersambung...")

       //untuk get data
        app.get("/", (req, res) => {
            const sql = "SELECT * FROM nama_anime"
            db.query(sql, (err, result) => {
            const nama_animes = JSON.parse(JSON.stringify(result))
            console.log("hasil database ->", nama_animes)
            res.render("index", { nama_animes: nama_animes, title: "LIST ANIME 2022" })
        })

        //untuk tambah data
        app.post("/tambah", (req, res) =>{
            const insertSql = `INSERT INTO nama_anime (nama, tokoh) VALUES ('${req.body.nama}', '${req.body.tokoh}');`
            db.query(insertSql, (err, result) => {
                if (err) throw err
                res.redirect("/");
            })
        })

        //route untuk delete data
     //   app.delete("/hapus",(req, res) => {
            //const deleteSql = `DELETE FROM nama_anime WHERE id = '${req.params.id}' `
     //       db.query(deleteSql, (err, results) => {
      //          if(err) throw err;
      //          res.redirect("/");
      //      })
     // })

     // DELETE USER
//app.delete('/hapus', (req, res) => {
//db.query(`DELETE FROM nama_anime WHERE id = ${req.body.id}'`, function(err, result) {
            //if(err) throw err
//            res.json({
  //              message: 'delete'
//             })
//             if (err) {
//                // req.flash('error', err)
//                 // redirect to users list page
//                // res.redirect('/')
//             } else {
//                 //req.flash('success', 'Customer deleted successfully! id = ' + req.body.id)
//                 // redirect to users list page
//                 // res.redirect('/')
//             }
//         })
//    })

})
app.post('/hapus', (req, res) => {
    db.query(`DELETE FROM nama_anime WHERE id = '${req.body.id}'`, function(err, result) {
        if (err){
            res.json({
                error: err
              })
        }
        
        // res.json({
        //     message: 'delete'
        //   })
        res.redirect('/')
    })
        // res.json({
        //     message:req.body
        //   })

    
})

})

app.listen(8000, () => {
    console.log("Server Siap...")
})