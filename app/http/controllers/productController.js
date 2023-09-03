const {UPDATE, DELETE, INSERT} = require('../../enums/message');
const SuccessResult = require('../../utils/SuccessResult');
const {uploadFile} = require('../../utils/firebase');
const productService = require('../services/productService');


async function list(req, res) {
  const data = await productService.list(req.query);
  return SuccessResult.make(res).send(data);
}

async function detail(req, res) {
  const data = await productService.details(req.params.id);
  return SuccessResult.make(res).send(data);
}

async function insert(req, res) {
  const body = req.fields;

  if (req.files.file) {
    const file = await uploadFile(req.files.file);
    body.image = file;
  }

  await productService.insert(body);
  return SuccessResult.make(res).sendMessage(INSERT);
}

async function update(req, res) {
  const body = req.fields;

  if (req.files.file) {
    const file = await uploadFile(req.files.file);
    body.image = file;
  }

  await productService.update(req.params.id, body);
  return SuccessResult.make(res).sendMessage(UPDATE);
}

async function destroy(req, res) {
  await productService.destroy(req.params.id);
  return SuccessResult.make(res).sendMessage(DELETE);
}

async function category(req, res) {
  const data =await productService.listCategory(req.params.id);
  return SuccessResult.make(res).send(data);
}

module.exports={
  list,
  detail,
  insert,
  update,
  destroy,
  category,
};
