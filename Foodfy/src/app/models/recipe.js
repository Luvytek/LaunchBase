const db = require('../../config/db.js')

module.exports = {
  all (callback) {
    db.query(`
  SELECT recipes.*
  FROM recipes
  ORDER BY recipes.id
  `, function (err, results) {
      if (err) throw `Database error: ${err}`

      callback(results.rows)
    })
  }
}
