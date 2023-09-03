const tableName = 'products';
exports.up = async function(knex) {
  await knex.schema.createTable(tableName, (table)=> {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('category_id').references('id').inTable('categories');
    table.string('sku', 10);
    table.string('name');
    table.text('description');
    table.decimal('weight', 8, 2);
    table.decimal('width', 8, 2);
    table.decimal('length', 8, 2);
    table.decimal('height', 8, 2);
    table.decimal('price', 15, 2);
    table.text('image');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};


exports.down = function(knex) {
};
