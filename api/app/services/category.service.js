const db = require('./db');
/* const helper = require('../../config/helper.js');
const config = require('../../config/db.config'); */

async function getMultiple(){
  const category = await db.query(`SELECT * FROM categoria`);
  return category;
}

module.exports = {
  getMultiple,
}