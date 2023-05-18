const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const {
  cleanDBForGetById,
  cleanAPIForGetById,
} = require("../utils/dataCleaners");

const { BREEDS_API_URL, API_KEY } = process.env;

const getDogsByIdHandler = (id) => {
  if (isNaN(id)) {
    return getDB(id);
  } else {
    return getAPI(id);
  }
};

async function getDB(id) {
  const dbResponse = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  });

  return cleanDBForGetById(id, dbResponse);
}

async function getAPI(id) {
  const responseAPI = await axios.get(
    `${BREEDS_API_URL}${id}?api_key=${API_KEY}`
  );
  const { name, reference_image_id, height, weight, life_span, temperament } =
    responseAPI.data;
  return cleanAPIForGetById(
    id,
    name,
    reference_image_id,
    height,
    weight,
    life_span,
    temperament
  );
}

module.exports = getDogsByIdHandler;
