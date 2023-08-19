require('dotenv').config();

const firebase = require('../model/firebase');
const faker = require('../util/getFaker');

module.exports = {
    controller: async (req, res) => {
        try {
            const result = await firebase('product', 'get');
            const idx = faker.number.int(99);
            const { seller, price, name } = result.data[idx];
            orderId = faker.string.uuid();
            res.send({ seller, price, name, orderId })
        }
        catch (e) { console.log(e) }
    }
}