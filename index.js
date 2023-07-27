const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

app.post("/", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const taskId = req.body.taskId;
  tasks.splice(taskId, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
