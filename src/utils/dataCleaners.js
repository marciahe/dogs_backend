function cleanAPI(arr) {
  const clean = arr.map((dog) => ({
    id: dog.id,
    name: dog.name,
    image: dog.image.url,
    heightMin: dog.height.metric?.match(/^\d+/)?.[0] ?? "",
    heightMax: dog.height.metric?.match(/\d+$/)?.[0] ?? "",
    weightMin: dog.weight.metric?.match(/^\d+/)?.[0] ?? "",
    weightMax: dog.weight.metric?.match(/\d+$/)?.[0] ?? "",
    life_span: dog.life_span,
    createdByUser: false,
    temperaments: dog.temperament ? dog.temperament.split(", ") : [],
  }));

  return clean;
}

function cleanDB(arr) {
  const clean = arr.map((dog) => {
    const temperaments = dog.temperaments.map((temp) => temp.name);
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      heightMin: dog.heightMin,
      heightMax: dog.heightMax,
      weightMin: dog.weightMin,
      weightMax: dog.weightMax,
      life_span: dog.life_span,
      createdByUser: dog.createdByUser,
      temperaments,
    };
  });
  return clean;
}

function cleanDBForGetById(id, arr) {
  const temperaments = arr.temperaments.map((temp) => temp.name);
  const clean = {
    id,
    name: arr.name,
    image: arr.image,
    heightMin: arr.heightMin,
    heightMax: arr.heightMax,
    weightMin: arr.weightMin,
    weightMax: arr.weightMax,
    life_span: arr.life_span,
    createdByUser: arr.createdByUser,
    temperaments,
  };

  return clean;
}

function cleanAPIForGetById(
  id,
  name,
  reference_image_id,
  height,
  weight,
  life_span,
  temperament
) {
  const apiCleanResponse = {
    id,
    name,
    image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
    heightMin: height.metric?.match(/^\d+/)?.[0] ?? "",
    heightMax: height.metric?.match(/\d+$/)?.[0] ?? "",
    weightMin: weight.metric?.match(/^\d+/)?.[0] ?? "",
    weightMax: weight.metric?.match(/\d+$/)?.[0] ?? "",
    life_span,
    createdByUser: false,
    temperament: temperament ? temperament.split(", ") : [],
  };

  return apiCleanResponse;
}

module.exports = { cleanAPI, cleanDB, cleanDBForGetById, cleanAPIForGetById };
