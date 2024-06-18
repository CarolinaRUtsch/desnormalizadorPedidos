const fs = require('fs');
const path = require('path');

exports.parse = (filePath) => {
    const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const lines = data.split('\n');
    
    const userMap = new Map();

    lines.forEach(line => {
        if (line.trim() === '') return;  
        
        const userId = parseInt(line.substr(0, 10).trim(), 10);
        const userName = line.substr(10, 45).trim();
        const orderId = parseInt(line.substr(55, 10).trim(), 10);
        const productId = parseInt(line.substr(65, 10).trim(), 10);
        const value = parseFloat(line.substr(75, 12).trim());
        const date = line.substr(87, 8).trim();
        const formattedDate = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

        if (!userMap.has(userId)) {
            userMap.set(userId, { user_id: userId, name: userName, orders: [] });
        }

        const user = userMap.get(userId);
        let order = user.orders.find(o => o.order_id === orderId);

        if (!order) {
            order = { order_id: orderId, total: 0, date: formattedDate, products: [] };
            user.orders.push(order);
        }

        order.total += value;
        order.products.push({ product_id: productId, value });

        userMap.set(userId, user);
    });

    return Array.from(userMap.values());
};
