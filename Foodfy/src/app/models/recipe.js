const db = require('../../config/db.js')
const { date } = require('../../libs/utils')

module.exports = {
  all (callback) {
    db.query(`
    SELECT *
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    ORDER BY chefs.id
    `, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback(results.rows)
    })
  },
  find (callback) {
    return db.query(`
    SELECT *
    FROM chefs
    ORDER BY chefs.id
    `)
  },
  findByID (id) {
    return db.query(`
    SELECT *
    FROM recipes
    WHERE recipes.id = $1
    `, [id])
  },
  findChefRecipe (id) {
    return db.query(`
    SELECT chefs.id, chefs.name, recipes.chef_id
    FROM chefs
    INNER JOIN recipes
    ON chefs.id = recipes.chef_id
    WHERE recipes.id = $1
    ORDER BY chefs.id
    `, [id])
  },
  create (data, callback) {
    const query = `
    INSERT INTO recipes (
      chef_id,
      image_url,
      title,
      ingredients,
      preparation,
      information,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    const values = [
      data.chef_id,
      data.image_url,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]
    return db.query(query, values)
  },
  update (data, callback) {
    const query = `
    UPDATE recipes SET
      chef_id=($1),
      image_url=($2),
      title=($3),
      ingredients=($4),
      preparation=($5),
      information=($6)
      WHERE id = $7
    `
    const values = [
      data.chef_id,
      data.image_url,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]
    db.query(query, values, function (err, results) {
      const error = `Database error: ${err}`
      if (err) throw error
      callback()
    })
  },
  delete (id, callback) {
    db.query(`
      DELETE FROM recipes
      WHERE recipes.id = $1    
    `, [id], function (err) {
      const error = `Database error: ${err}`
      if (err) throw error
      return callback()
    })
  }
}
