const orderService = require('../services/orderService');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Arquivo não fornecido' });
        }
        const result = await orderService.processFile(req.file.path);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const filters = {
            order_id: req.query.order_id,
            start_date: req.query.start_date,
            end_date: req.query.end_date,
        };
        const orders = await orderService.getOrders(filters);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
