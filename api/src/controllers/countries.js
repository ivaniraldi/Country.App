const { Country, Activity } = require("../db")
const axios = require("axios");
const { Op } = require("sequelize")
const sequelize = require("sequelize")


async function getCountries(req, res) {
    const { name } = req.query
    try {
        if (name) {
            const searched = await getCountriesByName(name)
            if (searched.length === 0) {
                return res.send("No se encontró ese país.")
            }
            return res.json(searched)
        }
        else {
            const response = await getAllCountries()
            return res.json(response)
        }
    } catch (error) {
        return error
    }

}

async function getApiCountries() {
    try {
        const apiCountries = await axios.get("https://restcountries.com/v3/all")
            .then(res => {
                return res.data[0].forEach(c => {
                    Country.findOrCreate({
                        where: {
                            id: c.cca3 || "No se encontró una id existente.",
                            name: c.name.common || "No se encontró ese país.",
                            flags: c.flags.find(e => e.includes(".svg")) || "No se encontró una imagen de la bandera.",
                            continent: c.region || "No se encontró relación con ningún continente.",
                            subregion: c.subregion || "No se encontró una subregión.",
                            capital: c.capital && c.capital[0] || "No se encontró una capital.",
                            area: c.area || 0,
                            population: c.population || 0
                        }
                    })
                });
            })
        return apiCountries

    } catch (e) {
        return e
    }
}

async function getAllCountries() {
    const countries = await Country.findAll({
        attributes: [
            "id",
            "name",
            "flags",
            "continent",
            "subregion",
            "capital",
            "area",
            "population",
        ],
        include: Activity
    })
    return countries
}
async function getCountriesByName(name) {
    const countries = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        attributes: [
            "id",
            "name",
            "flags",
            "continent",
            "subregion",
            "capital",
            "area",
            "population",
        ],
        include: Activity,
    })
    return countries
}

async function getCountriesId(req, res, next) {
    const { id } = req.params
    console.log(id)
    try {
        const idCase = id.toUpperCase()
        const country = await Country.findByPk(idCase, {
            attributes: [
                "id",
                "name",
                "flags",
                "continent",
                "subregion",
                "capital",
                "area",
                "population",
            ],
            include: Activity,
        })
        if (country) {
            return res.send(country)
        }
        else return res.send("No se encontró un país con esa id.")
    } catch (err) {
        next(err)
    }
}

module.exports = { getCountriesByName, getCountriesId, getAllCountries, getApiCountries, getCountries }
