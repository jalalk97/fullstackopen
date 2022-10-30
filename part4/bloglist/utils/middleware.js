const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  const authorization = request.header("authorization");

  if (!authorization || !authorization.toLowerCase().includes("bearer")) {
    return response.status(401).json({
      error: "token is missing or invalid",
    });
  }

  const token = authorization.substring(7);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({
      error: "token is missing or invalid",
    });
  }

  request.user = await User.findById(decodedToken.id);

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
