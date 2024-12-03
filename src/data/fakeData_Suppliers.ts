import { faker } from '@faker-js/faker';

export const generateFakeSupplierData = () => {
  return {
    name: faker.company.name(),
    product: faker.commerce.productName(),
    email: faker.internet.email(),
    active: faker.number.int({ min: 0, max: 1 }),
    categories: [faker.commerce.department()],
    price: parseFloat(faker.commerce.price()),
    contact: faker.phone.number(),
    isTaking: faker.datatype.boolean() ? 1 : 0,
    photoUrl: faker.image.avatar(),
  };
};