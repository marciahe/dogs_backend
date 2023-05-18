const postDogHandler = require("../handlers/postDogHandler");

const postDog = async (req, res) => {
  try {
    const {
      image,
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span_min,
      life_span_max,
      temperament,
    } = req.body;

    const result = await postDogHandler({
      image,
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span_min,
      life_span_max,
      temperament,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = postDog;
