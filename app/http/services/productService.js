const DataNotFound = require('../../exceptions/DataNotFound');
const CategoryModel = require('../../models/categories');
const ProductModel = require('../../models/products');
const {deleteFile} = require('../../utils/firebase');
const {randomString} = require('../../utils/string');


async function list(query={}) {
  return await ProductModel.query().modify('list')
      .where((builder)=> {
        if (query.q) {
          builder.where('products.name', 'ilike', `%${query.q}%`);
        }
      })
      .page(query.page || 0, query.count||10);
}

async function details(id) {
  const data = await ProductModel.query().modify('list').findById(id);
  if (!data) {
    throw new DataNotFound();
  }
  return data;
}

async function insert(body) {
  const category = await findCategory(body.categoryName);

  return await ProductModel.query().insert({
    category_id: category.id,
    sku: randomString(6),
    name: body.name,
    description: body.description,
    weight: body.weight,
    width: body.width,
    length: body.length,
    height: body.height,
    price: body.price,
    image: body.image,
  });
}

async function update(id, body) {
  await details(id);
  const category = await findCategory(body.categoryName);
  return await ProductModel.query()
      .findById(id)
      .patch({
        category_id: category.id,
        name: body.name,
        description: body.description,
        weight: body.weight,
        width: body.width,
        length: body.length,
        height: body.height,
        price: body.price,
        image: body.image,
      });
}

async function destroy(id) {
  const product = await details(id);
  await ProductModel.query()
      .deleteById(id);
  await deleteFile(product.image);
}

async function findCategory(name) {
  let category = await CategoryModel.query().where('name', name).first();
  if (!category) {
    category = await CategoryModel.query().insertGraph({
      name,
    });
  }
  return category;
}

async function listCategory() {
  return await CategoryModel.query().modify('list').first();
}

module.exports={
  list,
  details,
  insert,
  update,
  destroy,
  findCategory,
  listCategory,
};
