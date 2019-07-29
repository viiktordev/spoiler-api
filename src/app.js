const http = require('http');
const express = require('express');
const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database');

const app = express();

app.use(express.json());

app.use('/api', spoilersRoute);

app.use((req, resp, next) => {
    resp.status(404).send();
});

app.use((error, req, resp, next) => {
    resp.status(500).json({error});
});


sequelize.sync({ force : false }).then(() => {
    const port = 3000;
    const hostname = 'localhost';
    
    app.set('port', port);
    
    const server = http.createServer(app);
    
    server.listen(port,hostname, () => {
        console.log(`Servidor em execução em http://${hostname}:${port}`);
    });
});
