const axios = require("axios");
require("dotenv").config();
const { Temperament } = require("../db");
const { returnTemperaments } = require("../handlers/temperamentsHandler");

const { BREEDS_API_URL, API_KEY } = process.env;

const checkTemperamentsLoaded = async (req, res, next) => {
  try {
    const temperaments = await returnTemperaments();
    if (temperaments.length > 0) {
      next();
    } else {
      await createTemperaments();
      next();
    }
    console.log("Went through the middleware correctly");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Middleware: Error while creating Temperaments" });
  }
};

const createTemperaments = async () => {
  const response = await axios.get(`${BREEDS_API_URL}?api_key=${API_KEY}`);
  const breeds = response.data;
  const temperamentsSet = new Set();

  breeds.forEach((breed) => {
    if (breed.temperament) {
      breed.temperament.split(",").forEach((temp) => {
        temperamentsSet.add(temp.trim());
      });
    }
  });

  const temperamentsArray = Array.from(temperamentsSet);
  const createdTemperaments = await Temperament.bulkCreate(
    temperamentsArray.map((temp) => ({ name: temp }))
  );
  console.log("Temperaments were created");
  return createdTemperaments;
};

module.exports = checkTemperamentsLoaded;
