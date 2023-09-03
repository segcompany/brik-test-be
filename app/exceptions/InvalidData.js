/**
 * @extends Error
 */
class InvalidData extends Error {
  /**
   * @param  {string} message
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 422;
    this.msg = 'Invalid Input Data! ' + message? message: '';
  }

  /**
   *
   * @param {*} err
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  handle(err, req, res, next) {
    // console.log('Use custom action here..');
  }
}

module.exports = InvalidData;
