export async function up(sql) {
  await sql`
    CREATE TABLE roles (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      role_name varchar(30) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE roles
  `;
}
