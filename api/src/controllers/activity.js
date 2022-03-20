const { Country, Activity } = require("../db")

async function createActivity(req, res, next){
    const { name, difficulty, season, duration, countryName } = req.body;//lo q nos llega del form
    try {
        var newActivity = await Activity.create({//me crea la actividad en la tabla con los atributos del form menos el selector de country
            name,
            difficulty,
            season,
            duration
        })
        const countryDB = await Country.findOne({//aca me busca el pais por el name (del form) en la db, 
            where: {name: countryName}
        })
        await newActivity.addCountry(countryDB)//a la actividad q cree le agrega el pais q llego del form
        res.send(newActivity)
    } catch (err) {
        next(err)    
    }
}

module.exports = { createActivity }