const orderRepository = require('../repositories/orderRepository');
const fileParser = require('../utils/fileParser');

exports.processFile = async (filePath) => {
    const orders = fileParser.parse(filePath);
    await orderRepository.saveOrders(orders);
    return orders;
};

exports.getOrders = async (filters) => {
    return orderRepository.getOrders(filters);
};
