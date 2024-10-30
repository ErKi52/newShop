const { Sequelize } = require("sequelize");

// Neue Verbindung zu SQLite-Datenbank erstellen
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Speicherort für die SQLite-Datei
});

sequelize
  .authenticate()
  .then(() => console.log("Datenbankverbindung erfolgreich hergestellt."))
  .catch((err) => console.error("Fehler bei der Datenbankverbindung:", err));

module.exports = sequelize;
