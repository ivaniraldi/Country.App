const { Country, Activity } = require("../db")
const axios = require("axios");

async function getCountries(req, res, next) { //si nos manda por query elñ name buscamos name y tmnm trae todo los country 
    const { name } = req.query //el name q nos llega x query
    try {
        const savedCountries = await Country.findAll() //en esta variable tenemos todo lo de la db
        if (savedCountries.length > 0) {
            if (name) {//el name q pasan x query 
                const filteredCountries = []
                savedCountries.map(c => { //mapeamos respuesta de la db (findall)
                    if (c.name.toLowerCase().includes(name.toLowerCase())) //por las dudas q este con mayus le preg si incluye el name q nos pasan x query
                    filteredCountries.push(c) // gusrdamos el nombre x query

                })
                return res.send(filteredCountries) // y lo mandamos x res
            }
            else return res.send(savedCountries) // y sino retornamos lo de la db

        }
        else {
            var response = await axios.get("https://restcountries.com/v3/all")
            var allCountries = response.data.map(c => {//mapea y guarda array completo de paises
                return {
                    name: c.name.common || "No se encontró ese país.",
                    id: c.cca3 || "No se encontró una id existente.",
                    flags: c.flags.find(e => e.includes(".svg")) || "No se encontró una imagen de la bandera.",
                    continent: c.region || "No se encontró relación con ningún continente.",
                    subregion: c.subregion || "No se encontró una subregión.",
                    capital: c.capital && c.capital[0] || "No se encontró una capital.",
                    area: c.area || 0
                }
            })
            var countriesDb = await Country.bulkCreate(allCountries)//hace una seccion para cada country con cada posicion del array allcountries en la db

            //
            // SI ANTES NO ESTABA AHORA SI 
            //

            if (name) {//el name q pasan x query 
                const filteredCountries = []
                savedCountries.map(c => { //mapeamos respuesta de la db (findall)
                    if (c.name.toLowercase().includes(name.toLowercase)) {//por las dudas q este con mayus le preg si incluye el name q nos pasan x query
                        filteredCountries.push(c) // gusrdamos el nombre x query
                    }
                })
                return res.send(filteredCountries) // y lo mandamos x res
            }
            else return res.send(countriesDb)
        }
    } catch (err) {
        next(err)
    }
}

async function getCountriesId(req, res, next){
    const id = req.params.id.toUpperCase(); //lo pasamos a mayus x las dudas y lo guardamos en id
    try {
        var country = await Country.findAll({//lo busca en la db con la id 
            where: {
                id: id
            },
            include: {//para q cuando lo busq por id incluya la actividad
                model: Activity,
                trough: {attributes: []}
            }
        })
        if(country){
            return res.send(country)//si hay un country me lo envias
        }
        else return res.send("No se encontró un país con esa id.")
    } catch (err) {
        next(err)    
    }
}

module.exports = { getCountries, getCountriesId }
