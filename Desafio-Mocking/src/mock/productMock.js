import faker from '@faker-js/faker';


const productMock = () => {
    const products = [];
    for (let index = 0; index < 100; index++) {
        products.push({
            title: faker.commerce.productName(),
            category: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.urlLoremFlickr({ category: 'abstract' }),
            code: faker.string.alphanumeric(),
            stock: faker.number.int({ min: 1, max: 100 })
        });
    }
    return products;
};

export {
    productMock
}