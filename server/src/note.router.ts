import { Router } from "express";
import database from "../../simple-db/src";
import { checkIfExists } from "./middleware/utils";

const noteRouter = Router();

const NOTE_MODEL = "note";

noteRouter.get("/note", (req, res) => {
  res.status(200).json({ data: database.getAll(NOTE_MODEL) });
});

noteRouter.get("/note/:id", checkIfExists(NOTE_MODEL), (req, res) => {
  const id = req.params.id;
  res.status(200).json({ data: database.get(NOTE_MODEL, id) });
});

noteRouter.post("/note", (req, res) => {
  const { title, text } = req.body;
  res.status(200).json({ data: database.add(NOTE_MODEL, { title, text }) });
});

noteRouter.delete("/note/:id", checkIfExists(NOTE_MODEL), (req, res) => {
  const id = req.params.id;
  const data = database.get(NOTE_MODEL, id);
  database.delete(NOTE_MODEL, id);
  res.status(200).json({ data });
});

export default noteRouter;
