export async function up(sql) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      token varchar(110) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '6 hours',
			user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE sessions
    `;
}
