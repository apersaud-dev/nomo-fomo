
exports.up = function(knex) {
  return knex.schema
    .createTable('events', (table) => {
        table.increments('id').primary();
        table.string('').notNullable();

    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('events').dropTable('businesses');
};
