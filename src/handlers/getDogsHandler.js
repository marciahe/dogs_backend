const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const { Sequelize, Op } = require("sequelize");
const { cleanAPI, cleanDB } = require("../utils/dataCleaners");

const { BREEDS_API_URL, API_KEY } = process.env;

const getAllDogs = async () => {
  const responseDB = await Dog.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const dogsInDB = cleanDB(responseDB);

  const response = await axios.get(`${BREEDS_API_URL}?api_key=${API_KEY}`);
  const dogsInAPI = cleanAPI(response.data);

  return [...dogsInDB, ...dogsInAPI];
};

const searchDogsByName = async (name) => {
  const nameLow = name.toLowerCase();

  const dogsInDB = await Dog.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: Sequelize.literal(
          `(SELECT id FROM "dogs" WHERE LOWER(name) LIKE '%${nameLow}%')`
        ),
      },
    },
    include: [
      {
        model: Temperament,
        attributes: ["name"],
      },
    ],
  });

  const cleanDogsDB = cleanDB(dogsInDB);

  const response = await axios.get(`${BREEDS_API_URL}?api_key=${API_KEY}`);
  const dogsInAPI = cleanAPI(response.data);
  const dogsFiltered = dogsInAPI.filter((dog) =>
    dog.name.toLowerCase().includes(nameLow)
  );
  return [...cleanDogsDB, ...dogsFiltered];
};

module.exports = { getAllDogs, searchDogsByName };
