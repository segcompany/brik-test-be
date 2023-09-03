const express = require('express');
const routes = new express.Router();
const version = process.env.VERSION_CONTROL || 'v1';

const productController = require('../app/http/controllers/productController');
const {handlerException} = require('../app/exceptions/handler');
const {auth} =require('../app/http/middleware/auth');
const parseForm = require('../app/http/middleware/formidable');
const {producteValidation} = require('../app/validations/productValidation');

/* GET home page. */
routes.group('/api/'+version+'/product', (router)=> {
  router.get('/category',
      auth(),
      handlerException(productController.category),
  );

  router.get('/',
      auth(),
      handlerException(productController.list),
  );

  router.post('/',
      auth(),
      parseForm(),
      handlerException(producteValidation),
      handlerException(productController.insert),
  );

  router.get('/:id',
      auth(),
      handlerException(productController.detail),
  );

  router.patch('/:id',
      auth(),
      parseForm(),
      handlerException(producteValidation),
      handlerException(productController.update),
  );

  router.delete('/:id',
      auth(),
      handlerException(productController.destroy),
  );
});
module.exports = routes;
