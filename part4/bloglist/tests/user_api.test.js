const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const saltRounds = 10;

beforeEach(async () => {
  await User.deleteMany({});

  let userObject = new User({
    name: "Joe Blow",
    username: "joeblow80",
    passwordHash: await bcrypt.hash("12345678", saltRounds),
  });
  await userObject.save();

  userObject = new User({
    name: "Jane Doe",
    username: "janedoe97",
    passwordHash: await bcrypt.hash("abcdefg", saltRounds),
  });
  await userObject.save();
});

/*
 * Both username and password must be given.
 * Both username and password must be at least 3 characters long.
 * The username must be unique.
 */
describe("when there is initially some users saved", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(2);
  });

  test("a specific user is within the returned users", async () => {
    const response = await api.get("/api/users");
    const names = response.body.map((r) => r.name);
    expect(names).toContain("Joe Blow");
  });
});

// describe("viewing a specific user", () => {
//   test("succeeds with a valid id", async () => {
//     const response = await api.get("/api/users");
//     const userToView = response.body[0];

//     const resultUser = await api
//       .get(`/api/users/${userToView.id}`)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     const processedUserToView = JSON.parse(JSON.stringify(userToView));

//     expect(resultUser.body).toEqual(processedUserToView);
//   });

//   test("fails with status code 400 when id is invalid", async () => {
//     const invalidId = "5a3d5da59070081a82a3445";

//     await api.get(`/api/users/${invalidId}`).expect(400);
//   });
// });

describe("addition of a new user", () => {
  test("succeeds with valid data", async () => {
    const newUser = {
      name: "John Smith",
      username: "jonhsmith84",
      password: "48htimshnoj",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(3);

    const names = usersAtEnd.map((u) => u.name);
    expect(names).toContain("John Smith");
  });

  test("fails with status code 400 if data is invalid", async () => {
    const newUser = {
      name: "John Smith",
      password: "48htimshnoj",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const response = await api.get("/api/users");
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(2);
  });

  test("fails with status code 400 if username is already taken", async () => {
    const newUser = {
      name: "Joe Blow",
      username: "joeblow80",
      password: "48htimshnoj",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const response = await api.get("/api/users");
    const usersAtEnd = response.body;
    expect(usersAtEnd).toHaveLength(2);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
