const { default: axios } = require("axios");
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
         
        return res.json("Activity succefully created.")
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
async function getActivites1(req, res) {
    try {
        const actividades= await axios.get("http://localhost:3001/activity")
        return actividades.data
    } catch (error) {
        
    }
}
module.exports = { createActivity, getActivites, getActivites1 }