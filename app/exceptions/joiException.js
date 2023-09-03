// Execption when user not found

/**
 * @extends Error
 */
class JoiException extends Error {
  /**
   * @param  {string} message
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 406;
    this.msg = message.details.map((item)=> item.message) || [];
  }
  /**
   * Custom action when error happen
   */
  handle() {
    // this.message = this.message.map((item)=>item.message);
  }
}

module.exports = JoiException;
