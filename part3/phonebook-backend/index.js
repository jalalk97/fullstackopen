const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token("payload", (req, res) => {
  return JSON.stringify(req.body);
});
morgan.format(
  "tiny-with-payload",
  ":method :url :status :res[content-length] - :response-time ms :payload"
);
app.use(morgan("tiny", {
  skip: (req, res) => req.method === "POST",
}));
app.use(morgan("tiny-with-payload", {
  skip: (req, res) => req.method !== "POST",
}));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((note) => note.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
  } while (persons.find((person) => person.id === id));
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  if (persons.find((person) => person.name == body.name)) {
    return response.status(400).json({
      error: `name must be unique`,
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  response.status(201).json(person);
});

app.get("/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${Object.keys(persons).length} people</p>
        <p>${Date()}</p>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
