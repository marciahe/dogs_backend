const { getAllDogs, searchDogsByName } = require("../handlers/getDogsHandler");

const getDogs = async (req, res) => {
  const name = req.query.name;
  try {
    const dogs = name ? await searchDogsByName(name) : await getAllDogs();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getDogs;
