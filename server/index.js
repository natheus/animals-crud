const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "***",
  user: "***",
  password: "***",
  database: "***",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { nome } = req.body;
  const { raca } = req.body;
  const { detalhes } = req.body;

  let mysql = "INSERT INTO animais ( nome, raca, detalhes ) VALUES (?, ?, ?)";
  db.query(mysql, [nome, raca, detalhes], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { nome } = req.body;
  const { raca } = req.body;
  const { detalhes } = req.body;

  let mysql =
    "SELECT * FROM animais WHERE nome = ? AND raca = ? AND detalhes = ?";
  db.query(mysql, [nome, raca, detalhes], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM animais";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql =
    "UPDATE animais SET nome = ?, raca = ?, detalhes = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM animais WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
