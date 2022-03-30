const express = require('express');
const cors = require('cors');
const { PORT } = require('./config')
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');


start();

async function start() {
    const app = express();

    app.use(cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }));

    //OR:
    // app.use((req, res, next)=> {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    //     next();
    // });

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    // app.get('/', (req, res) => res.send('It works!'));

    app.listen(PORT, () => {
        console.log(`Application started at http://localhost:${PORT}`);
    });
};