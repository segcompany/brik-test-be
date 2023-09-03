const express = require('express');
const routes = new express.Router();
const version = process.env.VERSION_CONTROL || 'v1';

const fileUploadController = require('../app/http/controllers/fileUploadController');
const {handlerException} = require('../app/exceptions/handler');
const parseForm = require('../app/http/middleware/formidable');

/* GET home page. */
routes.group('/api/'+version+'/upload', (router)=> {
  router.post('/',
      parseForm(),
      handlerException(fileUploadController.upload),
  );

  router.delete('/',
      handlerException(fileUploadController.destroy),
  );
});
module.exports = routes;
