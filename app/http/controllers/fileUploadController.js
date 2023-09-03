const SuccessResult = require('../../utils/SuccessResult');
const {uploadFile, deleteFile} = require('../../utils/firebase');


async function upload(req, res) {
  const file = await uploadFile(req.files.file);
  return SuccessResult.make(res).send(file);
}

async function destroy(req, res) {
  const file = await deleteFile(req.body.file);
  return SuccessResult.make(res).send(file);
}


module.exports={
  upload,
  destroy,
};
