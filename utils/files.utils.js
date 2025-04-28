const fs = require("fs").promises;

const DB_FILE = "./db.json";

async function readDb(resource, defaultValue = []) {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    const db = JSON.parse(data);
    return db[resource] || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

async function writeDb(resource, data) {
  let db = {};
  try {
    const jsonDb = await fs.readFile(DB_FILE, "utf-8");
    db = JSON.parse(jsonDb);
  } catch (error) {}

  db[resource] = data;
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

module.exports = {
  readDb,
  writeDb,
};
