const firebase = require('../model/firebase');
const faker = require('../util/getFaker');

const getTestingProduct = async (number) => {
    const result = await firebase('product', 'get');
    // if (result.data !== null) return []

    faker.seed(number);

    const arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            seller: faker.company.name(),
        })
    }

    return arr;
}

module.exports = {
    controller: async (req, res) => {
        try {
            const data = await getTestingProduct(req.body.number);
            // console.log(data)
            await firebase('product', 'put', data);
            res.send(data);
        }
        catch (e) { console.log(e) }
    }
}