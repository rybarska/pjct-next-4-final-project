export async function up(sql) {
  await sql`
    CREATE TABLE accounts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      account_name varchar(30) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE accounts
  `;
}
