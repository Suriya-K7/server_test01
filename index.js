// express
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "backend server using Nodejs",
    important: true,
  },
  {
    id: 2,
    content: "backend restful using nodejs will grow complex",
    important: false,
  },
  {
    id: 3,
    content: "express makes backend restful painless",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

// getting full data

app.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
});

// posting data

app.post("/api/notes", (req, res) => {
  notes = notes.concat(req.body);
  res.status(201).json({ message: "post request completed" });
});

// getting data of particular id

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id == id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

// delete data of particular id

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id == id);
  notes = notes.filter((note) => note.id != id);
  if (note) {
    res.status(204).json(note);
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

// put data of particular id

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const updatedNote = req.body;
  const note = notes.find((note) => note.id == id);
  notes = notes.map((note) => (note.id == id ? updatedNote : note));
  if (note) {
    res.status(200).json({ message: "updated" });
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

// patching data of particular id

app.patch("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const updatedNote = req.body;
  const note = notes.find((note) => note.id == id);
  notes = notes.map((note) =>
    note.id == id ? { ...note, ...updatedNote } : note
  );
  if (note) {
    res.status(200).json({ message: "updated for particular data" });
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

app.listen(3001, () => {
  console.log("server running in port no 3001");
});
