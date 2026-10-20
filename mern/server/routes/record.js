import express from "express";
import db from "../db/connection.js";      // our connected "employees" database
import { ObjectId } from "mongodb";        // turns an id string into MongoDB's id type

const router = express.Router();           // a mini-app for /record addresses

// GET /record → list all records
router.get("/", async (req, res) => {
  const collection = db.collection("records");
  const results = await collection.find({}).toArray(); // {} = no filter, get everything
  res.status(200).send(results);
});

// GET /record/:id → one record
router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid record ID" });
  }
  const collection = db.collection("records");
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (!result) return res.status(404).send("Not found");
  res.status(200).send(result);
});

// POST /record → create a record
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);
    res.status(201).json({ _id: result.insertedId, ...newDocument });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// PATCH /record/:id → update a record
router.patch("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }
    const updates = {
      $set: {                                // $set = change only these fields
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    const collection = db.collection("records");
    const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// DELETE /record/:id → delete a record
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }
    const collection = db.collection("records");
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;                     // ← the line server.js was looking for