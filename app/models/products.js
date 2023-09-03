const {Model, raw} = require('objection');
const knex = require('./knex');
const objectionSoftDelete = require('objection-js-soft-delete');

Model.knex(knex);

/**
 * Define Soft Delete Module
 */
const softDelete = objectionSoftDelete.default({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

/**
 * @extends Model
 */
class ProductModel extends softDelete(Model) {
  /**
   * create action before insert in database
   */
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  /**
   * create action before update in database
   */
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  /**
   * It returns table name
   * @return {string} The table name
   */
  static get tableName() {
    return 'products';
  }

  static get modifiers() {
    /**
     * Return minimum column
     * @param  {any} query
     */
    return {
      list(query) {
        query.select(
            'products.id',
            'category_id as categoryId',
            'categories.name as categoryName',
            'sku',
            'products.name',
            'description',
            raw('weight::float').as('weight'),
            raw('width::float').as('width'),
            raw('length::float').as('length'),
            raw('height::float').as('height'),
            'image',
            raw('price::float').as('price'),
        )
            .leftJoin('categories', 'categories.id', 'products.category_id')
            .whereNull('products.deleted_at');
      },
    };
  }


  static table = this.tableName;

  /**
   * Define relation
   * @return {Object}
   */
  static relationMappings() {
    return {
    };
  }
}

module.exports = ProductModel;
