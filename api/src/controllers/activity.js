const { Country, Activity } = require("../db")

async function createActivity(req, res, next){
    const { name, difficulty, season, duration, countryName } = req.body;
    try {
         newActivity = await Activity.create({
            name: name,
            difficulty: difficulty,
            season: season,
            duration: duration,
        })
        countryName.forEach(async (e) => {  
            const activityCountry = await Country.findOne({
                where: {name: e}
            })
            await newActivity.addCountry(activityCountry)
        });
         
        return res.json("La actividad se ha creado correctamente")
    } catch (err) {
        next(err)    
    }
}
async function getActivites(req, res) {
    try {
        let act = await Activity.findAll({
            include: [Country]
        })
        if(act.length !== 0){
            res.json(act)
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports = { createActivity, getActivites }