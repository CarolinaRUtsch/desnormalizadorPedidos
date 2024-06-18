// tests/controllers/orderController.test.js
const orderController = require('../../src/controllers/orderController');
const orderService = require('../../src/services/orderService');

jest.mock('../../src/services/orderService');

describe('Order Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            file: {
                path: 'path/to/file.txt'
            },
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should upload file and process it', async () => {
        orderService.processFile.mockResolvedValue('mock result');

        await orderController.uploadFile(req, res, next);

        expect(orderService.processFile).toHaveBeenCalledWith('path/to/file.txt');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('mock result');
    });

    it('should get orders with filters', async () => {
        const mockOrders = [
            {
                user_id: 1,
                name: 'User 1',
                orders: [
                    {
                        order_id: 1,
                        total: 100.0,
                        date: '2023-01-01',
                        products: [
                            {
                                product_id: 1,
                                value: 50.0
                            }
                        ]
                    }
                ]
            }
        ];

        orderService.getOrders.mockResolvedValue(mockOrders);

        req.query = { order_id: 1, start_date: '2023-01-01', end_date: '2023-12-31' };

        await orderController.getOrders(req, res, next);

        expect(orderService.getOrders).toHaveBeenCalledWith(req.query);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockOrders);
    });
});
