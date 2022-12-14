const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./database");
const globalStatController = require("./controller/global-stat.controller");

async function launchSever() {
  const app = express();

  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({ message: "Hello CoronaBoard!" });
  });

  app.get("/global-stats", globalStatController.getAll);
  app.post("/global-stats", globalStatController.insertOrUpdate);
  app.delete("/global-stats", globalStatController.remove);

  try {
    await sequelize.sync();
    console.log("Database is ready!");
  } catch (error) {
    console.log(`Unable to connect to the database:${error}`);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}

launchSever();
