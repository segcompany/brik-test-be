const axios = require('axios');
const {randomString, generateRandomNumber} = require('../../app/utils/string');

exports.seed = async function(knex) {
  const {data} = await axios.get('https://dummyjson.com/products?limit=100');
  const productInsert = [];
  for (const item of data.products) {
    let categories = await knex('categories')
        .where('name', item.category)
        .first();

    if (!categories) {
      await knex('categories').insert({
        name: item.category,
      });

      categories = await knex('categories')
          .where('name', item.category)
          .first();
    }
    productInsert.push({
      category_id: categories.id,
      sku: randomString(6),
      name: item.title,
      description: item.description,
      weight: generateRandomNumber(100, 1000),
      width: generateRandomNumber(100, 1000),
      length: generateRandomNumber(100, 1000),
      height: generateRandomNumber(100, 1000),
      price: item.price * 15000,
      image: item.thumbnail,
    });
  }

  await knex('products').insert(productInsert);
};
