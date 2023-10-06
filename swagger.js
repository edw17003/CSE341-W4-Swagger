const swaggerAutogen = require('swagger-autogen')();

const doc={
    info:{
        title: 'Contacts API',
        description: 'Collects and displays contact information'
    },
    host:'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile,endpointsFiles, doc);