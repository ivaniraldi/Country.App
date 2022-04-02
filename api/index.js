//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const { default: axios } = require("axios")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  axios.get("https://restcountries.com/v3/all")
        .then(res => {
            return res.data.forEach(c => {
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
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
