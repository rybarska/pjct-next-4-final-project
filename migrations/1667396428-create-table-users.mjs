export async function up(sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(90) NOT NULL UNIQUE,
      password_hash varchar(70) NOT NULL UNIQUE,
      account_id integer,
      role_name varchar(40),
      email varchar(90),
      is_email_validated boolean,
      registration_token varchar
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE users
  `;
}
