const express = require("express");
var fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var listJson = require("./list.json");

app.listen(process.env.PORT || 8888, "localhost", () => {
  console.log("Listening on port 8888");
});

app.get("/", (req, res) => {
  res.send(listJson);
});

app.post("/", (req, res) => {
  fs.readFile("list.json", "utf8", (err, result) => {
    list = JSON.parse(result);
    list.items.push({ item: "new item" });
    fs.writeFile("list.json", JSON.stringify(list, null, 2), "utf-8", (err) => {
      if (err) throw err;
      else res.send(listJson);
    });
  });
});

app.delete("/", (req, res) => {
  fs.readFile("list.json", "utf8", (err, result) => {
    list = JSON.parse(result);
    index = list.items.findIndex((x) => x.item === "new item");
    if (index !== undefined) list.items.splice(index, 1);

    fs.writeFile("list.json", JSON.stringify(list, null, 2), "utf-8", (err) => {
      if (err) throw err;
      else res.send(listJson);
    });
  });
});
