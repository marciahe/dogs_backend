const { returnTemperaments } = require("../handlers/temperamentsHandler");

const getTemperaments = async (req, res) => {
  try {
    const temps = await returnTemperaments();
    res.status(200).json(temps);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getTemperaments;
