import fs from "node:fs";
import path from "node:path";

interface Item {
  id: string;
  [key: string]: any;
}

type DataBase = { _total_additions: number } & Record<string, Item[]>;

const DB_FILE = path.join(__dirname, "../.simple-db.json");

function loadDB(): DataBase {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ _total_additions: 0 } as DataBase),
    );
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function saveDB(data: DataBase) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export default {
  getAll: (model: string) => loadDB()[model] ?? [],

  get: (model: string, id: string): Item | undefined =>
    (loadDB()[model] ?? []).find((item) => item.id === id),

  add: (model: string, item: Omit<Item, "id">) => {
    const db = loadDB();
    let dbTotalAdditions = db["_total_additions"] ?? 0;
    db[model] = db[model] ?? [];
    db[model].push({
      ...item,
      id: `simple-db-identifier-${++dbTotalAdditions}`,
    });
    db["_total_additions"] = dbTotalAdditions;
    saveDB(db);
    return db[model][db[model].length - 1];
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
