const orderService = require('../../src/services/orderService');
const orderRepository = require('../../src/repositories/orderRepository');
const fileParser = require('../../src/utils/fileParser');
const fs = require('fs');

jest.mock('../../src/repositories/orderRepository');
jest.mock('../../src/utils/fileParser');
jest.mock('fs');

describe('Order Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should process file and save orders', async () => {
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

        fileParser.parse.mockReturnValue(mockOrders);
        fs.readFileSync.mockReturnValue('mock file content');

        await orderService.processFile('path/to/file.txt');

        expect(fileParser.parse).toHaveBeenCalledWith('path/to/file.txt');
        expect(orderRepository.saveOrders).toHaveBeenCalledWith(mockOrders);
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

        orderRepository.getOrders.mockReturnValue(mockOrders);

        const filters = { order_id: 1, start_date: '2023-01-01', end_date: '2023-12-31' };
        const orders = await orderService.getOrders(filters);

        expect(orderRepository.getOrders).toHaveBeenCalledWith(filters);
        expect(orders).toEqual(mockOrders);
    });
});
