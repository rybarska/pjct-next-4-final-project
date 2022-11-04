export async function up(sql) {
  await sql`
    CREATE TABLE drones_incidents (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      incident_id integer REFERENCES incidents (id),
      drone_id integer REFERENCES drones (id)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE drones_incidents
  `;
}
