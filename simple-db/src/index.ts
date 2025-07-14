import fs from "node:fs";
import path from "node:path";

interface Item {
  id: string;
  [key: string]: any;
}

type DataBase = Record<string, Item[]>;

const DB_FILE = path.join(__dirname, "../.simple-db.json");

function loadDB(): DataBase {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}));
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function saveDB(data: DataBase) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export default {
  getAll: () => loadDB(),

  get: (model: string, id: string): Item | undefined =>
    loadDB()[model].find((item) => item.id === id),

  add: (model: string, item: Omit<Item, "id">) => {
    const db = loadDB();
    db[model] = db[model] ?? [];
    db[model].push({ ...item, id: db[model].length.toString() });
    saveDB(db);
  },

  update: (model: string, id: string, item: Item) => {
    const db = loadDB();
    const index = db[model].findIndex((item) => item.id === id);
    if (index !== -1) {
      db[index] = { ...db[index], ...item };
      saveDB(db);
    }
  },

  delete: (model: string, id: string) => {
    const db = loadDB();
    db[model] = db[model].filter((item) => item.id !== id);
    saveDB(db);
  },
};
