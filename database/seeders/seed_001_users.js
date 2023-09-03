const {generatePassword} = require('../../app/utils/string');

exports.seed = async function(knex) {
  await knex('users').insert([
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: generatePassword('123456'),
    },
  ]);
};
