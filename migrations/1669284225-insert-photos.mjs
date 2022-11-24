const photos = [
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
  { title: 'spaceDrone' },
];

export async function up(sql) {
  await sql`
    INSERT INTO photos ${sql(photos, 'title')}
  `;
}

export async function down(sql) {
  for (const photo of photos) {
    await sql`
      DELETE FROM
        photos
      WHERE
        title = ${photo.title}
    `;
  }
}
