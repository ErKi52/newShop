// definiert ein Sequelize-Modell für ein Product-Objekt,
// das die Struktur und die Felder der Product-Tabelle in der Datenbank bestimmt.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Export, um in anderen Teilen der Anwendung zu verwenden
// Produkte erstellen lesen, aktualisieren, löschen (CRUD)
module.exports = Product;
