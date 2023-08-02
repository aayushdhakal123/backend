const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

const hell = new Item({
  name: "Eat",
});
const hell2 = new Item({
  name: "Sleep",
});
const hell3 = new Item({
  name: "Repeat",
});
const defaultItems = [hell, hell2, hell3];

const insertDefaultItems = async () => {
  try {
    await Item.insertMany(defaultItems);
  } catch (err) {
    console.error("Error inserting default items:", err);
  }
};

insertDefaultItems().then(() => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});

app.get("/", async (req, res) => {
  try {
    const tasks = await Item.find();
    res.render("index", { tasks: tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    const taskName = req.body.task;
    const newItem = new Item({ name: taskName });
    await newItem.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const taskId = req.body.taskId;
    await Item.findByIdAndRemove(taskId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Internal Server Error");
  }
});
