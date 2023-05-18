const { Dog, Temperament } = require("../db");

const postDogHandler = async ({
  image,
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  life_span_min,
  life_span_max,
  temperament,
}) => {
  const existingDog = await Dog.findOne({
    where: {
      name,
    },
  });

  if (!existingDog) {
    const createDog = await Dog.create({
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span: life_span_min + " - " + life_span_max + " years",
    });

    //Estoy esperando temperaments como un array
    const temps = temperament.map((temp) => {
      return Temperament.findOne({
        where: {
          name: temp,
        },
      });
    });
    const temperaments = await Promise.all(temps);

    await createDog.setTemperaments(temperaments);

    // Carga los nombres de los temperamentos
    const tempsNames = (await createDog.getTemperaments()).map(
      (temp) => temp.name
    );

    // Crea un nuevo objeto que incluye los temperamentos como strings
    const dogWithTemps = {
      ...createDog.toJSON(),
      temperament: tempsNames,
    };

    return dogWithTemps;
  } else {
    throw new Error("There is already a dog with that name");
  }
};

module.exports = postDogHandler;
