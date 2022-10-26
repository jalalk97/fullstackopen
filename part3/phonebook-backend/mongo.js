const mongoose = require("mongoose");

const usage = "Error: Usage: node mongo.js <password> [<name> <number>]";

if (process.argv.length < 3) {
  console.log(usage);
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.umfr3nf.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  });
} else if (process.argv.length == 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({ name, number });
      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log(usage);
  process.exit(1);
}
