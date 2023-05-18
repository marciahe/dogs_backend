require("dotenv").config();
const { Temperament } = require("../db");

const returnTemperaments = async () => {
  const temperaments = await Temperament.findAll();

  const cleanTemps = temperaments.map(({ dataValues: { id, name } }) => ({
    id,
    name,
  }));

  return cleanTemps;
};

module.exports = { returnTemperaments };
