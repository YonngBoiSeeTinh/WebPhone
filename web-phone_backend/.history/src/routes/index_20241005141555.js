const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter); // Gán đường dẫn /api/user cho UserRouter
    app.use('/api/product', ProductRouter);
    app.use('/api/cart', CartRouter);
    app.use('/api/order', OrderRouter);
};
module.exports = routes;
