const getDogsByIdHandler = require("../handlers/getDogsByIdHandler");

const getDogsById = async (req, res) => {
  const { id } = req.params;
  try {
    const dogsId = await getDogsByIdHandler(id);
    res.status(200).json(dogsId);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getDogsById;
