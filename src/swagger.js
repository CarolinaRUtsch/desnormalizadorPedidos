const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/orderRoutes.js'];

const doc = {
    info: {
        title: 'API de Pedidos',
        description: 'API para processar e consultar pedidos',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        Order: {
            user_id: 1,
            name: "User Name",
            orders: [
                {
                    order_id: 1,
                    total: 100.00,
                    date: "2023-01-01",
                    products: [
                        {
                            product_id: 1,
                            value: 50.00
                        }
                    ]
                }
            ]
        }
    },
    tags: [
        {
            name: "Orders",
            description: "API para gerenciar pedidos"
        }
    ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
