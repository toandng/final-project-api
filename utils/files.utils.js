const fs = require("fs").promises;

const DB_FILE = "./db.json";
const RESOURCE = "comment";
async function readDb(resource, defaultValue = []) {
  try {
    const jsonDb = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(jsonDb)[resource] ?? null;
  } catch (error) {
    return {};
  }
}
readDb("comment").then((comment) => {});

async function writeFile(resource, data) {
  let db = {};
  try {
    const jsonDb = await fs.readFile(DB_FILE, "utf-8");
    db = JSON.parse(jsonDb);
  } catch (error) {}
  db[resource] = data;
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

writeFile("posts", [{ id: 1, comment: "Tiêu đề blog" }]);

module.exports = {
  readDb,
  writeFile,
};
