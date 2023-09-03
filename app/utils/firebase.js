require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const {randomString} = require('./string');
const STORAGE = 'perhitunganair.appspot.com';
const LINK = 'https://firebasestorage.googleapis.com/v0/b/';
const {v4} =require('uuid');


async function uploadFile(file) {
  const storage = new Storage({
    keyFilename: 'firebase-key.json',
  });

  const uuid = v4();

  const donloadPath =`${LINK}${STORAGE}/o/`;
  const name = randomString(10)+'.'+file.mimetype.split('/')[1];
  const bucket = storage.bucket('gs://'+STORAGE);
  const result = await bucket.upload(file.filepath, {
    destination: `files/${name}`,
    resumable: true,
    metadata: {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  });


  return donloadPath + encodeURIComponent(result[0].name) +'?alt=media&token=' +uuid;
}

async function deleteFile(url) {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;

  const parts = pathname.split('/');
  const filenameWithEncoding = parts[parts.length - 1];

  const filePath = decodeURIComponent(filenameWithEncoding);

  const storage = new Storage({
    keyFilename: 'firebase-key.json',
  });

  const bucket = storage.bucket(STORAGE);

  try {
    return await bucket.file(filePath).delete();
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  uploadFile,
  deleteFile,
};
