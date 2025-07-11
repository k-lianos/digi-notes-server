import express from "express";
import server from "./server";

server.get("/", (req, res) => {
  res.send("Welcom to my amazing notes app");
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
