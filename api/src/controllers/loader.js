const { default: axios } = require("axios")
const { Activity } = require("../db")


const getCountries1 = async (Country) => {
  try {
    const apiResponse = await axios.get("https://restcountries.com/v3/all")
    const apiCountries = apiResponse.data

    for (let i = 0; i < apiCountries.length; i++) {
      const country = apiCountries[i]
      const addCountry = {
        id: country.cca3 || "No se encontró una id existente.",
        name: country.name.common || "No se encontró ese país.",
        flags: country.flags.find(e => e.includes(".svg")) || "No se encontró una imagen de la bandera.",
        continent: country.region || "No se encontró relación con ningún continente.",
        subregion: country.subregion || "No se encontró una subregión.",
        capital: country.capital && country.capital[0] || "No se encontró una capital.",
        area: country.area || 0,
        population: country.population || 0
      }
      try {
        Country.findOrCreate({
          where: {
            name: addCountry.name
          },
          defaults: addCountry,
          include: Activity
        })

        // console.log('▄'.green, addCountry.name, 'Cargado correctamente'.green)
      } catch (err) {
        console.log(err)
      }
    }
    console.log(`${apiCountries.length} paises cargados correctamente`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = getCountries1