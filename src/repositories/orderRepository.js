let orders = [];

exports.saveOrders = async (newOrders) => {
    orders = [...orders, ...newOrders];
};

exports.getOrders = async (filters) => {
    let filteredOrders = orders;

    if (filters.order_id) {
        const orderId = parseInt(filters.order_id, 10);
        filteredOrders = filteredOrders.map(user => ({
            ...user,
            orders: user.orders.filter(order => order.order_id === orderId)
        })).filter(user => user.orders.length > 0);
    }

    if (filters.start_date && filters.end_date) {
        const startDate = new Date(filters.start_date);
        const endDate = new Date(filters.end_date);
        filteredOrders = filteredOrders.map(user => ({
            ...user,
            orders: user.orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate && orderDate <= endDate;
            })
        })).filter(user => user.orders.length > 0);
    }

    return filteredOrders.map(user => ({
        ...user,
        user_id: user.user_id,
        orders: user.orders.map(order => ({
            ...order,
            order_id: order.order_id,
            total: parseFloat(order.total.toFixed(2)),
            date: order.date,
            products: order.products.map(product => ({
                ...product,
                product_id: product.product_id,
                value: parseFloat(product.value.toFixed(2))
            }))
        }))
    }));
};
