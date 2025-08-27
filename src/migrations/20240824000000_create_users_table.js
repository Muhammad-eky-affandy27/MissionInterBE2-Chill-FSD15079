// Membuat tabel users untuk menyimpan data pengguna
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("fullname", 255).notNullable();
    table.string("username", 100).notNullable().unique();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.boolean("is_verified").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
