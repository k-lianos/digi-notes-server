import { Router } from "express";

const noteRouter = Router();

noteRouter.get("/note", () => {});
noteRouter.get("/note/:id", () => {});
noteRouter.put("/note", () => {});
noteRouter.delete("/note/:id", () => {});

export default noteRouter;
