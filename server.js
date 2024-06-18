const express = require('express');
const orderRoutes = require('./src/routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const swagger = require('./src/swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/orders', orderRoutes);

const startServer = () => {
    const swagger = require('./src/swagger_output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

if (fs.existsSync('./src/swagger_output.json')) {
    startServer();
} else {
    console.log('Swagger output file not found, generating...');
    generateSwagger().then(startServer);
}
