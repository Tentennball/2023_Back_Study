const {faker} = require('@faker-js/faker');

const makeFakeProduct = (seed,length) => {
    
    faker.seed(seed);
    const FakeProducts = Array.from({length:length},()=>{
        return {
            price: faker.commerce.price({min: 1,max:1000}),
            name: faker.commerce.productName(),
            seller: faker.person.fullName()
        }
    });
    
    return FakeProducts;
}

module.exports = makeFakeProduct;